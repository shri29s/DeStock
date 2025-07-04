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
        _mint(address(this), 5_000_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferFromContract(address to, uint256 amount) public onlyOwner {
        _transfer(address(this), to, amount);
    }

    // Test purpose
    function batchAirDrop(address[] calldata recipients, uint256[] calldata amounts) external {
        require(recipients.length == amounts.length, "Length mismatch");

        for (uint256 i = 0; i < recipients.length; i++) {
            _transfer(address(this), recipients[i], amounts[i]);
        }
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
