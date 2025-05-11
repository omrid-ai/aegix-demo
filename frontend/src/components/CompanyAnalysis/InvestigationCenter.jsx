import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const InvestigationCenter = () => {
  const navigate = useNavigate();

  const modules = [
    {
      label: "🧠 Wallet Scanner",
      description: "Live scan for Ethereum wallet activity using Etherscan.",
      route: "/wallet-scanner",
    },
    {
      label: "💗 Wallet Intelligence",
      description: "In-depth wallet profile, contract patterns, risk score and AI insights.",
      route: "/wallet-intel",
    },
    {
      label: "📰 Company News Dashboard",
      description: "News and sentiment tracker for any company, powered by NewsAPI.",
      route: "/company-news",
    },
    {
      label: "📊 Crypto Market Overview",
      description: "Live coin rankings and financial summaries from CoinMarketCap.",
      route: "/crypto-market",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">🕵️ Investigation Center</h1>
        <p className="text-gray-400 mb-6">Centralized entry point to investigative modules in AEGIX.</p>

        <div className="space-y-6">
          {modules.map((mod, i) => (
            <div key={i} className="border border-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-1">{mod.label}</h2>
              <p className="text-gray-400 mb-3">{mod.description}</p>
              <button
                onClick={() => navigate(mod.route)}
                className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600 text-white"
              >
                Open
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-10 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
        >
          ← Back
        </button>
      </main>
    </div>
  );
};

export default InvestigationCenter;
