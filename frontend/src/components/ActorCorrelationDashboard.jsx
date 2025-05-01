import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

const ActorCorrelationDashboard = () => {
  const navigate = useNavigate();

  const data = {
    labels: ["Telegram", "X", "Forums", "IRC", "Pastebin"],
    datasets: [
      {
        label: "Correlated Actors",
        data: [12, 19, 7, 5, 9],
        fill: false,
        backgroundColor: "#22d3ee",
        borderColor: "#06b6d4",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: "white" }, grid: { color: "gray" } },
      x: { ticks: { color: "white" }, grid: { color: "gray" } },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center p-8">
      <div className="w-full max-w-6xl space-y-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 bg-gray-800 hover:bg-cyan-700 text-white py-2 px-4 rounded transition"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold mb-4">🛰 Cross-Platform Actor Correlation</h1>
        <p className="text-gray-400 mb-6">
          Detect users and personas that appear across multiple platforms with high correlation scores.
        </p>
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ActorCorrelationDashboard;