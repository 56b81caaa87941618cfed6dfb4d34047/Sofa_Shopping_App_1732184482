
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract CounterContract {
    uint256 private _count;

    event CounterUpdated(uint256 newValue, string action);

    function increment() public {
        _count++;
        emit CounterUpdated(_count, "increment");
    }

    function decrement() public {
        if (_count > 0) {
            _count--;
            emit CounterUpdated(_count, "decrement");
        } else {
            revert("Counter cannot be decremented below zero");
        }
    }

    function getCount() public view returns (uint256) {
        return _count;
    }
}
