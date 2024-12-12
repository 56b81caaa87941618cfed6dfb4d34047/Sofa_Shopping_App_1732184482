
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RandomContract is Ownable {
    mapping(address => uint256) private randomNumbers;
    mapping(address => uint256) private lastRequestTime;

    uint256 private constant COOLDOWN_PERIOD = 1 hours;

    event RandomNumberRequested(address indexed user);
    event RandomNumberGenerated(address indexed user, uint256 randomNumber);
    event RandomNumberRetrieved(address indexed user, uint256 randomNumber);

    constructor() Ownable() {}

    function requestRandomNumber() external {
        require(block.timestamp >= lastRequestTime[msg.sender] + COOLDOWN_PERIOD, "Cooldown period not elapsed");
        
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 1000000;
        randomNumbers[msg.sender] = randomNumber;
        lastRequestTime[msg.sender] = block.timestamp;

        emit RandomNumberRequested(msg.sender);
        emit RandomNumberGenerated(msg.sender, randomNumber);
    }

    function retrieveRandomNumber() external view returns (uint256) {
        uint256 randomNumber = randomNumbers[msg.sender];
        require(randomNumber != 0, "No random number generated for this address");
        return randomNumber;
    }

    function getLastRequestTime(address user) external view returns (uint256) {
        return lastRequestTime[user];
    }
}
