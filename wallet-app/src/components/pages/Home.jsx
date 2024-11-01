import React from "react";
import WalletForm from "../WalletForm.jsx";
import WalletList from "../WalletList.jsx";
import TransactionForm from "../TransactionForm.jsx";
import TransactionList from "../TransactionList.jsx";

const Home = () => {
  return (
    <div>
      <h1>Gestão de Carteiras e Transações</h1>
      <WalletForm />
      <WalletList />
      <TransactionForm />
      <TransactionList />
    </div>
  );
};

export default Home;
