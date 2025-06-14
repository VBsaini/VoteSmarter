import React, { useState } from "react";
import UsersCard from "../screens/usersCard";

const Home = () => {
  const [upvotes, setUpvotes] = useState(10);
  const [downvotes, setDownvotes] = useState(2);

  const handleUpvote = () => setUpvotes(upvotes + 1);
  const handleDownvote = () => setDownvotes(downvotes + 1);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <UsersCard
        userName="John Doe"
        walletAddress="0x1234...abcd"
        profilePic="https://via.placeholder.com/100"
        upvotes={upvotes}
        downvotes={downvotes}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
      />
    </div>
  );
};

export default Home;
