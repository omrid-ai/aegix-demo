import React from "react";
import { Line } from "react-chartjs-2";
import data from "/public/data/risks_trend.json";

const RiskTrendChart = () => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(ds => ({
      ...ds,
      borderWidth: 2,
      fill: false
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } }
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } }
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2">📈 AI Risk Trend Timeline</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RiskTrendChart;