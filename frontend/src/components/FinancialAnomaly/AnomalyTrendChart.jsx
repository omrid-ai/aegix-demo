import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Anomaly Count",
      data: [2, 5, 8, 6, 4, 9, 11],
      borderColor: "#ef4444",
      fill: false,
      tension: 0.4,
    },
  ],
};

const AnomalyTrendChart = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">📈 Anomaly Trend Chart</h2>
    <Card>
      <CardContent className="p-4">
        <Line data={data} />
      </CardContent>
    </Card>
  </div>
);

export default AnomalyTrendChart;
