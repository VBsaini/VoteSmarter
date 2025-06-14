const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");

const testConnection = async () => {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log(
      "Connected to Monad Testnet. Current block number:",
      blockNumber
    );
  } catch (error) {
    console.error("Failed to connect to Monad Testnet:", error);
  }
};

testConnection();
