require("dotenv").config();
const express = require("express");
const { Contract, JsonRpcProvider } = require("ethers");
const { MongoClient } = require("mongodb");
const DeStock = require("../frontend/ABI/DeStock.json");

const app = express();
const port = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI;
const contractAddress = process.env.CONTRACT_ADDRESS;
const rpcUrl = process.env.RPC_URL;
const pollingInterval = parseInt(process.env.POLLING_INTERVAL, 10);

const provider = new JsonRpcProvider(rpcUrl);
const contract = new Contract(contractAddress, DeStock.abi, provider);

let db;

async function connectToDb() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db("DeStock");
  console.log("Connected to MongoDB");
}

async function pollAndStorePrices() {
  try {
    const nextCompanyId = await contract.nextCompanyId();
    for (let i = 0; i < nextCompanyId; i++) {
      const price = await contract.getSharePrice(i);
      const priceCollection = db.collection(`company_${i}_prices`);
      await priceCollection.insertOne({
        price: price.toString(),
        timestamp: new Date(),
      });
      console.log(`Stored price for company ${i}: ${price.toString()}`);
    }
  } catch (error) {
    console.error("Error polling for prices:", error);
  }
}

async function updateShareholderBalance(companyId, shareholderAddress, amountChange) {
    const shareholdersCollection = db.collection("shareholders");
    await shareholdersCollection.updateOne(
        { companyId, address: shareholderAddress },
        { $inc: { balance: amountChange } },
        { upsert: true }
    );
}

async function storeTradeHistory(trade) {
    const tradeHistoryCollection = db.collection("trade_history");
    await tradeHistoryCollection.insertOne(trade);
}

app.get("/prices/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const priceCollection = db.collection(`company_${companyId}_prices`);
    const prices = await priceCollection.find().sort({ timestamp: -1 }).toArray();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/shareholders/:companyId", async (req, res) => {
    try {
        const companyId = parseInt(req.params.companyId);
        const shareholdersCollection = db.collection("shareholders");
        const shareholders = await shareholdersCollection.find({ companyId, balance: { $gt: 0 } }).toArray();
        res.json(shareholders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/trades/:companyId", async (req, res) => {
    try {
        const companyId = parseInt(req.params.companyId);
        const tradeHistoryCollection = db.collection("trade_history");
        const trades = await tradeHistoryCollection.find({ companyId: companyId }).sort({ timestamp: -1 }).toArray();
        res.json(trades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/trades/latest/:n", async (req, res) => {
  try {
    const tradeHistoryCollection = db.collection("trade_history");
    const trades = await tradeHistoryCollection.find().sort({ timestamp: -1 }).limit(Number(n)).toArray();
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/portfolio/:address", async (req, res) => {
  const shareholders = await db.collection("shareholders")
    .find({ address: req.params.address.toLowerCase(), balance: { $gt: 0 } })
    .toArray();
  res.json(shareholders);
});

async function startServer() {
  await connectToDb();
  setInterval(pollAndStorePrices, pollingInterval);

  contract.on("SharesPurchased", (companyId, buyer, amount, cost) => {
    console.log(`SharesPurchased event: companyId=${companyId}, buyer=${buyer}, amount=${amount}`);
    updateShareholderBalance(Number(companyId), buyer, Number(amount));
    storeTradeHistory({
        type: "buy",
        companyId: Number(companyId),
        address: buyer,
        amount: Number(amount),
        price: cost.toString(),
        timestamp: new Date(),
    });
  });

  contract.on("SharesSold", (companyId, seller, amount, proceeds) => {
    console.log(`SharesSold event: companyId=${companyId}, seller=${seller}, amount=${amount}`);
    updateShareholderBalance(Number(companyId), seller, -Number(amount));
    storeTradeHistory({
        type: "sell",
        companyId: Number(companyId),
        address: seller,
        amount: Number(amount),
        price: proceeds.toString(),
        timestamp: new Date(),
    });
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

startServer();
