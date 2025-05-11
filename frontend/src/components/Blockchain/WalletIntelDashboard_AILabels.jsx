
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { analyzeWalletTransactions } from "@/utils/analyzeWalletIntel";
import { knownLabels } from "@/utils/walletLabels";
import { saveAs } from "file-saver";
import WalletConnectionsGraph from "./WalletConnectionsGraph";
import WalletFilters from "./WalletFilters";

import {
  Chart,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const WalletIntelDashboard = ({ walletAddress }) => {
  const [txs, setTxs] = useState([]);
  const [filteredTxs, setFilteredTxs] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ function: "", minValue: 0, contractOnly: false });
  const [aiInsight, setAiInsight] = useState("");

  const ETHERSCAN_API_KEY = "11S8ASCTJASN9R3FW4UQ92VN8WCN2IXIDF";

  useEffect(() => {
    const fetchTxs = async () => {
      try {
        const url =
          "https://api.etherscan.io/api?module=account&action=txlist&address=" +
          walletAddress +
          "&startblock=0&endblock=99999999&sort=desc&apikey=" +
          ETHERSCAN_API_KEY;

        const res = await axios.get(url);
        if (res.data.status === "1") {
          const data = res.data.result.map(tx => {
            const from = tx.from.toLowerCase();
            const to = tx.to?.toLowerCase();
            tx.label = knownLabels[from] || knownLabels[to] || "";
            return tx;
          });
          setTxs(data);
          const analyzed = analyzeWalletTransactions(data);
          setStats(analyzed);
          generateAiInsight(analyzed);
        } else {
          setError("No transactions found or API limit reached.");
        }
      } catch (err) {
        setError("API error.");
      }
    };

    if (walletAddress) fetchTxs();
  }, [walletAddress]);

  useEffect(() => {
    const result = txs.filter(tx => {
      const fn = tx.functionName?.split("(")[0] || "unknown";
      const value = parseFloat(tx.value) / 1e18;
      const isContract = tx.contractAddress && tx.contractAddress !== "0x0000000000000000000000000000000000000000";
      return (
        (filters.function === "" || fn === filters.function) &&
        value >= parseFloat(filters.minValue || 0) &&
        (!filters.contractOnly || isContract)
      );
    });
    setFilteredTxs(result);
  }, [filters, txs]);

  const generateAiInsight = (analyzed) => {
    const { totalTx, selfTransfers, failedTx, averageValueETH } = analyzed;
    let insight = "";

    if (selfTransfers / totalTx > 0.2) {
      insight += "High self-transfer ratio suggests bot-like behavior. ";
    }
    if (failedTx > 5) {
      insight += "Multiple failed transactions may indicate contract interaction testing. ";
    }
    if (averageValueETH < 0.01) {
      insight += "Low average transfer value may indicate micro-payment activity. ";
    }
    if (!insight) {
      insight = "No strong anomalies detected. Wallet behavior appears standard.";
    }
    setAiInsight(insight);
  };

  const exportCSV = () => {
    if (!filteredTxs.length) return;
    const header = Object.keys(filteredTxs[0]).join(",");
    const rows = filteredTxs.map(tx => Object.values(tx).join(",")).join("\n");
    const blob = new Blob([header + "\n" + rows], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "wallet_" + walletAddress + "_filtered.csv");
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!stats) return <div className="text-white p-4">Loading intelligence data...</div>;

  const chartData = {
    labels: Object.keys(stats.dailyVolume),
    datasets: [{
      label: "Daily Volume (ETH)",
      data: Object.values(stats.dailyVolume),
      fill: false,
      borderColor: "#36a2eb"
    }]
  };

  return (
    <div className="bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Wallet Intelligence Dashboard</h1>
      <p><strong>Wallet:</strong> {walletAddress}</p>
      <WalletFilters filters={filters} setFilters={setFilters} />

      <div className="bg-gray-800 text-yellow-300 p-4 rounded mb-6">
        <h2 className="font-bold text-lg mb-2">🧠 AI Insight</h2>
        <p>{aiInsight}</p>
      </div>

      <p><strong>Filtered Transactions:</strong> {filteredTxs.length}</p>
      <p><strong>Total Volume:</strong> {stats.totalValueETH.toFixed(4)} ETH</p>

      <div className="my-6">
        <Line data={chartData} />
      </div>

      <div className="my-6">
        <button onClick={exportCSV} className="bg-blue-600 px-4 py-2 rounded">📤 Export CSV</button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Top Functions (All Data)</h2>
        <ul className="list-disc ml-6">
          {Object.entries(stats.byFunction).map(([fn, count], i) => (
            <li key={i}>{fn} — {count} times</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Top Recipients</h2>
        <ul className="list-disc ml-6">
          {stats.topRecipients.map(([addr, val], i) => (
            <li key={i}>{addr} — {val.toFixed(4)} ETH</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Top Senders</h2>
        <ul className="list-disc ml-6">
          {stats.topSenders.map(([addr, val], i) => (
            <li key={i}>{addr} — {val.toFixed(4)} ETH</li>
          ))}
        </ul>
      </div>

      {filteredTxs.length > 0 && (
        <div className="mt-8">
          <WalletConnectionsGraph transactions={filteredTxs} />
        </div>
      )}
    </div>
  );
};

export default WalletIntelDashboard;
