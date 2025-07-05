const express = require('express');
const { Pool } = require('pg');
const WebSocket = require('ws');
const { ethers } = require('ethers');

const app = express();
app.use(express.json());

// Enhanced middleware
app.use((req, res, next) => {
  req.startTime = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Rate limiting middleware
const rateLimit = new Map();
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
};

function rateLimitMiddleware(req, res, next) {
  const clientIp = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimit.has(clientIp)) {
    rateLimit.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return next();
  }
  
  const clientData = rateLimit.get(clientIp);
  
  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT.windowMs;
    return next();
  }
  
  if (clientData.count >= RATE_LIMIT.maxRequests) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
  }
  
  clientData.count++;
  next();
}

app.use(rateLimitMiddleware);

class TradeEngine {
  constructor() {
    // Enhanced configuration with validation
    this.config = this.validateConfiguration();
    
    // Database connection with retry logic
    this.db = null;
    this.dbRetryCount = 0;
    this.maxDbRetries = 5;
    
    // Blockchain connection with enhanced error handling
    this.provider = null;
    this.contract = null;
    this.contractAddress = this.config.DESTOCK_CONTRACT_ADDRESS;
    this.blockchainReady = false;
    
    // Health monitoring
    this.healthMetrics = {
      startTime: Date.now(),
      dbConnected: false,
      blockchainConnected: false,
      wsConnections: 0,
      processedOrders: 0,
      processedTrades: 0,
      lastBlockchainSync: null,
      errors: []
    };

    // Order books (in-memory for fast access)
    this.orderBooks = new Map(); // companyId -> { bids: [], asks: [] }
    this.recentTrades = new Map(); // companyId -> [trades]
    this.priceData = new Map(); // companyId -> price info

    // Circuit breaker for external services
    this.circuitBreaker = {
      database: { failures: 0, lastFailure: null, isOpen: false },
      blockchain: { failures: 0, lastFailure: null, isOpen: false }
    };

    this.initializeServices();
  }

  validateConfiguration() {
    const required = [
      'DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD',
      'RPC_URL', 'DESTOCK_CONTRACT_ADDRESS'
    ];
    
    const config = {};
    const missing = [];
    
    required.forEach(key => {
      const value = process.env[key];
      if (!value) {
        missing.push(key);
      } else {
        config[key] = value;
      }
    });
    
    // Set defaults for optional configs
    config.WS_PORT = process.env.WS_PORT || 8080;
    config.PORT = process.env.PORT || 3002;
    config.NODE_ENV = process.env.NODE_ENV || 'development';
    
    if (missing.length > 0) {
      console.warn(`Missing environment variables: ${missing.join(', ')}`);
      console.warn('Running in limited mode with fallback configurations');
    }
    
    return config;
  }

  async initializeServices() {
    console.log('Initializing Trade Engine services...');
    
    try {
      await this.initializeDatabase();
      await this.initializeBlockchain();
      this.initializeWebSocket();
      
      // Start health monitoring
      this.startHealthMonitoring();
      
      console.log('Trade Engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Trade Engine:', error.message);
      this.recordError('initialization', error);
    }
  }

  async initializeDatabase() {
    try {
      this.db = new Pool({
        host: this.config.DB_HOST || 'localhost',
        port: parseInt(this.config.DB_PORT) || 5432,
        database: this.config.DB_NAME || 'destock',
        user: this.config.DB_USER || 'postgres',
        password: this.config.DB_PASSWORD || 'password',
        max: 20,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
      });

      // Test connection
      await this.db.query('SELECT NOW()');
      this.healthMetrics.dbConnected = true;
      this.circuitBreaker.database.failures = 0;
      
      await this.createTables();
      await this.createIndexes();
      
      console.log('Database initialized successfully');
    } catch (error) {
      this.recordError('database', error);
      this.healthMetrics.dbConnected = false;
      
      if (this.dbRetryCount < this.maxDbRetries) {
        this.dbRetryCount++;
        console.log(`Database connection failed, retrying in 5s (${this.dbRetryCount}/${this.maxDbRetries})`);
        setTimeout(() => this.initializeDatabase(), 5000);
      } else {
        console.error('Database connection failed permanently, running without database');
      }
    }
  }

  async createTables() {
    const tables = [
      `CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id BIGINT UNIQUE NOT NULL,
        company_id INTEGER NOT NULL,
        trader_address VARCHAR(42) NOT NULL,
        is_buy BOOLEAN NOT NULL,
        amount BIGINT NOT NULL,
        price BIGINT NOT NULL,
        timestamp BIGINT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS trades (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL,
        buy_order_id BIGINT NOT NULL,
        sell_order_id BIGINT NOT NULL,
        amount BIGINT NOT NULL,
        price BIGINT NOT NULL,
        timestamp BIGINT NOT NULL,
        tx_hash VARCHAR(66),
        block_number BIGINT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS price_history (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL,
        price BIGINT NOT NULL,
        volume BIGINT NOT NULL,
        timestamp BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS system_events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        event_data JSONB,
        timestamp BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (const query of tables) {
      await this.db.query(query);
    }
  }

  async createIndexes() {
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_orders_company_active ON orders(company_id, is_active)',
      'CREATE INDEX IF NOT EXISTS idx_orders_trader ON orders(trader_address)',
      'CREATE INDEX IF NOT EXISTS idx_trades_company_timestamp ON trades(company_id, timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_price_history_company_timestamp ON price_history(company_id, timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_system_events_type_timestamp ON system_events(event_type, timestamp)'
    ];

    for (const query of indexes) {
      await this.db.query(query);
    }
  }

  async initializeBlockchain() {
    try {
      if (!this.config.RPC_URL || !this.config.DESTOCK_CONTRACT_ADDRESS) {
        throw new Error('Blockchain configuration missing');
      }

      this.provider = new ethers.JsonRpcProvider(this.config.RPC_URL);
      
      // Test provider connection
      await this.provider.getBlockNumber();
      
      this.contractABI = require('./abi/DeStock.json');
      this.contract = new ethers.Contract(
        this.config.DESTOCK_CONTRACT_ADDRESS, 
        this.contractABI, 
        this.provider
      );
      
      // Test contract connection
      await this.contract.name();
      
      this.blockchainReady = true;
      this.healthMetrics.blockchainConnected = true;
      this.circuitBreaker.blockchain.failures = 0;
      
      this.startBlockchainEventListener();
      console.log('Blockchain connection established');
      
    } catch (error) {
      this.recordError('blockchain', error);
      this.healthMetrics.blockchainConnected = false;
      console.warn('Blockchain connection failed, running in offline mode:', error.message);
    }
  }

  initializeWebSocket() {
    try {
      this.wss = new WebSocket.Server({ 
        port: this.config.WS_PORT,
        perMessageDeflate: false
      });
      
      this.wss.on('connection', (ws, req) => {
        this.healthMetrics.wsConnections++;
        console.log(`WebSocket connection established (${this.healthMetrics.wsConnections} active)`);
        
        ws.isAlive = true;
        ws.on('pong', () => { ws.isAlive = true; });
        
        ws.on('message', (message) => {
          try {
            const data = JSON.parse(message);
            this.handleWebSocketMessage(ws, data);
          } catch (error) {
            this.recordError('websocket', error);
            ws.send(JSON.stringify({ 
              type: 'error', 
              message: 'Invalid message format' 
            }));
          }
        });
        
        ws.on('close', () => {
          this.healthMetrics.wsConnections--;
          console.log(`WebSocket connection closed (${this.healthMetrics.wsConnections} active)`);
        });

        ws.on('error', (error) => {
          this.recordError('websocket', error);
        });
      });

      // Heartbeat to detect broken connections
      setInterval(() => {
        this.wss.clients.forEach((ws) => {
          if (!ws.isAlive) {
            console.log('Terminating inactive WebSocket connection');
            return ws.terminate();
          }
          ws.isAlive = false;
          ws.ping();
        });
      }, 30000);
      
      console.log(`WebSocket server running on port ${this.config.WS_PORT}`);
      
    } catch (error) {
      this.recordError('websocket_init', error);
      console.error('Failed to initialize WebSocket server:', error.message);
    }
  }

  handleWebSocketMessage(ws, data) {
    try {
      switch (data.type) {
        case 'subscribe':
          if (typeof data.companyId === 'number') {
            this.subscribeToCompany(ws, data.companyId);
          } else {
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid companyId' }));
          }
          break;
          
        case 'unsubscribe':
          if (typeof data.companyId === 'number') {
            this.unsubscribeFromCompany(ws, data.companyId);
          }
          break;

        case 'ping':
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;
          
        default:
          ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
      }
    } catch (error) {
      this.recordError('websocket_message', error);
    }
  }

  subscribeToCompany(ws, companyId) {
    if (!ws.subscriptions) {
      ws.subscriptions = new Set();
    }
    
    ws.subscriptions.add(companyId);
    
    try {
      // Send current data
      const orderBook = this.orderBooks.get(companyId) || { bids: [], asks: [] };
      const trades = this.recentTrades.get(companyId) || [];
      const priceInfo = this.priceData.get(companyId);
      
      ws.send(JSON.stringify({
        type: 'subscription_confirmed',
        companyId,
        timestamp: Date.now()
      }));
      
      ws.send(JSON.stringify({
        type: 'orderbook_update',
        companyId,
        data: orderBook,
        timestamp: Date.now()
      }));
      
      if (trades.length > 0) {
        ws.send(JSON.stringify({
          type: 'recent_trades',
          companyId,
          data: trades.slice(0, 20),
          timestamp: Date.now()
        }));
      }
      
      if (priceInfo) {
        ws.send(JSON.stringify({
          type: 'price_update',
          companyId,
          data: priceInfo,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      this.recordError('subscription', error);
    }
  }

  unsubscribeFromCompany(ws, companyId) {
    if (ws.subscriptions) {
      ws.subscriptions.delete(companyId);
      ws.send(JSON.stringify({
        type: 'unsubscription_confirmed',
        companyId,
        timestamp: Date.now()
      }));
    }
  }

  broadcastToSubscribers(companyId, message) {
    let successCount = 0;
    let errorCount = 0;
    
    this.wss.clients.forEach(client => {
      try {
        if (client.readyState === WebSocket.OPEN && 
            client.subscriptions && 
            client.subscriptions.has(companyId)) {
          client.send(JSON.stringify({
            ...message,
            timestamp: Date.now()
          }));
          successCount++;
        }
      } catch (error) {
        errorCount++;
        this.recordError('broadcast', error);
      }
    });
    
    if (this.config.NODE_ENV === 'development') {
      console.log(`Broadcast to ${successCount} clients (${errorCount} errors)`);
    }
  }

  startBlockchainEventListener() {
    if (!this.blockchainReady) return;
    
    try {
      // Enhanced event listeners with error handling
      this.contract.on('OrderPlaced', async (...args) => {
        try {
          await this.handleOrderPlaced(...args);
          this.healthMetrics.processedOrders++;
        } catch (error) {
          this.recordError('order_placed', error);
        }
      });

      this.contract.on('OrderCancelled', async (...args) => {
        try {
          await this.handleOrderCancelled(...args);
        } catch (error) {
          this.recordError('order_cancelled', error);
        }
      });

      this.contract.on('OrderMatched', async (...args) => {
        try {
          await this.handleOrderMatched(...args);
          this.healthMetrics.processedTrades++;
        } catch (error) {
          this.recordError('order_matched', error);
        }
      });

      // Monitor provider health
      this.provider.on('error', (error) => {
        this.recordError('provider', error);
        this.healthMetrics.blockchainConnected = false;
      });

      console.log('Blockchain event listener started');
      
    } catch (error) {
      this.recordError('event_listener', error);
      console.error('Error starting blockchain event listener:', error.message);
    }
  }

  async handleOrderPlaced(orderId, companyId, trader, isBuy, amount, price, event) {
    try {
      if (this.healthMetrics.dbConnected && !this.circuitBreaker.database.isOpen) {
        await this.db.query(`
          INSERT INTO orders (order_id, company_id, trader_address, is_buy, amount, price, timestamp)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (order_id) DO NOTHING
        `, [orderId.toString(), companyId.toString(), trader, isBuy, amount.toString(), price.toString(), event.blockNumber]);
      }

      await this.updateOrderBook(companyId.toString());
      this.healthMetrics.lastBlockchainSync = Date.now();

      console.log(`Order placed: ${orderId} for company ${companyId}`);
    } catch (error) {
      this.recordError('handle_order_placed', error);
    }
  }

  async handleOrderCancelled(orderId, trader, event) {
    try {
      if (this.healthMetrics.dbConnected && !this.circuitBreaker.database.isOpen) {
        const result = await this.db.query(`
          UPDATE orders SET is_active = false, updated_at = CURRENT_TIMESTAMP
          WHERE order_id = $1 AND trader_address = $2
          RETURNING company_id
        `, [orderId.toString(), trader]);

        if (result.rows.length > 0) {
          const companyId = result.rows[0].company_id;
          await this.updateOrderBook(companyId);
        }
      }
      
      this.healthMetrics.lastBlockchainSync = Date.now();
      console.log(`Order cancelled: ${orderId}`);
    } catch (error) {
      this.recordError('handle_order_cancelled', error);
    }
  }

  async handleOrderMatched(buyOrderId, sellOrderId, amount, price, event) {
    try {
      let companyId = null;
      
      if (this.healthMetrics.dbConnected && !this.circuitBreaker.database.isOpen) {
        // Get company ID and store trade
        const orderResult = await this.db.query(`
          SELECT company_id FROM orders WHERE order_id = $1 OR order_id = $2 LIMIT 1
        `, [buyOrderId.toString(), sellOrderId.toString()]);

        if (orderResult.rows.length > 0) {
          companyId = orderResult.rows[0].company_id;
          
          await this.db.query(`
            INSERT INTO trades (company_id, buy_order_id, sell_order_id, amount, price, timestamp, tx_hash, block_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          `, [companyId, buyOrderId.toString(), sellOrderId.toString(), amount.toString(), price.toString(), 
              event.blockNumber, event.transactionHash, event.blockNumber]);
        }
      }

      if (companyId) {
        // Update in-memory data structures
        const trade = {
          buyOrderId: buyOrderId.toString(),
          sellOrderId: sellOrderId.toString(),
          amount: amount.toString(),
          price: ethers.formatEther(price),
          timestamp: event.blockNumber,
          type: 'matched',
          txHash: event.transactionHash
        };

        if (!this.recentTrades.has(companyId)) {
          this.recentTrades.set(companyId, []);
        }
        
        const trades = this.recentTrades.get(companyId);
        trades.unshift(trade);
        if (trades.length > 100) trades.pop();

        await this.updatePriceData(companyId, price);
        await this.updateOrderBook(companyId);

        this.broadcastToSubscribers(companyId, {
          type: 'trade_update',
          companyId,
          data: trade
        });
      }
      
      this.healthMetrics.lastBlockchainSync = Date.now();
      console.log(`Trade matched: ${amount} shares at ${ethers.formatEther(price)} DSTK`);
      
    } catch (error) {
      this.recordError('handle_order_matched', error);
    }
  }

  async updateOrderBook(companyId) {
    try {
      let result = { rows: [] };
      
      if (this.healthMetrics.dbConnected && !this.circuitBreaker.database.isOpen) {
        result = await this.db.query(`
          SELECT order_id, is_buy, amount, price, timestamp
          FROM orders 
          WHERE company_id = $1 AND is_active = true
          ORDER BY price DESC, timestamp ASC
        `, [companyId]);
      }

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

      const aggregatedBids = this.aggregateOrders(bids, true);
      const aggregatedAsks = this.aggregateOrders(asks, false);

      const orderBook = { bids: aggregatedBids, asks: aggregatedAsks };
      this.orderBooks.set(parseInt(companyId), orderBook);

      this.broadcastToSubscribers(parseInt(companyId), {
        type: 'orderbook_update',
        companyId: parseInt(companyId),
        data: orderBook
      });

    } catch (error) {
      this.recordError('update_orderbook', error);
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

    let cumulativeTotal = 0;
    aggregated.forEach(order => {
      cumulativeTotal += order.amount;
      order.total = cumulativeTotal;
    });

    return aggregated.slice(0, 20);
  }

  async updatePriceData(companyId, price) {
    try {
      const priceInEth = parseFloat(ethers.formatEther(price));
      const now = Math.floor(Date.now() / 1000);

      let change = 0;
      const prevPrice = this.priceData.get(companyId);
      if (prevPrice) {
        change = ((priceInEth - prevPrice.price) / prevPrice.price) * 100;
      }

      if (this.healthMetrics.dbConnected && !this.circuitBreaker.database.isOpen) {
        await this.db.query(`
          INSERT INTO price_history (company_id, price, volume, timestamp)
          VALUES ($1, $2, $3, $4)
        `, [companyId, price.toString(), '0', now]);
      }

      const priceData = {
        price: priceInEth,
        change,
        volume: 0,
        timestamp: now
      };

      this.priceData.set(companyId, priceData);

      this.broadcastToSubscribers(companyId, {
        type: 'price_update',
        companyId,
        data: priceData
      });
    } catch (error) {
      this.recordError('update_price_data', error);
    }
  }

  recordError(type, error) {
    const errorRecord = {
      type,
      message: error.message,
      stack: error.stack,
      timestamp: Date.now()
    };
    
    this.healthMetrics.errors.push(errorRecord);
    
    // Keep only last 100 errors
    if (this.healthMetrics.errors.length > 100) {
      this.healthMetrics.errors = this.healthMetrics.errors.slice(-100);
    }
    
    // Update circuit breakers
    if (type === 'database') {
      this.circuitBreaker.database.failures++;
      this.circuitBreaker.database.lastFailure = Date.now();
      
      if (this.circuitBreaker.database.failures >= 5) {
        this.circuitBreaker.database.isOpen = true;
        console.error('Database circuit breaker opened');
      }
    } else if (type === 'blockchain') {
      this.circuitBreaker.blockchain.failures++;
      this.circuitBreaker.blockchain.lastFailure = Date.now();
      
      if (this.circuitBreaker.blockchain.failures >= 5) {
        this.circuitBreaker.blockchain.isOpen = true;
        console.error('Blockchain circuit breaker opened');
      }
    }
    
    console.error(`Error [${type}]:`, error.message);
  }

  startHealthMonitoring() {
    // Reset circuit breakers periodically
    setInterval(() => {
      const now = Date.now();
      const resetTime = 5 * 60 * 1000; // 5 minutes
      
      Object.values(this.circuitBreaker).forEach(breaker => {
        if (breaker.isOpen && breaker.lastFailure && (now - breaker.lastFailure) > resetTime) {
          breaker.isOpen = false;
          breaker.failures = 0;
          console.log('Circuit breaker reset');
        }
      });
    }, 60000);
    
    // Test database connection periodically
    setInterval(async () => {
      if (this.db && !this.circuitBreaker.database.isOpen) {
        try {
          await this.db.query('SELECT 1');
          this.healthMetrics.dbConnected = true;
        } catch (error) {
          this.healthMetrics.dbConnected = false;
          this.recordError('db_health_check', error);
        }
      }
    }, 30000);
  }

  // Enhanced API methods
  async getOrderBook(companyId) {
    return this.orderBooks.get(parseInt(companyId)) || { bids: [], asks: [] };
  }

  async getRecentTrades(companyId, limit = 20) {
    return this.recentTrades.get(parseInt(companyId))?.slice(0, limit) || [];
  }

  async getPriceHistory(companyId, timeframe = '1h') {
    if (!this.healthMetrics.dbConnected || this.circuitBreaker.database.isOpen) {
      return [];
    }
    
    try {
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
    } catch (error) {
      this.recordError('get_price_history', error);
      return [];
    }
  }

  getHealthStatus() {
    const uptime = Date.now() - this.healthMetrics.startTime;
    const recentErrors = this.healthMetrics.errors.filter(
      e => Date.now() - e.timestamp < 5 * 60 * 1000 // Last 5 minutes
    );
    
    return {
      status: this.healthMetrics.dbConnected && this.healthMetrics.blockchainConnected ? 'healthy' : 'degraded',
      uptime,
      metrics: {
        ...this.healthMetrics,
        recentErrorCount: recentErrors.length,
        circuitBreakers: this.circuitBreaker
      },
      timestamp: Date.now()
    };
  }
}

// Enhanced REST API routes with better error handling
app.get('/api/orderbook/:companyId', async (req, res) => {
  try {
    const companyId = parseInt(req.params.companyId);
    if (isNaN(companyId)) {
      return res.status(400).json({ error: 'Invalid company ID' });
    }
    
    const orderBook = await tradeEngine.getOrderBook(companyId);
    res.json({
      success: true,
      data: orderBook,
      timestamp: Date.now()
    });
  } catch (error) {
    tradeEngine.recordError('api_orderbook', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch order book',
      timestamp: Date.now()
    });
  }
});

app.get('/api/trades/:companyId', async (req, res) => {
  try {
    const companyId = parseInt(req.params.companyId);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    
    if (isNaN(companyId)) {
      return res.status(400).json({ error: 'Invalid company ID' });
    }
    
    const trades = await tradeEngine.getRecentTrades(companyId, limit);
    res.json({
      success: true,
      data: trades,
      timestamp: Date.now()
    });
  } catch (error) {
    tradeEngine.recordError('api_trades', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch trades',
      timestamp: Date.now()
    });
  }
});

app.get('/api/price-history/:companyId', async (req, res) => {
  try {
    const companyId = parseInt(req.params.companyId);
    const timeframe = req.query.timeframe || '1h';
    
    if (isNaN(companyId)) {
      return res.status(400).json({ error: 'Invalid company ID' });
    }
    
    const history = await tradeEngine.getPriceHistory(companyId, timeframe);
    res.json({
      success: true,
      data: history,
      timeframe,
      timestamp: Date.now()
    });
  } catch (error) {
    tradeEngine.recordError('api_price_history', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch price history',
      timestamp: Date.now()
    });
  }
});

app.get('/api/health', (req, res) => {
  const health = tradeEngine.getHealthStatus();
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

app.get('/api/metrics', (req, res) => {
  const metrics = tradeEngine.getHealthStatus();
  res.json({
    ...metrics,
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  tradeEngine.recordError('express', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    timestamp: Date.now()
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully');
  
  if (tradeEngine.wss) {
    tradeEngine.wss.close();
  }
  
  if (tradeEngine.db) {
    await tradeEngine.db.end();
  }
  
  process.exit(0);
});

// Initialize trade engine
const tradeEngine = new TradeEngine();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Trade Engine running on port ${PORT}`);
  console.log(`WebSocket server running on port ${process.env.WS_PORT || 8080}`);
});

module.exports = TradeEngine;
