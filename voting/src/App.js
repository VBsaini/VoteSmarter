import React, { useState } from "react";
import "./App.css";
import Home from "./screens/Home";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected wallet:", accounts[0]);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  const logoutWallet = () => {
    setWalletAddress(null); // Clear the wallet address
  };

  return (
    <div className="App">
      {walletAddress ? (
        <div>
          <button
            className="btn btn-danger mt-3"
            onClick={logoutWallet}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Logout
          </button>
          <Home />
        </div>
      ) : (
        <div className="container mt-5 text-center">
          <h3>Connect Your Wallet</h3>
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
