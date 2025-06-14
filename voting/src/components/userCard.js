import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

  async function handleVote(type) {
    setLoading(true);
    // try {
    fetch("http://localhost:5000/api/upvote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: 1 }), // Make sure postId is valid!
    }).then((response) => {
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        // throw new Error("Network response was not ok");
      }
      return response;
    });
    // const data = await res.json();
    // if (data.error) {
    //   alert(data.error);
    // } else {
    // // Optionally, fetch updated votes from backend or increment locally
    // if (type === "upvote") setUpvotes((u) => u + 1);
    // if (type === "downvote") setDownvotes((d) => d + 1);
    // alert(data.message);
    // }
    // } catch (err) {
    //   alert("Network error");
    // }
    // setLoading(false);
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
            Downvote{" "}
            <span className="badge bg-light text-dark">{downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
