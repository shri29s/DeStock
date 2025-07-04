// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeStockToken is ERC20, ERC20Capped, Ownable {
    constructor()
        ERC20("DeStock Token", "DSTK")
        ERC20Capped(10_000_000 * 10 ** 18)
        Ownable(msg.sender)
    {
        _mint(address(this), 1_000_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferFromContract(address to, uint256 amount) public onlyOwner {
        _transfer(address(this), to, amount);
    }

    // Resolve conflict between ERC20 and ERC20Capped
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Capped) {
        super._update(from, to, value);
    }
}
