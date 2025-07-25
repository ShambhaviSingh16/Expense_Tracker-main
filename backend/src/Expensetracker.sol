// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpenseTracker {
    struct Expense {
        string description;
        uint amount;
        address payer;
    }

    Expense[] public expenses;

    function addExpense(string memory _description, uint _amount) public {
        expenses.push(Expense(_description, _amount, msg.sender));
    }

    function getAllExpenses() public view returns (Expense[] memory) {
        return expenses;
    }

    function getExpenseCount() public view returns (uint) {
        return expenses.length;
    }
}