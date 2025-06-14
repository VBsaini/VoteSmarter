// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteSmarter {
    uint256 public voteFee = 0.000001 ether;

    struct Post {
        uint256 id;
        address creator;
        uint256 upvotes;
        uint256 downvotes;
        bool flagged;
        mapping(address => bool) downvoters;
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCount;
    address public treasury;

    constructor(address _treasury) {
        treasury = _treasury;
    }

    function createPost() external {
        postCount++;
        posts[postCount].id = postCount;
        posts[postCount].creator = msg.sender;
        posts[postCount].upvotes = 0;
        posts[postCount].downvotes = 0;
        posts[postCount].flagged = false;
        // No need to initialize the mapping; it's empty by default
    }

    function upvote(uint256 postId) external payable {
        require(msg.value == voteFee, "Must pay exact upvote fee");
        posts[postId].upvotes++;
        payable(treasury).transfer(msg.value);
    }

    function downvote(uint256 postId) external payable {
        require(msg.value == voteFee, "Must pay exact downvote fee");
        posts[postId].downvotes++;
        posts[postId].downvoters[msg.sender] = true;
        payable(treasury).transfer(msg.value);
    }

    function flagScam(uint256 postId) external {
        posts[postId].flagged = true;
    }

    function refundDownvote(uint256 postId) external {
        require(posts[postId].flagged, "Post not flagged as scam");
        require(posts[postId].downvoters[msg.sender], "You didn't downvote");
        posts[postId].downvoters[msg.sender] = false;
        payable(msg.sender).transfer(voteFee);
    }
}
