import React from "react";
import SearchWallet from "../screens/searchWallet";

const Home = () => {
  const users = [
    {
      userName: "John Doe",
      walletAddress: "0x1234...abcd",
      profilePic: "https://via.placeholder.com/100",
    },
    {
      userName: "Jane Smith",
      walletAddress: "0x5678...efgh",
      profilePic: "https://via.placeholder.com/100",
    },
    {
      userName: "Alice Johnson",
      walletAddress: "0x9abc...def0",
      profilePic: "https://via.placeholder.com/100",
    },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", flexDirection: "column" }}
    >
      <SearchWallet users={users} />
    </div>
  );
};

export default Home;
