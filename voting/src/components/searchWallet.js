import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchWallet = ({ users, onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.walletAddress.toLowerCase().includes(query.toLowerCase()) ||
        user.userName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">
        Search Users by Name or Wallet Address
      </h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter name or wallet address"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {filteredUsers.length > 0 ? (
        <div className="row">
          {filteredUsers.map((user) => (
            <div
              className="col-md-4"
              key={user.walletAddress}
              onClick={() => onUserSelect(user)}
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm mb-4" style={{ width: "18rem" }}>
                <img
                  src={user.profilePic}
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{user.userName}</h5>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {user.walletAddress}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        searchQuery && (
          <p className="text-center text-danger mt-3">
            No users found with this name or wallet address.
          </p>
        )
      )}
    </div>
  );
};

export default SearchWallet;
