import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ["2025-04-01", "2025-04-05", "2025-04-10", "2025-04-15"],
  datasets: [
    {
      label: "Predicted Risk",
      data: [12, 19, 9, 15],
      fill: true,
      borderColor: "#38bdf8",
      backgroundColor: "rgba(56, 189, 248, 0.2)",
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { labels: { color: "white" } },
  },
  scales: {
    x: { ticks: { color: "white" }, grid: { color: "gray" } },
    y: { ticks: { color: "white" }, grid: { color: "gray" } },
  },
};

const AIPredictionTimeline = () => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">📈 AI Risk Prediction Timeline</h2>
    <Line data={data} options={options} />
  </div>
);

export default AIPredictionTimeline;