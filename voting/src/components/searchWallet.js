import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const SearchWallet = ({ onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [creators, setCreators] = useState([]); // Initialize as an empty array
  const [filteredCreators, setFilteredCreators] = useState([]); // Initialize as an empty array

  // Fetch creators from the backend
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/creators");
        console.log("API Response:", response.data); // Debug the response
        setCreators(response.data || []); // Fallback to an empty array if undefined
        setFilteredCreators(response.data || []); // Fallback to an empty array if undefined
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    };

    fetchCreators();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = creators.filter(
      (creator) =>
        creator.walletAddress.toLowerCase().includes(query.toLowerCase()) ||
        creator.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCreators(filtered);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">
        Search Creators by Name or Wallet Address
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
      {filteredCreators?.length > 0 ? (
        <div className="row">
          {filteredCreators.map((creator) => (
            <div
              className="col-md-4"
              key={creator.walletAddress}
              onClick={() => onUserSelect(creator)}
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm mb-4" style={{ width: "18rem" }}>
                <img
                  src={creator.profilePic}
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{creator.name}</h5>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {creator.walletAddress}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-danger mt-3">No creators found.</p>
      )}
    </div>
  );
};

export default SearchWallet;
