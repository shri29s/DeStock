// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//This is the ERC-20 token for the DeStock platform, using OpenZeppelin.
contract DeStockToken is ERC20, Ownable {
    constructor(
        address owner
    ) ERC20("DeStock Token", "DSTK") Ownable(owner) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // Mint 1 million tokens
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}