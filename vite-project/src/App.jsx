import { useState, useEffect } from 'react'
import './App.css'
import { contractABI } from './utils/abi'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"; // replace this i.e "Deployed to"

function App() {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [expenses, setExpenses] = useState([]);


  console.log("Here is  your Expenses:", expenses);

  const connectwallet = async () => {
    if (!isConnected) {
      if (window.ethereum) {
        try {
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          const signer = await browserProvider.getSigner();
          const userAddress = await signer.getAddress();

          setProvider(browserProvider);
          setSigner(signer);
          setAddress(userAddress);
          setIsConnected(true);

          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            contractABI,
            signer
          );
          setContract(contractInstance);

          fetchExpenses(contractInstance);
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        alert("MetaMask not found. Please install MetaMask.");
      }
    } else {
      // Disconnect logic
      setAddress("");
      setSigner(null);
      setProvider(null);
      setContract(null);
      setIsConnected(false);
      setExpenses([]);
    }
  };

  const addexpenses = async () => {
    const descInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");

    const description = descInput.value.trim();
    const amount = amountInput.value;

    if (!description || !amount) {
      alert("Please enter both description and amount");
      return;
    }

    try {
      const tx = await contract.addExpense(description, ethers.parseUnits(amount, "wei"));
      await tx.wait();
      alert("Expense added!");
      descInput.value = "";
      amountInput.value = "";
      fetchExpenses(contract);
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Failed to add expense.");
    }
  };

  const fetchExpenses = async (contractInstance = contract) => {
    try {
      const allExpenses = await contractInstance.getAllExpenses();
      setExpenses(allExpenses);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Blockchain Expense Tracker 💸</h1>

        <button onClick={connectwallet} id="connectBtn">
          {isConnected ? "🔌 Disconnect" : "🔌 Connect Wallet"}
        </button>
        {/* { <p id="walletAddress">
          {isConnected ? Connected: ${address} : "Not connected"}
        </p> } */}

        {isConnected && (
          <>
            <form id="expenseForm" onSubmit={(e) => e.preventDefault()}>
              <h2>Add New Expense</h2>
              <input type="text" id="description" placeholder="Description" />
              <input type="number" id="amount" placeholder="Amount in Wei" />
              <button onClick={addexpenses} id="addExpenseBtn">➕ Add Expense</button>
            </form>

            <h2>All Expenses</h2>
            <ul id="expenseList">
              {expenses.length === 0 ? (
                <p>No expenses found.</p>
              ) : (
                expenses.map((exp, index) => (
                  <li key={index}>
                            {exp[0]} - {ethers.formatUnits(exp[1], "wei")} Wei - Paid by: {exp[2]}

                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default App;