const express = require("express");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const swapAbi = require("./swapAbi.json");
const { createPublicClient, http, webSocket, getContract } = require("viem");
const { bscTestnet } = require("viem/chains");
const router = express.Router();
const cors = require("cors");
server.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
const SwapEvent = mongoose.model("SwapEvent", {
  eventName: String,
  user: String,
  ethAmount: Number,
  usdcAmount: Number,
  address: String,
  topics: [String],
  data: String,
  blockNumber: Number,
  transactionHash: String,
  transactionIndex: Number,
  blockHash: String,
  logIndex: Number,
  removed: Boolean,
});
const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http("https://data-seed-prebsc-1-s3.binance.org:8545/"),
});
const contract = getContract({
  address: "0x4AEd04856cc136742bDAca9EB3e2aAd8E212053C",
  abi: swapAbi,
  client: publicClient,
});

contract.watchEvent.SwappedETHforUSDC({
  onLogs: async (logs) => {
    console.log(logs);

    // Create a new instance of the SwapEvent model using the event data
    const swapEvent = new SwapEvent({
      eventName: logs[0].eventName,
      user: logs[0].args.user,
      ethAmount: Number(logs[0].args.ethAmount),
      usdcAmount: Number(logs[0].args.usdcAmount),
      address: logs[0].address,
      topics: logs[0].topics,
      data: logs[0].data,
      blockNumber: Number(logs[0].blockNumber),
      transactionHash: logs[0].transactionHash,
      transactionIndex: logs[0].transactionIndex,
      blockHash: logs[0].blockHash,
      logIndex: logs[0].logIndex,
      removed: logs[0].removed,
    });

    try {
      // Save the instance to the MongoDB database
      await swapEvent.save();
      console.log("Swap event saved to MongoDB:", swapEvent);
    } catch (error) {
      console.error("Error saving swap event to MongoDB:", error);
    }
  },
});

router.get("/events", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const events = await SwapEvent.find().skip(skip).limit(limit);
    const totalEvents = await SwapEvent.countDocuments();

    const totalPages = Math.ceil(totalEvents / limit);

    res.json({
      currentPage: page,
      totalPages: totalPages,
      totalEvents: totalEvents,
      events: events,
    });
  } catch (error) {
    next(error);
  }
});

server.use(router);

server.use((error, req, res, next) => {
  console.error(error, "erroorrrrr<<<<");
  res.status(500).json({ status: false, data: error });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`your app is runnung on ${PORT}`);
});
