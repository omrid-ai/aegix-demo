// 📁 components/RiskTrendTimeline.jsx

import React, { useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const allData = {
  All: [
    { date: "2024-12", score: 2, alerts: 1 },
    { date: "2025-01", score: 3, alerts: 2 },
    { date: "2025-02", score: 4, alerts: 2 },
    { date: "2025-03", score: 6, alerts: 4 },
    { date: "2025-04", score: 5, alerts: 3 },
    { date: "2025-05", score: 8, alerts: 6 },
    { date: "2025-06", score: 10, alerts: 7 },
    { date: "2025-07", score: 7, alerts: 5 }
  ],
  Finance: [
    { date: "2025-01", score: 2, alerts: 1 },
    { date: "2025-02", score: 3, alerts: 1 },
    { date: "2025-03", score: 4, alerts: 2 },
    { date: "2025-04", score: 5, alerts: 3 },
    { date: "2025-05", score: 6, alerts: 2 },
    { date: "2025-06", score: 7, alerts: 3 },
    { date: "2025-07", score: 6, alerts: 2 }
  ],
  Crisis: [
    { date: "2025-01", score: 1, alerts: 1 },
    { date: "2025-02", score: 2, alerts: 1 },
    { date: "2025-03", score: 3, alerts: 2 },
    { date: "2025-04", score: 4, alerts: 3 },
    { date: "2025-05", score: 5, alerts: 2 },
    { date: "2025-06", score: 6, alerts: 3 },
    { date: "2025-07", score: 4, alerts: 2 }
  ]
};

const RiskTrendTimeline = () => {
  const [sector, setSector] = useState("All");
  const chartRef = useRef(null);
  const data = allData[sector];

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Date,AvgRiskScore,Alerts"]
        .concat(data.map(d => \`\${d.date},\${d.score},\${d.alerts}\`))
        .join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `risk_trend_${sector.toLowerCase()}.csv`;
    link.click();
  };

  const exportToPNG = () => {
    const svg = chartRef.current?.container?.children[0];
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      canvas.width = svg.clientWidth;
      canvas.height = svg.clientHeight;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `risk_trend_${sector.toLowerCase()}.png`;
      downloadLink.click();
    };
    img.src = url;
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">📈 AI Risk Trend Timeline</h2>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            {Object.keys(allData).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 text-sm">
          <button onClick={exportToCSV} className="px-3 py-1 border rounded hover:bg-gray-100">
            Export CSV
          </button>
          <button onClick={exportToPNG} className="px-3 py-1 border rounded hover:bg-gray-100">
            Export PNG
          </button>
        </div>

        <p className="text-sm text-muted-foreground">
          Overview of risk scores and alert volumes by month, filtered by sector.
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} ref={chartRef}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" name="Avg Risk Score" stroke="#f97316" strokeWidth={2} />
            <Line type="monotone" dataKey="alerts" name="Alerts" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RiskTrendTimeline;