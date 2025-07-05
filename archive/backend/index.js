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

async function startServer() {
  await connectToDb();
  setInterval(pollAndStorePrices, pollingInterval);
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

startServer();
