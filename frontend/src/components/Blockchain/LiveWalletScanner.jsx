import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// מפתח API אישי מאתר Etherscan
const ETHERSCAN_API_KEY = "11S8ASCTJASN9R3FW4UQ92VN8WCN2IXIDF";

// פונקציית שליפה מ־Etherscan API
const fetchWalletData = async (walletAddress) => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "0") {
      throw new Error("No transactions found for this wallet address.");
    }

    const txList = response.data.result;
    return {
      wallet_id: walletAddress,
      transaction_count: txList.length,
      last_seen: txList[0]?.timeStamp
        ? new Date(parseInt(txList[0].timeStamp) * 1000).toISOString().split("T")[0]
        : "N/A",
      labels: ["Live Data from Etherscan"],
      risk_score: Math.min(10, txList.length / 20).toFixed(1),
      connections: [],
    };
  } catch (err) {
    console.error("Etherscan API error:", err);
    return { error: err.message || "API request failed" };
  }
};

const LiveWalletScanner = () => {
  const [address, setAddress] = useState("");
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setWallet(null);

    const data = await fetchWalletData(address);

    if (data?.error) {
      setError(data.error);
    } else {
      setWallet(data);
    }

    setLoading(false);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 Live Wallet Intelligence Scanner</h1>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum Wallet Address"
          className="w-1/2 px-4 py-2 rounded bg-gray-800 text-white"
        />
        <button
          onClick={handleScan}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Scan
        </button>
      </div>

      {loading && <p>⏳ Scanning wallet data from Etherscan...</p>}
      {error && <p className="text-yellow-400">⚠️ {error}</p>}

      {wallet && (
        <div className="bg-white text-black p-6 rounded shadow max-w-3xl">
          <h2 className="text-xl font-bold mb-4">🧠 Wallet Intelligence</h2>
          <p><strong>Wallet:</strong> {wallet.wallet_id}</p>
          <p><strong>Risk Score:</strong> {wallet.risk_score}</p>
          <p><strong>Transactions:</strong> {wallet.transaction_count}</p>
          <p><strong>Last Seen:</strong> {wallet.last_seen}</p>
          <p><strong>Labels:</strong> {wallet.labels?.join(", ")}</p>

          <button
            onClick={() => navigate(`/wallet-profile/${wallet.wallet_id}`)}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
          >
            Go to Wallet Profile &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveWalletScanner;
