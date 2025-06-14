import React, { useState } from "react";
import CreateCreator from "../components/createCreator";
import SearchWallet from "../components/searchWallet";
import UsersCard from "../components/userCard";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateCreator, setShowCreateCreator] = useState(false); // State to toggle CreateCreator visibility

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Toggle Create Creator Section */}
        <div className="col-md-12 text-center mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateCreator((prev) => !prev)}
          >
            {showCreateCreator ? "Hide Create Creator" : "Show Create Creator"}
          </button>
        </div>

        {/* Create Creator Section */}
        {showCreateCreator && (
          <div className="col-md-6">
            <h3 className="text-center mb-4">Register a New Creator</h3>
            <CreateCreator />
          </div>
        )}

        {/* Search Wallet Section */}
        <div className="col-md-6">
          <h3 className="text-center mb-4">Search Creators</h3>
          <SearchWallet onUserSelect={handleUserSelect} />
        </div>
      </div>

      {/* Selected User Details */}
      {selectedUser && (
        <div className="mt-4">
          <UsersCard
            userName={selectedUser.userName}
            walletAddress={selectedUser.walletAddress}
            profilePic={selectedUser.profilePic}
            upvotes={selectedUser.upvotes}
            downvotes={selectedUser.downvotes}
            onUpvote={() => console.log("Upvoted!")}
            onDownvote={() => console.log("Downvoted!")}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
