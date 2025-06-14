import React, { useState } from "react";
import SearchWallet from "../components/searchWallet";
import UsersCard from "../components/userCard";
import CreateCreator from "../components/createCreator";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Create Creator Section */}
        <div className="col-md-6">
          <h3 className="text-center mb-4">Register a New Creator</h3>
          <CreateCreator />
        </div>

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
