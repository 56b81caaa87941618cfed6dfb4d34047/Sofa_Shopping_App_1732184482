
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RandomContract is Ownable {
    using SafeMath for uint256;

    uint256 private constant MAX_HISTORY_PER_USER = 100;

    mapping(address => uint256[]) private userRandomHistory;

    event RandomNumberGenerated(address indexed user, uint256 randomNumber);
    event UserHistoryCleared(address indexed user);

    constructor() Ownable() {}

    function generateRandomNumber() public returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)));
        randomNumber = randomNumber.mod(1000).add(1); // Generate a number between 1 and 1000

        if (userRandomHistory[msg.sender].length >= MAX_HISTORY_PER_USER) {
            userRandomHistory[msg.sender][userRandomHistory[msg.sender].length.sub(1)] = randomNumber;
        } else {
            userRandomHistory[msg.sender].push(randomNumber);
        }

        emit RandomNumberGenerated(msg.sender, randomNumber);
        return randomNumber;
    }

    function getUserHistory() public view returns (uint256[] memory) {
        return userRandomHistory[msg.sender];
    }

    function clearUserHistory(address user) public onlyOwner {
        delete userRandomHistory[user];
        emit UserHistoryCleared(user);
    }
}
