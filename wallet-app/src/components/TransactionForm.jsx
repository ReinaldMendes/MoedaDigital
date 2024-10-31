import React, { useState } from "react";
import { createTransaction } from "../api";

const TransactionForm = () => {
  const [walletFrom, setWalletFrom] = useState("");
  const [walletTo, setWalletTo] = useState("");
  const [amount, setAmount] = useState(0);
  const [typeTransition, setTypeTransition] = useState("transfer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction({ walletFrom, walletTo, amount, typeTransition });
      alert("Transação realizada com sucesso!");
      setWalletFrom("");
      setWalletTo("");
      setAmount(0);
      setTypeTransition("transfer");
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar transação.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Realizar Transação</h2>
      <label>
        Carteira De:
        <input
          type="text"
          value={walletFrom}
          onChange={(e) => setWalletFrom(e.target.value)}
          required
        />
      </label>
      <label>
        Carteira Para:
        <input
          type="text"
          value={walletTo}
          onChange={(e) => setWalletTo(e.target.value)}
          required
        />
      </label>
      <label>
        Valor:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Tipo de Transação:
        <select
          value={typeTransition}
          onChange={(e) => setTypeTransition(e.target.value)}
          required
        >
          <option value="transfer">Transferência</option>
          <option value="deposit">Depósito</option>
          <option value="withdraw">Retirada</option>
        </select>
      </label>
      <button type="submit">Realizar</button>
    </form>
  );
};

export default TransactionForm;
