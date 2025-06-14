import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UsersCard = ({
  userName,
  walletAddress,
  profilePic,
  upvotes,
  downvotes,
  onUpvote,
  onDownvote,
}) => {
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
          <button className="btn btn-success" onClick={onUpvote}>
            Upvote <span className="badge bg-light text-dark">{upvotes}</span>
          </button>
          <button className="btn btn-danger" onClick={onDownvote}>
            Downvote{" "}
            <span className="badge bg-light text-dark">{downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
