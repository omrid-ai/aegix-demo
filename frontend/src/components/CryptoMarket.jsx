// 📁 C:/Users/User/my_project/frontend/src/components/CryptoMarket.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoMarket = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/crypto");
        setCoins(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch crypto data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">💱 Top Cryptocurrencies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-gray-800 rounded text-sm">
          <thead>
            <tr className="text-left bg-gray-700">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price (USD)</th>
              <th className="p-2">Market Cap</th>
              <th className="p-2">24h %</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, i) => (
              <tr key={coin.id} className="border-t border-gray-600">
                <td className="p-2">{coin.cmc_rank}</td>
                <td className="p-2">{coin.name} ({coin.symbol})</td>
                <td className="p-2">${coin.quote.USD.price.toFixed(2)}</td>
                <td className="p-2">${(coin.quote.USD.market_cap / 1e9).toFixed(2)}B</td>
                <td className="p-2">{coin.quote.USD.percent_change_24h.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoMarket;