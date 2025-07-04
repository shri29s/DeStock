// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {DeStockToken} from "../src/DeStockToken.sol";
import {DeStock} from "../src/DeStock.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

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

    // Registration tests
    function test_RegisterCompany() public {
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.MINIMUM_LIQUIDITY());
        destock.registerCompany(
            "Alice's Apples",
            1000,
            destock.MINIMUM_LIQUIDITY(),
            ""
        );

        (
            ,
            ,
            address companyOwner,
            uint256 totalSupply,
            uint256 tokenReserve,
            uint256 shareReserve,
        ) = destock.companies(0);
        assertEq(companyOwner, alice, "Company owner should be Alice");
        assertEq(totalSupply, 1000, "Total supply should be 1000");
        assertEq(
            tokenReserve,
            destock.MINIMUM_LIQUIDITY(),
            "Token reserve is incorrect"
        );
        assertEq(shareReserve, 1000, "Share reserve is incorrect");
        assertEq(
            destock.balanceOf(alice, 0),
            1000,
            "Alice should own 1000 shares"
        );
    }

    function test_Fail_RegisterCompany_InsufficientLiquidity() public {
        vm.startPrank(alice);
        vm.expectRevert("DeStock: insufficient liquidity");
        destock.registerCompany("Alice's Apples", 1000, 5 ether, "");
    }

    // Buy shares tests
    function test_BuyShares() public {
        // 1. Alice registers a company
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.MINIMUM_LIQUIDITY());
        destock.registerCompany(
            "Alice's Apples",
            1000,
            destock.MINIMUM_LIQUIDITY(),
            ""
        );
        destock.setApprovalForAll(address(destock), true);
        vm.stopPrank();

        // 2. Bob buys shares
        vm.startPrank(bob);
        uint256 sharesToBuy = 50;
        uint256 cost = destock.getBuyPrice(0, sharesToBuy);
        destockToken.approve(address(destock), cost);
        destock.buyShares(0, sharesToBuy);

        assertEq(
            destock.balanceOf(bob, 0),
            sharesToBuy,
            "Bob should have 50 shares"
        );
        assertEq(
            destockToken.balanceOf(bob),
            1000 ether - cost,
            "Bob's DSTK balance is wrong"
        );

        (
            ,
            ,
            ,
            ,
            ,
            uint256 shareReserve,
        ) = destock.companies(0);
        assertEq(
            shareReserve,
            1000 - sharesToBuy,
            "Share reserve should be 950"
        );
    }

    function test_Fail_BuyShares_InvalidCompany() public {
        vm.startPrank(bob);
        vm.expectRevert("DeStock: company does not exist");
        destock.buyShares(99, 50); // 99 is an invalid company ID
    }

    function test_Fail_BuyShares_ZeroAmount() public {
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.MINIMUM_LIQUIDITY());
        destock.registerCompany(
            "Alice's Apples",
            1000,
            destock.MINIMUM_LIQUIDITY(),
            ""
        );
        vm.stopPrank();

        vm.startPrank(bob);
        vm.expectRevert("DeStock: amount must be > 0");
        destock.buyShares(0, 0);
    }

    function test_Fail_BuyShares_InsufficientAllowance() public {
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.MINIMUM_LIQUIDITY());
        destock.registerCompany(
            "Alice's Apples",
            1000,
            destock.MINIMUM_LIQUIDITY(),
            ""
        );
        vm.stopPrank();

        vm.startPrank(bob);
        uint256 cost = destock.getBuyPrice(0, 50);
        vm.expectRevert(
            abi.encodeWithSignature(
                "ERC20InsufficientAllowance(address,uint256,uint256)",
                address(destock),
                0,
                cost
            )
        );
        destock.buyShares(0, 50);
    }

    // Sell shares tests
    function test_SellShares() public {
        test_BuyShares();

        vm.startPrank(bob);
        uint256 sharesToSell = 25;
        uint256 proceeds = destock.getSellPrice(0, sharesToSell);
        destock.setApprovalForAll(address(destock), true);
        uint256 bobBalanceBefore = destockToken.balanceOf(bob);
        vm.stopPrank();

        vm.startPrank(alice);
        destockToken.approve(address(destock), proceeds);
        vm.stopPrank();

        vm.startPrank(bob);
        destock.sellShares(0, sharesToSell);

        assertEq(
            destock.balanceOf(bob, 0),
            25,
            "Bob should have 25 shares left"
        );
        assertEq(
            destockToken.balanceOf(bob),
            bobBalanceBefore + proceeds,
            "Bob's DSTK balance is wrong after selling"
        );

        (
            ,
            ,
            ,
            ,
            ,
            uint256 shareReserve,
        ) = destock.companies(0);
        assertEq(
            shareReserve,
            950 + sharesToSell,
            "Share reserve should be 975"
        );
    }

    function test_Fail_SellShares_InvalidCompany() public {
        vm.startPrank(bob);
        vm.expectRevert("DeStock: company does not exist");
        destock.sellShares(99, 10);
    }

    function test_Fail_SellShares_ZeroAmount() public {
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.MINIMUM_LIQUIDITY());
        destock.registerCompany(
            "Alice's Apples",
            1000,
            destock.MINIMUM_LIQUIDITY(),
            ""
        );
        vm.stopPrank();

        vm.startPrank(bob);
        vm.expectRevert("DeStock: amount must be > 0");
        destock.sellShares(0, 0);
    }

    function test_Fail_SellShares_InsufficientBalance() public {
        vm.startPrank(alice);
        destockToken.approve(address(destock), destock.MINIMUM_LIQUIDITY());
        destock.registerCompany(
            "Alice's Apples",
            1000,
            destock.MINIMUM_LIQUIDITY(),
            ""
        );
        vm.stopPrank();

        vm.startPrank(bob);
        vm.expectRevert("DeStock: insufficient share balance");
        destock.sellShares(0, 10);
    }
}