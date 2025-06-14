import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
const UsersCard = ({
  userName,
  walletAddress,
  profilePic,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
  postId,
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPostVotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/postVotes/${0}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post votes");
        }
        const data = await response.json();
        setUpvotes(Number(data.upvotes));
        setDownvotes(Number(data.downvotes));
      } catch (error) {
        console.error("Error fetching post votes:", error);
      }
    };

    fetchPostVotes();
  }, [postId]);
  // async function handleVote(type) {
  //   setLoading(true);
  //   // try {
  //   fetch("http://localhost:5000/api/upvote", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ postId: 1 }), // Make sure postId is valid!
  //   }).then((response) => {
  //     if (!response.ok) {
  //       console.log(response);
  //       setLoading(false);
  //       // throw new Error("Network response was not ok");
  //     }
  //     return response;
  //   });
  //   // const data = await res.json();
  //   // if (data.error) {
  //   //   alert(data.error);
  //   // } else {
  //   // // Optionally, fetch updated votes from backend or increment locally
  //   // if (type === "upvote") setUpvotes((u) => u + 1);
  //   // if (type === "downvote") setDownvotes((d) => d + 1);
  //   // alert(data.message);
  //   // }
  //   // } catch (err) {
  //   //   alert("Network error");
  //   // }
  //   // setLoading(false);
  // }

  async function handleVote(type) {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to proceed.");
      return;
    }

    try {
      setLoading(true);

      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Define the fee (0.001 Ether)
      const fee = ethers.parseEther("0.001");

      // Send the payment using MetaMask
      const tx = await signer.sendTransaction({
        to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8", // Replace with the contract address or treasury address
        value: fee,
      });

      // Wait for the transaction to be mined
      await tx.wait();

      // Send the transaction hash to the backend
      const response = await fetch(
        "http://localhost:5000/api/verifyTransaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactionHash: tx.hash,
            postId: 0,
            type, // "upvote" or "downvote"
          }),
        }
      );

      const result = await response.json();
      console.log("Transaction verification result:", result);
      if (result.success) {
        // Update the UI
        if (type === "upvote") {
          setUpvotes((prev) => prev + 1);
        } else if (type === "downvote") {
          setDownvotes((prev) => prev + 1);
        }
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
      } else {
        console.error("Transaction verification failed:", result.error);
        alert("Transaction verification failed.");
      }
    } catch (error) {
      console.error("Error during voting:", error);
      alert("Failed to vote. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card shadow-sm" style={{ width: "18rem", margin: "1rem" }}>
      <img
        src={profilePic}
        className="card-img-top rounded-circle mx-auto mt-3"
        alt="Profile"
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{userName}</h5>
        <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
          {walletAddress}
        </p>
        <div className="d-flex justify-content-around align-items-center mt-3">
          <button
            className="btn btn-success"
            onClick={() => handleVote("upvote")}
            disabled={loading}
          >
            Upvote <span className="badge bg-light text-dark">{upvotes}</span>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleVote("downvote")}
            disabled={loading}
          >
            Downvote
            <span className="badge bg-light text-dark">{downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
