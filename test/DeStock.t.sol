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
        destockToken.transfer(alice, 1000 ether);
        destockToken.transfer(bob, 1000 ether);
        vm.stopPrank();
    }

    // Registration test
    function test_RegisterCompany() public {
        vm.startPrank(alice);
        // Alice approves DeStock contract to spend her DSTK
        destockToken.approve(address(destock), destock.REGISTRATION_FEE());
        
        // Alice registers a company
        destock.registerCompany("Alice's Apples", 10 ether, 1000);

        // Check company details
        (, string memory name, address companyOwner, , ) = destock.companies(0);
        assertEq(companyOwner, alice, "Company owner should be Alice");
        assertEq(name, "Alice's Apples", "Company name is incorrect");
        
        // Check Alice received her shares
        assertEq(destock.balanceOf(alice, 0), 1000, "Alice should own 1000 shares");
    }

    function test_Fail_RegisterCompany_InsufficientAllowance() public {
        vm.startPrank(alice);
        try destock.registerCompany("Alice's Apples", 10 ether, 1000) {
            fail();
        } catch {
            // Expected revert
        }
    }

    // AMM test
    function test_BuyShares() public {
        // 1. Alice registers a company
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.REGISTRATION_FEE());
        destock.registerCompany("Alice's Apples", 10 ether, 1000);
        // Alice must approve the DeStock contract to transfer her shares for the LP
        destock.setApprovalForAll(address(destock), true);
        vm.stopPrank();

        // 2. Bob buys shares
        vm.startPrank(bob);
        uint256 sharesToBuy = 50;
        uint256 initialPrice = destock.getSharePrice(0);
        uint256 cost = initialPrice * sharesToBuy;

        destockToken.approve(address(destock), cost);
        destock.buyShares(0, sharesToBuy);

        // Check Bob's balances
        assertEq(destock.balanceOf(bob, 0), sharesToBuy, "Bob should have 50 shares");
        assertEq(destockToken.balanceOf(bob), 1000 ether - cost, "Bob's DSTK balance is wrong");
        
        // Check Alice's share balance
        assertEq(destock.balanceOf(alice, 0), 1000 - sharesToBuy, "Alice should have 950 shares left");
    }

    function test_SellShares() public {
        // 1. Alice registers and Bob buys shares
        test_BuyShares();

        // 2. Bob sells his shares
        vm.startPrank(bob);
        uint256 sharesToSell = 25;
        uint256 sellPrice = destock.getSharePrice(0);
        uint256 proceeds = sellPrice * sharesToSell;

        // Bob must approve the contract to take his shares
        destock.setApprovalForAll(address(destock), true);
        destock.sellShares(0, sharesToSell);

        // Check Bob's balances
        assertEq(destock.balanceOf(bob, 0), 25, "Bob should have 25 shares left");
        // Bob's balance = initial - cost + proceeds
        assertEq(destockToken.balanceOf(bob), 1000 ether - (10 ether * 50) + proceeds, "Bob's DSTK balance is wrong after selling");
    }

    // Admin test
    function test_WithdrawFees() public {
        // Alice registers a company, paying a fee
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.REGISTRATION_FEE());
        destock.registerCompany("Alice's Apples", 10 ether, 1000);
        vm.stopPrank();

        // Owner withdraws the fees
        vm.startPrank(owner);
        uint256 initialOwnerBalance = destockToken.balanceOf(owner);
        destock.withdrawFees();
        uint256 finalOwnerBalance = destockToken.balanceOf(owner);

        assertEq(finalOwnerBalance, initialOwnerBalance + destock.REGISTRATION_FEE(), "Owner did not receive fees");
    }

    function test_Fail_WithdrawFees_NotOwner() public {
        vm.prank(alice); // Not the owner
        try destock.withdrawFees() {
            fail();
        } catch {
            // Expected revert
        }
    }
}