// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract inbox {
    string public message;
    constructor(string memory initialMessage) {
        message = initialMessage;
    }
    function setMessage(string memory _message) public {
        message = _message; 
    }
}