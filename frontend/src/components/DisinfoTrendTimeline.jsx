import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DisinfoTrendTimeline = () => {
  const [selected, setSelected] = useState("deep state");

  const dataSets = {
    "deep state": [12, 19, 30, 25, 40, 55, 80],
    "fake vaccine": [5, 12, 18, 30, 33, 50, 45],
    "global banking control": [8, 11, 15, 20, 18, 22, 35],
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const chartData = {
    labels,
    datasets: [
      {
        label: selected,
        data: dataSets[selected],
        borderColor: "#f43f5e",
        backgroundColor: "rgba(244,63,94,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <Card className="p-6">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">📈 Disinfo Trend Timeline</h2>

        <div className="mb-4">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="deep state">deep state</option>
            <option value="fake vaccine">fake vaccine</option>
            <option value="global banking control">global banking control</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded">
          <Line data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DisinfoTrendTimeline;