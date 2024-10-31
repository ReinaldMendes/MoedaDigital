import React from "react";
import WalletForm from "../components/WalletForm.jsx";
import WalletList from "../components/WalletList.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";

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
