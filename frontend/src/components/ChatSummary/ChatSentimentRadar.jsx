import React from "react";
import { Radar } from "react-chartjs-2";

const data = {
  labels: ["Support", "Fear", "Anger", "Curiosity", "Neutral"],
  datasets: [
    {
      label: "Sentiment Radar",
      data: [65, 30, 45, 50, 80],
      backgroundColor: "rgba(59,130,246,0.2)",
      borderColor: "#3b82f6",
      borderWidth: 2,
    },
  ],
};

const ChatSentimentRadar = () => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">Sentiment Radar</h3>
    <Radar data={data} />
  </div>
);

export default ChatSentimentRadar;