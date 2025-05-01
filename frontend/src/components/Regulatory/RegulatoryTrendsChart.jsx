import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const RegulatoryTrendsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("/data/regulatory_trends_chart_data.json")
      .then((res) => res.json())
      .then((data) => setChartData(data))
      .catch((err) => console.error("Failed to load chart data:", err));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
    },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "#444" } },
      y: { ticks: { color: "white" }, grid: { color: "#444" } },
    },
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">📊 Regulatory Trends Timeline</h2>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-gray-400">Loading chart...</p>
      )}
    </div>
  );
};

export default RegulatoryTrendsChart;