// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {DeStockToken} from "../src/DeStockToken.sol";
import {DeStock} from "../src/DeStock.sol";

contract Deploy is Script {
    function run() external returns (DeStockToken, DeStock) {
        vm.startBroadcast();

        DeStockToken destockToken = new DeStockToken();
        DeStock destock = new DeStock(address(destockToken));

        vm.stopBroadcast();
        return (destockToken, destock);
    }
}
