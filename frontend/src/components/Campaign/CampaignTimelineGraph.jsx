import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const CampaignTimelineGraph = () => {
  const [timelineData, setTimelineData] = useState(null);

  useEffect(() => {
    fetch("/data/campaign_timeline_data.json")
      .then((res) => res.json())
      .then((data) => setTimelineData(data))
      .catch((err) => console.error("Failed to load campaign timeline data:", err));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "white" } },
      tooltip: {
        callbacks: {
          label: (context) => `Activity Level: ${context.parsed.y}`
        }
      }
    },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "gray" } },
      y: { ticks: { color: "white" }, grid: { color: "gray" } }
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">📈 Campaign Trend Timeline</h2>
      {timelineData ? (
        <Line data={timelineData} options={options} />
      ) : (
        <p className="text-gray-400">Loading timeline data...</p>
      )}
    </div>
  );
};

export default CampaignTimelineGraph;
