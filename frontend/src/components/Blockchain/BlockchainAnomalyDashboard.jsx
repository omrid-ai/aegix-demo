import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlockchainAnomalyDashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/data/mock_blockchain_data.json").then((res) => setData(res.data));
  }, []);

  const outliers = data.filter((item) => item.outlier === -1);
  const normal = data.filter((item) => item.outlier === 1);

  const pieData = {
    labels: ["Normal", "Outlier"],
    datasets: [
      {
        data: [normal.length, outliers.length],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const lineData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: "Transaction Amount",
        data: data.map((item) => item.transaction_amount),
        fill: false,
        borderColor: "#4bc0c0",
      },
    ],
  };

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📊 Blockchain Anomaly Dashboard</h1>
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-700 rounded">
        ← Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card><CardContent><Pie data={pieData} /></CardContent></Card>
        <Card><CardContent><Line data={lineData} /></CardContent></Card>
      </div>
      <div className="mt-4">
        <a
          href="/data/mock_blockchain_data.json"
          download="blockchain_data_export.json"
          className="px-4 py-2 bg-green-600 rounded"
        >
          📥 Export JSON
        </a>
      </div>
    </div>
  );
};

export default BlockchainAnomalyDashboard;
