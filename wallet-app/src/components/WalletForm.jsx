import React, { useState } from "react";
import { createWallet } from "../api";

const WalletForm = () => {
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState("BRL");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWallet({ balance, currency });
      setBalance(0);
      setCurrency("BRL");
      alert("Carteira criada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar carteira.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Carteira</h2>
      <label>
        Saldo:
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />
      </label>
      <label>
        Moeda:
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="BTC">BTC</option>
        </select>
      </label>
      <button type="submit">Criar</button>
    </form>
  );
};

export default WalletForm;
