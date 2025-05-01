
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent } from "../ui/Card";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Actor Activity",
      data: [5, 10, 8, 6, 7, 9, 11],
      fill: false,
      borderColor: "#3b82f6",
      tension: 0.4,
    },
  ],
};

const ActorActivityTimeline = () => {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold text-white mb-2">Activity Timeline</h3>
        <Line data={data} />
      </CardContent>
    </Card>
  );
};

export default ActorActivityTimeline;
