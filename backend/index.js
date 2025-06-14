require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const contractJson = require("./VoteSmarter.json");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const contract = new ethers.Contract(contractAddress, contractJson.abi, signer);

// API endpoint to create a post
app.post("/api/createPost", async (req, res) => {
  try {
    const tx = await contract.createPost();
    await tx.wait();
    res.json({ message: "Post created!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// API endpoint to upvote
app.post("/api/upvote", async (req, res) => {
  console.log("err");
  try {
    const { postId } = req.body;
    const tx = await contract.upvote(postId, {
      value: ethers.parseEther("0.001"),
    });
    await tx.wait();
    res.json({ message: "Upvoted!" });
  } catch (err) {
    console.error("Error in upvote:", err);
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to downvote
app.post("/api/downvote", async (req, res) => {
  try {
    const { postId } = req.body;
    const tx = await contract.downvote(postId, {
      value: ethers.parseEther("0.001"),
    });
    await tx.wait();
    res.json({ message: "Downvoted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
