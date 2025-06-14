import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateCreator = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to connect to MetaMask and get the wallet address
  const connectWallet = async () => {
    if (!window.ethereum) {
      setMessage("MetaMask is not installed. Please install it to proceed.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]); // Set the first account as the connected wallet
      setMessage("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setMessage("Failed to connect wallet. Please try again.");
    }
  };

  // Automatically connect to MetaMask if already authorized
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createCreator",
        {
          walletAddress,
          name,
          profilePic,
        }
      );

      setMessage(response.data.message);
      setName("");
      setProfilePic("");
    } catch (error) {
      console.error("Error creating creator:", error);
      setMessage(error.response?.data?.error || "Failed to create creator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Register a New Creator</h3>
      {!walletAddress ? (
        <div className="text-center mb-4">
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="walletAddress" className="form-label">
              Wallet Address
            </label>
            <input
              type="text"
              className="form-control"
              id="walletAddress"
              value={walletAddress}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter creator name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profilePic" className="form-label">
              Profile Picture URL
            </label>
            <input
              type="text"
              className="form-control"
              id="profilePic"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              placeholder="Enter profile picture URL"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register Creator"}
          </button>
        </form>
      )}
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default CreateCreator;
