// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {DeStockToken} from "../src/DeStockToken.sol";
import {DeStock} from "../src/DeStock.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DeStockTest is Test {
    DeStockToken public destockToken;
    DeStock public destock;

    address public owner = address(0x1234);
    address public alice = address(0x5678);
    address public bob = address(0x9ABC);

    function setUp() public {
        // Deploy contracts
        vm.startPrank(owner);
        destockToken = new DeStockToken();
        destock = new DeStock(address(destockToken));
        vm.stopPrank();

        // Fund users
        vm.startPrank(owner);
        destockToken.mint(owner, 2000 ether);
        destockToken.transfer(alice, 1000 ether);
        destockToken.transfer(bob, 1000 ether);
        vm.stopPrank();
    }

    // Registration test
    function test_RegisterCompany() public {
        vm.startPrank(alice);
        // Alice approves DeStock contract to spend her DSTK
        destockToken.approve(address(destock), destock.MINIMUM_LIQUIDITY());
        
        // Alice registers a company
        destock.registerCompany("Alice's Apples", 1000, destock.MINIMUM_LIQUIDITY());

        // Check company details
        (,, address companyOwner, uint256 totalSupply, uint256 tokenReserve, uint256 shareReserve) = destock.companies(0);
        assertEq(companyOwner, alice, "Company owner should be Alice");
        assertEq(totalSupply, 1000, "Total supply should be 1000");
        assertEq(tokenReserve, destock.MINIMUM_LIQUIDITY(), "Token reserve is incorrect");
        assertEq(shareReserve, 1000, "Share reserve is incorrect");
        
        // Check Alice received her shares
        assertEq(destock.balanceOf(alice, 0), 1000, "Alice should own 1000 shares");
    }

    function test_Fail_RegisterCompany_InsufficientLiquidity() public {
        vm.startPrank(alice);
        try destock.registerCompany("Alice's Apples", 1000, 5 ether) {
            fail();
        } catch {
            // Expected revert
        }
    }

    // AMM test
    function test_BuyShares() public {
        // 1. Alice registers a company
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.MINIMUM_LIQUIDITY());
        destock.registerCompany("Alice's Apples", 1000, destock.MINIMUM_LIQUIDITY());
        // Alice must approve the DeStock contract to transfer her shares for the LP
        destock.setApprovalForAll(address(destock), true);
        vm.stopPrank();

        // 2. Bob buys shares
        vm.startPrank(bob);
        uint256 sharesToBuy = 50;
        uint256 cost = destock.getBuyPrice(0, sharesToBuy);

        destockToken.approve(address(destock), cost);
        destock.buyShares(0, sharesToBuy);

        // Check Bob's balances
        assertEq(destock.balanceOf(bob, 0), sharesToBuy, "Bob should have 50 shares");
        assertEq(destockToken.balanceOf(bob), 1000 ether - cost, "Bob's DSTK balance is wrong");
        
        // Check company reserves
        (,,,,, uint256 shareReserve) = destock.companies(0);
        assertEq(shareReserve, 1000 - sharesToBuy, "Share reserve should be 950");
    }

    function test_SellShares() public {
        // 1. Alice registers and Bob buys shares
        test_BuyShares();

        // 2. Bob sells his shares
        vm.startPrank(bob);
        uint256 sharesToSell = 25;
        uint256 proceeds = destock.getSellPrice(0, sharesToSell);

        // Bob must approve the contract to take his shares
        destock.setApprovalForAll(address(destock), true);
        
        vm.startPrank(alice);
        destockToken.approve(address(destock), proceeds);
        vm.stopPrank();
        
        vm.startPrank(bob);
        destock.sellShares(0, sharesToSell);

        // Check Bob's balances
        assertEq(destock.balanceOf(bob, 0), 25, "Bob should have 25 shares left");
        
        // Check company reserves
        (,,,,, uint256 shareReserve) = destock.companies(0);
        assertEq(shareReserve, 950 + sharesToSell, "Share reserve should be 975");
    }
}
