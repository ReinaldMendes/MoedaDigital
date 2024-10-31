import React, { useEffect, useState } from "react";
import { getWallets } from "../api";

const WalletList = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await getWallets();
        setWallets(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWallets();
  }, []);

  return (
    <div>
      <h2>Carteiras</h2>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet._id}>
            ID: {wallet._id} | Saldo: {wallet.balance} {wallet.currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletList;
