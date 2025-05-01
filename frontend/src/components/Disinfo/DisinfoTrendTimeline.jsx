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
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const DisinfoTrendTimeline = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("/data/disinfo_timeline_data.json")
      .then((res) => res.json())
      .then((data) => setChartData(data))
      .catch((err) =>
        console.error("Failed to load disinfo_timeline_data.json:", err)
      );
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "white" },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "#333" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#333" },
      },
    },
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">📈 Disinformation Trend Over Time</h2>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading trend data...</p>
      )}
    </div>
  );
};

export default DisinfoTrendTimeline;
