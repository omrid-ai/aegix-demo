import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Trend Score",
      data: [5, 10, 7, 15, 12],
      borderColor: "#10b981",
      fill: false,
    },
  ],
};

const NLPTrendTimeline = () => (
  <div className="bg-white p-4 rounded shadow mt-4">
    <h3 className="font-semibold mb-2">📈 NLP Topic Trend</h3>
    <Line data={data} />
  </div>
);

export default NLPTrendTimeline;