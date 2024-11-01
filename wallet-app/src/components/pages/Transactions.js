import React, { useState } from "react";

const Transactions = () => {
  const [transaction, setTransaction] = useState({
    walletFrom: "",
    walletTo: "",
    amount: "",
    currency: "BRL",
    typeTransition: "transfer",
  });

  const handleInputChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      alert("Transação realizada com sucesso");
    } catch (error) {
      console.error("Erro ao realizar transação:", error);
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Nova Transação</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="walletFrom"
          placeholder="Carteira de Origem"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="walletTo"
          placeholder="Carteira de Destino"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Valor"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <select
          name="currency"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="BTC">BTC</option>
        </select>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          Transferir
        </button>
      </form>
    </div>
  );
};

export default Transactions;
