export const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_description", "type": "string" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "addExpense",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllExpenses",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" },
          { "internalType": "address", "name": "payer", "type": "address" }
        ],
        "internalType": "struct ExpenseTracker.Expense[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];