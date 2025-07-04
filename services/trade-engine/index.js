const express = require('express');
const { Pool } = require('pg');
const WebSocket = require('ws');
const { ethers } = require('ethers');

const app = express();
app.use(express.json());

class TradeEngine {
  constructor() {
    // Database connection
    this.db = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'destock',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password'
    });

    // Blockchain connection with error handling
    this.provider = null;
    this.contract = null;
    this.contractAddress = process.env.DESTOCK_CONTRACT_ADDRESS;
    
    try {
      this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
      this.contractABI = require('./abi/DeStock.json');
      this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
    } catch (error) {
      console.warn('Blockchain connection failed, running in offline mode:', error.message);
    }

    // Order books (in-memory for fast access)
    this.orderBooks = new Map(); // companyId -> { bids: [], asks: [] }
    this.recentTrades = new Map(); // companyId -> [trades]
    this.priceData = new Map(); // companyId -> price info

    this.initializeDatabase();
    this.initializeWebSocket();
    if (this.contract) {
      this.startBlockchainEventListener();
    }
  }

  async initializeDatabase() {
    try {
      // Create tables if they don't exist
      await this.db.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          order_id BIGINT UNIQUE NOT NULL,
          company_id INTEGER NOT NULL,
          trader_address VARCHAR(42) NOT NULL,
          is_buy BOOLEAN NOT NULL,
          amount BIGINT NOT NULL,
          price BIGINT NOT NULL,
          timestamp BIGINT NOT NULL,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await this.db.query(`
        CREATE TABLE IF NOT EXISTS trades (
          id SERIAL PRIMARY KEY,
          company_id INTEGER NOT NULL,
          buy_order_id BIGINT NOT NULL,
          sell_order_id BIGINT NOT NULL,
          amount BIGINT NOT NULL,
          price BIGINT NOT NULL,
          timestamp BIGINT NOT NULL,
          tx_hash VARCHAR(66),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await this.db.query(`
        CREATE TABLE IF NOT EXISTS price_history (
          id SERIAL PRIMARY KEY,
          company_id INTEGER NOT NULL,
          price BIGINT NOT NULL,
          volume BIGINT NOT NULL,
          timestamp BIGINT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create indexes
      await this.db.query('CREATE INDEX IF NOT EXISTS idx_orders_company_active ON orders(company_id, is_active)');
      await this.db.query('CREATE INDEX IF NOT EXISTS idx_trades_company_timestamp ON trades(company_id, timestamp)');
      await this.db.query('CREATE INDEX IF NOT EXISTS idx_price_history_company_timestamp ON price_history(company_id, timestamp)');

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  initializeWebSocket() {
    this.wss = new WebSocket.Server({ port: process.env.WS_PORT || 8080 });
    
    this.wss.on('connection', (ws) => {
      console.log('WebSocket connection established');
      
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          this.handleWebSocketMessage(ws, data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });
      
      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });
    });
  }

  handleWebSocketMessage(ws, data) {
    switch (data.type) {
      case 'subscribe':
        this.subscribeToCompany(ws, data.companyId);
        break;
        
      case 'unsubscribe':
        this.unsubscribeFromCompany(ws, data.companyId);
        break;
        
      default:
        ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
    }
  }

  subscribeToCompany(ws, companyId) {
    if (!ws.subscriptions) {
      ws.subscriptions = new Set();
    }
    
    ws.subscriptions.add(companyId);
    
    // Send current order book and recent trades
    const orderBook = this.orderBooks.get(companyId) || { bids: [], asks: [] };
    const trades = this.recentTrades.get(companyId) || [];
    const priceInfo = this.priceData.get(companyId);
    
    ws.send(JSON.stringify({
      type: 'orderbook_update',
      companyId,
      data: orderBook
    }));
    
    if (trades.length > 0) {
      ws.send(JSON.stringify({
        type: 'recent_trades',
        companyId,
        data: trades.slice(0, 20) // Last 20 trades
      }));
    }
    
    if (priceInfo) {
      ws.send(JSON.stringify({
        type: 'price_update',
        companyId,
        data: priceInfo
      }));
    }
  }

  unsubscribeFromCompany(ws, companyId) {
    if (ws.subscriptions) {
      ws.subscriptions.delete(companyId);
    }
  }

  broadcastToSubscribers(companyId, message) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && 
          client.subscriptions && 
          client.subscriptions.has(companyId)) {
        client.send(JSON.stringify(message));
      }
    });
  }

  startBlockchainEventListener() {
    try {
      // Listen for order events
      this.contract.on('OrderPlaced', async (orderId, companyId, trader, isBuy, amount, price, event) => {
        await this.handleOrderPlaced(orderId, companyId, trader, isBuy, amount, price, event);
      });

      this.contract.on('OrderCancelled', async (orderId, trader, event) => {
        await this.handleOrderCancelled(orderId, trader, event);
      });

      this.contract.on('OrderMatched', async (buyOrderId, sellOrderId, amount, price, event) => {
        await this.handleOrderMatched(buyOrderId, sellOrderId, amount, price, event);
      });

      console.log('Blockchain event listener started');
    } catch (error) {
      console.error('Error starting blockchain event listener:', error.message);
    }
  }

  async handleOrderPlaced(orderId, companyId, trader, isBuy, amount, price, event) {
    try {
      // Store in database
      await this.db.query(`
        INSERT INTO orders (order_id, company_id, trader_address, is_buy, amount, price, timestamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [orderId.toString(), companyId.toString(), trader, isBuy, amount.toString(), price.toString(), event.blockNumber]);

      // Update order book
      await this.updateOrderBook(companyId.toString());

      console.log(`Order placed: ${orderId} for company ${companyId}`);
    } catch (error) {
      console.error('Error handling OrderPlaced event:', error);
    }
  }

  async handleOrderCancelled(orderId, trader, event) {
    try {
      // Update database
      const result = await this.db.query(`
        UPDATE orders SET is_active = false 
        WHERE order_id = $1 AND trader_address = $2
        RETURNING company_id
      `, [orderId.toString(), trader]);

      if (result.rows.length > 0) {
        const companyId = result.rows[0].company_id;
        await this.updateOrderBook(companyId);
        console.log(`Order cancelled: ${orderId}`);
      }
    } catch (error) {
      console.error('Error handling OrderCancelled event:', error);
    }
  }

  async handleOrderMatched(buyOrderId, sellOrderId, amount, price, event) {
    try {
      // Get company ID from one of the orders
      const orderResult = await this.db.query(`
        SELECT company_id FROM orders WHERE order_id = $1 OR order_id = $2 LIMIT 1
      `, [buyOrderId.toString(), sellOrderId.toString()]);

      if (orderResult.rows.length === 0) return;

      const companyId = orderResult.rows[0].company_id;

      // Store trade
      await this.db.query(`
        INSERT INTO trades (company_id, buy_order_id, sell_order_id, amount, price, timestamp, tx_hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [companyId, buyOrderId.toString(), sellOrderId.toString(), amount.toString(), price.toString(), event.blockNumber, event.transactionHash]);

      // Update recent trades
      const trade = {
        buyOrderId: buyOrderId.toString(),
        sellOrderId: sellOrderId.toString(),
        amount: amount.toString(),
        price: ethers.formatEther(price),
        timestamp: event.blockNumber,
        type: 'matched'
      };

      if (!this.recentTrades.has(companyId)) {
        this.recentTrades.set(companyId, []);
      }
      
      const trades = this.recentTrades.get(companyId);
      trades.unshift(trade);
      if (trades.length > 100) trades.pop();

      // Update price data
      await this.updatePriceData(companyId, price);

      // Update order book
      await this.updateOrderBook(companyId);

      // Broadcast trade update
      this.broadcastToSubscribers(companyId, {
        type: 'trade_update',
        companyId,
        data: trade
      });

      console.log(`Trade matched: ${amount} shares at ${ethers.formatEther(price)} DSTK for company ${companyId}`);
    } catch (error) {
      console.error('Error handling OrderMatched event:', error);
    }
  }

  async updateOrderBook(companyId) {
    try {
      // Get active orders for this company
      const result = await this.db.query(`
        SELECT order_id, is_buy, amount, price, timestamp
        FROM orders 
        WHERE company_id = $1 AND is_active = true
        ORDER BY price DESC, timestamp ASC
      `, [companyId]);

      const bids = [];
      const asks = [];

      result.rows.forEach(row => {
        const order = {
          orderId: row.order_id,
          price: parseFloat(ethers.formatEther(row.price)),
          amount: parseInt(row.amount),
          timestamp: parseInt(row.timestamp)
        };

        if (row.is_buy) {
          bids.push(order);
        } else {
          asks.push(order);
        }
      });

      // Aggregate by price level
      const aggregatedBids = this.aggregateOrders(bids, true);
      const aggregatedAsks = this.aggregateOrders(asks, false);

      const orderBook = { bids: aggregatedBids, asks: aggregatedAsks };
      this.orderBooks.set(parseInt(companyId), orderBook);

      // Broadcast order book update
      this.broadcastToSubscribers(parseInt(companyId), {
        type: 'orderbook_update',
        companyId: parseInt(companyId),
        data: orderBook
      });

    } catch (error) {
      console.error('Error updating order book:', error);
    }
  }

  aggregateOrders(orders, isBid) {
    const priceMap = new Map();
    
    orders.forEach(order => {
      const price = order.price;
      if (priceMap.has(price)) {
        const existing = priceMap.get(price);
        existing.amount += order.amount;
      } else {
        priceMap.set(price, {
          price,
          amount: order.amount,
          total: 0
        });
      }
    });

    const aggregated = Array.from(priceMap.values());
    aggregated.sort((a, b) => isBid ? b.price - a.price : a.price - b.price);

    // Calculate cumulative totals
    let cumulativeTotal = 0;
    aggregated.forEach(order => {
      cumulativeTotal += order.amount;
      order.total = cumulativeTotal;
    });

    return aggregated.slice(0, 20); // Top 20 levels
  }

  async updatePriceData(companyId, price) {
    const priceInEth = parseFloat(ethers.formatEther(price));
    const now = Math.floor(Date.now() / 1000);

    // Get previous price for change calculation
    let change = 0;
    const prevPrice = this.priceData.get(companyId);
    if (prevPrice) {
      change = ((priceInEth - prevPrice.price) / prevPrice.price) * 100;
    }

    // Store price history
    await this.db.query(`
      INSERT INTO price_history (company_id, price, volume, timestamp)
      VALUES ($1, $2, $3, $4)
    `, [companyId, price.toString(), '0', now]);

    // Update in-memory price data
    const priceData = {
      price: priceInEth,
      change,
      volume: 0, // TODO: Calculate 24h volume
      timestamp: now
    };

    this.priceData.set(companyId, priceData);

    // Broadcast price update
    this.broadcastToSubscribers(companyId, {
      type: 'price_update',
      companyId,
      data: priceData
    });
  }

  // REST API methods
  async getOrderBook(companyId) {
    return this.orderBooks.get(parseInt(companyId)) || { bids: [], asks: [] };
  }

  async getRecentTrades(companyId, limit = 20) {
    return this.recentTrades.get(parseInt(companyId))?.slice(0, limit) || [];
  }

  async getPriceHistory(companyId, timeframe = '1h') {
    const result = await this.db.query(`
      SELECT price, timestamp 
      FROM price_history 
      WHERE company_id = $1 
      ORDER BY timestamp DESC 
      LIMIT 100
    `, [companyId]);

    return result.rows.map(row => ({
      price: parseFloat(ethers.formatEther(row.price)),
      timestamp: parseInt(row.timestamp)
    }));
  }
}

// REST API routes
app.get('/api/orderbook/:companyId', async (req, res) => {
  try {
    const orderBook = await tradeEngine.getOrderBook(req.params.companyId);
    res.json(orderBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/trades/:companyId', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const trades = await tradeEngine.getRecentTrades(req.params.companyId, limit);
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/price-history/:companyId', async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '1h';
    const history = await tradeEngine.getPriceHistory(req.params.companyId, timeframe);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Initialize trade engine
const tradeEngine = new TradeEngine();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Trade Engine running on port ${PORT}`);
  console.log(`WebSocket server running on port ${process.env.WS_PORT || 8080}`);
});

module.exports = TradeEngine;
