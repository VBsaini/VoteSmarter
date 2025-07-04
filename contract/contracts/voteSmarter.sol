// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteSmarter {
    uint256 public voteFee = 0.001 ether;

    struct Post {
        uint256 id;
        address creator;
        uint256 upvotes;
        uint256 downvotes;
        bool flagged;
        mapping(address => bool) downvoters;
    }

    struct Creator {
        address wallet;
        string name;
        string profilePic;
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCount;
    address public treasury;

    // --- Creator management ---
    mapping(address => Creator) public creators;
    address[] public creatorAddresses;

    constructor(address _treasury) {
        treasury = _treasury;
    }

    // Register a new creator
    // function createCreator(string memory name, string memory profilePic) public {
    //     require(bytes(creators[msg.sender].name).length == 0, "Creator exists");
    //     creators[msg.sender] = Creator(msg.sender, name, profilePic);
    //     creatorAddresses.push(msg.sender);
    // }
function createCreator(address walletAddress, string memory name, string memory profilePic) public {
    require(walletAddress != address(0), "Invalid wallet address");
    require(bytes(creators[walletAddress].name).length == 0, "Creator already exists");

    creators[walletAddress] = Creator(walletAddress, name, profilePic);
    creatorAddresses.push(walletAddress);
           postCount++;
        posts[postCount].id = postCount;
        posts[postCount].creator = walletAddress;
        posts[postCount].upvotes = 0;
        posts[postCount].downvotes = 0;
        posts[postCount].flagged = false;
}

function deleteCreatorAndPosts(address creatorAddress) public {
        require(bytes(creators[creatorAddress].name).length > 0, "Creator does not exist");

        // Delete all posts created by the creator
        for (uint256 i = 1; i <= postCount; i++) {
            if (posts[i].creator == creatorAddress) {
                delete posts[i];
            }
        }

        // Remove the creator from the mapping
        delete creators[creatorAddress];

        // Remove the creator from the creatorAddresses array
        for (uint256 i = 0; i < creatorAddresses.length; i++) {
            if (creatorAddresses[i] == creatorAddress) {
                creatorAddresses[i] = creatorAddresses[creatorAddresses.length - 1];
                creatorAddresses.pop();
                break;
            }
        }
    }
    

    // Get all creators (for frontend/backend)
    function getAllCreators() public view returns (Creator[] memory) {
        Creator[] memory all = new Creator[](creatorAddresses.length);
        for (uint i = 0; i < creatorAddresses.length; i++) {
            all[i] = creators[creatorAddresses[i]];
        }
        return all;
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
    function getPostVotes(uint256 postId) public view returns (uint256 upvotes, uint256 downvotes) {
        require(postId >= 0 && postId <= postCount, "Post does not exist");
        Post storage post = posts[postId];
        return (post.upvotes, post.downvotes);
    }
}
