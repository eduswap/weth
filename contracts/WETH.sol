// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/IWETH.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20, IWETH {
    constructor() ERC20("Wrapped Ether", "WETH") {}

    // Fallback function to revert all incoming Ether
    receive() external payable {
        revert("WETH::receive: Use the deposit function");
    }

    // Actual fallback function to handle the incoming Ether
    fallback() external payable {
        deposit();
    }

    function deposit() public payable {
        _mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) external {
        require(
            balanceOf(msg.sender) >= _amount,
            "WETH::withdraw: Sender balance must be greater than or equal to _amount."
        );

        _burn(msg.sender, _amount);

        // Use call instead of transfer
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "WETH::withdraw: Withdrawal failed");

        emit Withdraw(msg.sender, _amount);
    }
}