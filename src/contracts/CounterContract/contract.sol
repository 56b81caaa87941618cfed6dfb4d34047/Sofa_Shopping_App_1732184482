
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CounterContract {
    using SafeMath for uint256;

    uint256 private _count;

    event CounterIncremented(uint256 newValue);
    event CounterDecremented(uint256 newValue);

    constructor() {
        _count = 0;
    }

    function increment() public {
        _count = _count.add(1);
        emit CounterIncremented(_count);
    }

    function decrement() public {
        _count = _count.sub(1);
        emit CounterDecremented(_count);
    }

    function getCount() public view returns (uint256) {
        return _count;
    }
}
