import React, { useState } from "react";

const Wallet = () => {
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("BRL");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ balance, currency }),
      });
      const data = await response.json();
      alert("Carteira criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar carteira:", error);
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Criar Carteira</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Saldo"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="BTC">BTC</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Criar
        </button>
      </form>
    </div>
  );
};

export default Wallet;
