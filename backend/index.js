require("dotenv").config();
const { ethers } = require("ethers");
const contractJson = require("./VoteSmarter.json");

const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or Infura/Monad URL
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// FIX: contractAddress must be a string!
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
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

// Example usage:
createPost();
// upvote(1);
