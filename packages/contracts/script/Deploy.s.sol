// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {DeStockToken} from "../src/DeStockToken.sol";
import {DeStock} from "../src/DeStock.sol";
import {console} from "forge-std/console.sol";

contract Deploy is Script {
    function run() external returns (DeStockToken, DeStock) {
        vm.startBroadcast();

        // Deploy DSTK token first
        DeStockToken destockToken = new DeStockToken(msg.sender);
        console.log("DeStockToken deployed at:", address(destockToken));

        // Deploy main DeStock contract
        DeStock destock = new DeStock(address(destockToken), msg.sender);
        console.log("DeStock deployed at:", address(destock));

        // Log deployment info for frontend consumption
        console.log("=== Deployment Complete ===");
        console.log("Network Chain ID:", block.chainid);
        console.log("DSTK Token Address:", address(destockToken));
        console.log("DeStock Contract Address:", address(destock));
        console.log("Owner Address:", msg.sender);

        vm.stopBroadcast();
        return (destockToken, destock);
    }
}