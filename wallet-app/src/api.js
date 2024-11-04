import axios from "axios";

const API_URL = "https://moedadigital.onrender.com/users/login"; // Altere para o URL da sua API

export const createWallet = (data) => axios.post(`${API_URL}/carteiras`, data);
export const getWallets = () => axios.get(`${API_URL}/carteiras`);
export const createTransaction = (data) =>
  axios.post(`${API_URL}/transacoes`, data);
export const getTransactions = () => axios.get(`${API_URL}/transacoes`);
