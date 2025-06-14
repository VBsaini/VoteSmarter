require("dotenv").config();
const { ethers } = require("ethers");
const contractJson = require("./VoteSmarter.json");

const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or Infura URL
const signer = provider.getSigner(); // Use first account

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contract = new ethers.Contract(contractAddress, contractJson.abi, signer);

async function createPost() {
  const tx = await contract.createPost();
  await tx.wait();
  console.log("Post created!");
}

async function upvote(postId) {
  const tx = await contract.upvote(postId, {
    value: ethers.parseEther("0.001"),
  });
  await tx.wait();
  console.log("Upvoted!");
}

// Add similar functions for downvote, flagScam, refundDownvote

// Example usage:
createPost();
