import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const NarrativeDetectorDashboard = () => {
  const detectedNarratives = [
    { topic: "CBDC", risk: "High", trend: "Surveillance narrative rising", date: "2025-04-01" },
    { topic: "Climate Tax", risk: "Medium", trend: "Anti-regulation claims growing", date: "2025-04-02" },
  ];

  return (
    <Card className="p-6">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">🧩 Narrative Manipulation Dashboard</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Topic</th>
              <th className="p-2 border">Trend</th>
              <th className="p-2 border">Detected</th>
              <th className="p-2 border">Risk</th>
            </tr>
          </thead>
          <tbody>
            {detectedNarratives.map((n, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{n.topic}</td>
                <td className="p-2 border">{n.trend}</td>
                <td className="p-2 border">{n.date}</td>
                <td className="p-2 border">{n.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default NarrativeDetectorDashboard;