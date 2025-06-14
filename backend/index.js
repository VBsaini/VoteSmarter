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

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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
app.post("/api/verifyTransaction", async (req, res) => {
  try {
    const { postId, type } = req.body;

    // Perform the upvote or downvote action in the smart contract
    let txResponse;
    if (type === "upvote") {
      txResponse = await contract.upvote(postId, {
        value: ethers.parseEther("0.001"), // Ensure the required fee is sent
      });
    } else if (type === "downvote") {
      txResponse = await contract.downvote(postId, {
        value: ethers.parseEther("0.001"), // Ensure the required fee is sent
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid vote type." });
    }

    // Wait for the transaction to be mined
    await txResponse.wait();

    res.json({ success: true, message: `${type} successful!` });
  } catch (err) {
    console.error("Error performing vote:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// app.post("/api/verifyTransaction", async (req, res) => {
//   try {
//     const { transactionHash, postId, type } = req.body;

//     // Fetch the transaction details from the blockchain
//     const tx = await provider.getTransaction(transactionHash);

//     if (!tx) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Transaction not found." });
//     }

//     // Verify the transaction details
//     if (
//       tx.to.toLowerCase() !==
//         "0x70997970c51812dc3a010c7d01b50e0d17dc79c8d".toLowerCase() || // Replace with the contract/treasury address
//       tx.value.toString() !== ethers.parseEther("0.001").toString()
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Invalid transaction details." });
//     }

//     // Ensure the transaction is mined
//     const receipt = await provider.getTransactionReceipt(transactionHash);
//     if (!receipt || receipt.status !== 1) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Transaction not successful." });
//     }

//     // Perform the upvote or downvote action in the smart contract
//     let txResponse;
//     if (type === "upvote") {
//       txResponse = await contract.upvote(postId);
//     } else if (type === "downvote") {
//       txResponse = await contract.downvote(postId);
//     }
//     await txResponse.wait();

//     res.json({ success: true });
//   } catch (err) {
//     console.error("Error verifying transaction:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
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
// API endpoint to get posts by wallet address
app.get("/api/posts/:walletAddress", async (req, res) => {
  try {
    const { walletAddress } = req.params;

    // Call the getPostsByCreator function in the smart contract
    const posts = await contract.getPostsByCreator(walletAddress);
    const formattedPosts = posts.map((post) => ({
      id: post.id.toString(),
      creator: post.creator,
      upvotes: post.upvotes.toString(),
      downvotes: post.downvotes.toString(),
    }));

    res.json(formattedPosts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: err.message });
  }
});
// API endpoint to register a new creator
// API endpoint to register a new creator
app.post("/api/createCreator", async (req, res) => {
  try {
    const { walletAddress, name, profilePic } = req.body;

    // const creators = await contract.getAllCreators();
    // Validate input
    if (!walletAddress || !name || !profilePic) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // console.log("createers", creators);
    // Call the createCreator function in the smart contract
    const tx = await contract.createCreator(walletAddress, name, profilePic);
    await tx.wait();

    res.json({ message: "Creator registered successfully!" });
  } catch (err) {
    console.error("Error registering creator:", err);
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to get all creators
app.get("/api/creators", async (req, res) => {
  try {
    const creators = await contract.getAllCreators();
    res.json(creators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
