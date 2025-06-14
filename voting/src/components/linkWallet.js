import React, { useState } from "react";
import { ethers } from "ethers";

const LinkWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Set the first account as the connected wallet
        setWalletAddress(accounts[0]);
        setErrorMessage("");
        console.log("Connected wallet:", accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        setErrorMessage("Failed to connect wallet. Please try again.");
      }
    } else {
      setErrorMessage(
        "MetaMask is not installed. Please install it to connect."
      );
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h3>Connect Your Wallet</h3>
      {walletAddress ? (
        <div>
          <p>
            <strong>Connected Wallet:</strong> {walletAddress}
          </p>
          <button className="btn btn-secondary" disabled>
            Wallet Connected
          </button>
        </div>
      ) : (
        <div>
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default LinkWallet;
