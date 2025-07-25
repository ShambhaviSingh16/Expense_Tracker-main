// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ExpenseTracker} from "../src/Expensetracker.sol";

contract CounterScript is Script {
    ExpenseTracker public expense;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        expense = new ExpenseTracker();

        vm.stopBroadcast();
    }
}
