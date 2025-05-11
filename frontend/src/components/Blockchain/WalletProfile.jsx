import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const WalletProfile = () => {
  const { walletId } = useParams();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/data/mock_wallet_profiles.json").then((res) => {
      const found = res.data.find((w) => w.wallet_id === walletId);
      setWallet(found);
    });
    axios.get("/data/mock_wallet_history.json").then((res) => {
      setHistory(res.data.filter((h) => h.wallet_id === walletId));
    });
  }, [walletId]);

  if (!wallet) return <div className="text-white p-4">Loading...</div>;

  const chartData = {
    labels: history.map((h) => h.date),
    datasets: [
      {
        label: "Daily Volume",
        data: history.map((h) => h.volume),
        borderColor: "#36a2eb",
        backgroundColor: "#36a2eb",
        tension: 0.4,
        fill: false
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: { labels: { color: "#fff" } }
    },
    scales: {
      x: { ticks: { color: "#ccc" }, grid: { color: "#333" } },
      y: { ticks: { color: "#ccc" }, grid: { color: "#333" } }
    }
  };

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">👛 Wallet Profile: {wallet.wallet_id}</h1>
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-700 rounded">← Back</button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded shadow">
          <p><strong>Risk Score:</strong> {wallet.risk_score}</p>
          <p><strong>Total Transactions:</strong> {wallet.transaction_count}</p>
          <p><strong>Last Seen:</strong> {wallet.last_seen}</p>
          <p><strong>Location:</strong> {wallet.city}, {wallet.country}</p>
          <p><strong>Associated User:</strong> {wallet.user_name || "Unknown"}</p>
          <p><strong>Social Links:</strong> {wallet.social_links?.join(", ") || "N/A"}</p>
          <p><strong>Labels:</strong> {wallet.labels.join(", ")}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="font-semibold mb-2">📈 Transaction History</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">🔗 Known Connections</h2>
        <ul className="list-disc list-inside">
          {wallet.connections?.map((c, index) => (
            <li key={index}>{c.wallet_id} — {c.relation}</li>
          )) || <li>No known connections</li>}
        </ul>
      </div>

      <div>
        <a
          href="/data/mock_wallet_profiles.json"
          download="wallet_profile_export.json"
          className="px-4 py-2 bg-green-600 rounded"
        >
          📥 Export Profile JSON
        </a>
      </div>
    </div>
  );
};

export default WalletProfile;
