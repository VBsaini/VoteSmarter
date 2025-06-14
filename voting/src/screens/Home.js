import React, { useState } from "react";
import SearchWallet from "../components/searchWallet";
import UsersCard from "../components/userCard";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      userName: "John Doe",
      walletAddress: "0x1234...abcd",
      profilePic: "https://via.placeholder.com/100",
      upvotes: 10,
      downvotes: 2,
    },
    {
      userName: "Jane Smith",
      walletAddress: "0x5678...efgh",
      profilePic: "https://via.placeholder.com/100",
      upvotes: 5,
      downvotes: 1,
    },
    {
      userName: "Alice Johnson",
      walletAddress: "0x9abc...def0",
      profilePic: "https://via.placeholder.com/100",
      upvotes: 8,
      downvotes: 3,
    },
  ];

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mt-5">
      <SearchWallet users={users} onUserSelect={handleUserSelect} />
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
