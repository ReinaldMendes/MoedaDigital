import React, { useEffect, useState } from "react";
import { getTransactions } from "../api";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transações</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            ID: {transaction._id} | De: {transaction.walletFrom} | Para:{" "}
            {transaction.walletTo} | Valor: {transaction.amount}{" "}
            {transaction.currency} | Tipo: {transaction.typeTransition} |
            Status: {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
