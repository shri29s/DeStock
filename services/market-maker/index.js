const express = require('express');
const { ethers } = require('ethers');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

class MarketMakerBot {
  constructor() {
    this.provider = null;
    this.wallet = null;
    this.contract = null;
    this.contractAddress = process.env.DESTOCK_CONTRACT_ADDRESS;
    
    try {
      this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
      this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
      
      // Load contract ABI
      this.contractABI = require('./abi/DeStock.json');
      this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.wallet);
    } catch (error) {
      console.warn('Blockchain connection failed, running in offline mode:', error.message);
    }
    
    this.spread = 0.02; // 2% spread
    this.orderSize = 100; // Default order size
    this.maxOrders = 5; // Maximum orders per side
    this.isActive = false;
    this.activeOrders = new Map();
    this.companies = new Set();
    
    this.initializeWebSocket();
  }

  initializeWebSocket() {
    this.wss = new WebSocket.Server({ port: process.env.WS_PORT || 8081 });
    
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
      case 'start_market_making':
        this.startMarketMaking(data.companyId);
        ws.send(JSON.stringify({ type: 'status', message: 'Market making started' }));
        break;
        
      case 'stop_market_making':
        this.stopMarketMaking(data.companyId);
        ws.send(JSON.stringify({ type: 'status', message: 'Market making stopped' }));
        break;
        
      case 'update_config':
        this.updateConfig(data.config);
        ws.send(JSON.stringify({ type: 'status', message: 'Configuration updated' }));
        break;
        
      default:
        ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
    }
  }

  async startMarketMaking(companyId) {
    if (this.companies.has(companyId)) {
      console.log(`Already market making for company ${companyId}`);
      return;
    }

    this.companies.add(companyId);
    console.log(`Starting market making for company ${companyId}`);
    
    // Start the market making loop for this company
    this.marketMakeForCompany(companyId);
  }

  async stopMarketMaking(companyId) {
    if (!this.companies.has(companyId)) {
      console.log(`Not market making for company ${companyId}`);
      return;
    }

    this.companies.delete(companyId);
    console.log(`Stopping market making for company ${companyId}`);
    
    // Cancel all active orders for this company
    await this.cancelOrdersForCompany(companyId);
  }

  async marketMakeForCompany(companyId) {
    const intervalId = setInterval(async () => {
      if (!this.companies.has(companyId)) {
        clearInterval(intervalId);
        return;
      }

      try {
        await this.updateOrdersForCompany(companyId);
      } catch (error) {
        console.error(`Error market making for company ${companyId}:`, error);
      }
    }, 10000); // Update every 10 seconds
  }

  async updateOrdersForCompany(companyId) {
    // Get current market price
    const currentPrice = await this.contract.getSharePrice(companyId);
    const priceInEth = ethers.formatEther(currentPrice);
    const price = parseFloat(priceInEth);

    if (price <= 0) {
      console.log(`Invalid price for company ${companyId}: ${price}`);
      return;
    }

    // Calculate bid and ask prices
    const bidPrice = price * (1 - this.spread / 2);
    const askPrice = price * (1 + this.spread / 2);

    // Cancel existing orders for this company
    await this.cancelOrdersForCompany(companyId);

    // Place new orders
    await this.placeBidOrders(companyId, bidPrice);
    await this.placeAskOrders(companyId, askPrice);

    console.log(`Updated orders for company ${companyId}: bid=${bidPrice.toFixed(6)}, ask=${askPrice.toFixed(6)}`);
  }

  async placeBidOrders(companyId, bidPrice) {
    for (let i = 0; i < this.maxOrders; i++) {
      const price = bidPrice * (1 - i * 0.001); // Slightly lower prices for each order
      const amount = this.orderSize;

      try {
        const tx = await this.contract.placeOrder(
          companyId,
          true, // isBuy
          amount,
          ethers.parseEther(price.toString())
        );

        const receipt = await tx.wait();
        console.log(`Placed bid order: company=${companyId}, price=${price.toFixed(6)}, amount=${amount}`);
        
        // Store order info (would need to extract order ID from events)
        this.activeOrders.set(`${companyId}-bid-${i}`, {
          companyId,
          type: 'bid',
          price,
          amount,
          txHash: tx.hash
        });
      } catch (error) {
        console.error(`Error placing bid order:`, error);
      }
    }
  }

  async placeAskOrders(companyId, askPrice) {
    for (let i = 0; i < this.maxOrders; i++) {
      const price = askPrice * (1 + i * 0.001); // Slightly higher prices for each order
      const amount = this.orderSize;

      try {
        const tx = await this.contract.placeOrder(
          companyId,
          false, // isBuy (sell)
          amount,
          ethers.parseEther(price.toString())
        );

        const receipt = await tx.wait();
        console.log(`Placed ask order: company=${companyId}, price=${price.toFixed(6)}, amount=${amount}`);
        
        // Store order info
        this.activeOrders.set(`${companyId}-ask-${i}`, {
          companyId,
          type: 'ask',
          price,
          amount,
          txHash: tx.hash
        });
      } catch (error) {
        console.error(`Error placing ask order:`, error);
      }
    }
  }

  async cancelOrdersForCompany(companyId) {
    const ordersToCancel = [];
    
    for (const [key, order] of this.activeOrders.entries()) {
      if (order.companyId === companyId) {
        ordersToCancel.push(key);
      }
    }

    for (const key of ordersToCancel) {
      try {
        // Get order ID (this would need to be tracked from contract events)
        // const orderId = await this.getOrderIdFromTxHash(this.activeOrders.get(key).txHash);
        // await this.contract.cancelOrder(orderId);
        this.activeOrders.delete(key);
      } catch (error) {
        console.error(`Error canceling order ${key}:`, error);
      }
    }
  }

  updateConfig(config) {
    if (config.spread !== undefined) {
      this.spread = config.spread;
    }
    if (config.orderSize !== undefined) {
      this.orderSize = config.orderSize;
    }
    if (config.maxOrders !== undefined) {
      this.maxOrders = config.maxOrders;
    }
    
    console.log('Configuration updated:', {
      spread: this.spread,
      orderSize: this.orderSize,
      maxOrders: this.maxOrders
    });
  }

  getStatus() {
    return {
      isActive: this.isActive,
      activeCompanies: Array.from(this.companies),
      totalActiveOrders: this.activeOrders.size,
      config: {
        spread: this.spread,
        orderSize: this.orderSize,
        maxOrders: this.maxOrders
      }
    };
  }
}

// REST API routes
app.get('/api/status', (req, res) => {
  res.json(marketMaker.getStatus());
});

app.post('/api/start/:companyId', async (req, res) => {
  try {
    const companyId = parseInt(req.params.companyId);
    await marketMaker.startMarketMaking(companyId);
    res.json({ success: true, message: `Market making started for company ${companyId}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/stop/:companyId', async (req, res) => {
  try {
    const companyId = parseInt(req.params.companyId);
    await marketMaker.stopMarketMaking(companyId);
    res.json({ success: true, message: `Market making stopped for company ${companyId}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/config', (req, res) => {
  try {
    marketMaker.updateConfig(req.body);
    res.json({ success: true, message: 'Configuration updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Initialize market maker
const marketMaker = new MarketMakerBot();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Market Maker Bot running on port ${PORT}`);
  console.log(`WebSocket server running on port ${process.env.WS_PORT || 8081}`);
});

module.exports = MarketMakerBot;
