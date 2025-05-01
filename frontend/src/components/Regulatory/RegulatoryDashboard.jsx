import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import RegulatoryTrendsChart from "./RegulatoryTrendsChart";

const RegulatoryDashboard = () => {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetch("/data/fixed_regulatory_trends_data.json")
      .then((res) => res.json())
      .then((data) => setTrendData(data))
      .catch((err) => console.error("Failed to load regulatory trends:", err));
  }, []);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">📘 Regulatory Intelligence Dashboard</h1>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">🧠 Policy Announcements</h2>
          <ul className="space-y-3">
            {trendData.map((item, idx) => (
              <li key={idx} className="bg-gray-800 p-4 rounded shadow">
                <p className="text-cyan-400 font-bold">{item.title}</p>
                <p className="text-sm text-gray-300">{item.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Source: {item.source} | Date: {item.date}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <RegulatoryTrendsChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryDashboard;