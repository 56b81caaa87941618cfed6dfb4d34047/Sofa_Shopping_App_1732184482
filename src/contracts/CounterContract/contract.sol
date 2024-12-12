
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CounterContract is Ownable {
    using SafeMath for uint256;

    uint256 private _tableCount;

    event CountUpdated(uint256 newCount);

    constructor() Ownable() {
        _tableCount = 0;
    }

    function incrementCount() public {
        _tableCount = _tableCount.add(1);
        emit CountUpdated(_tableCount);
    }

    function decrementCount() public {
        require(_tableCount > 0, "Count cannot be negative");
        _tableCount = _tableCount.sub(1);
        emit CountUpdated(_tableCount);
    }

    function getCount() public view returns (uint256) {
        return _tableCount;
    }
}
