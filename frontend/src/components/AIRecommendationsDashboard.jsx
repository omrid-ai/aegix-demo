// 📁 components/AIRecommendationsDashboard.jsx

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const allRecommendations = [
  { id: 1, sector: "Finance", action: "Investigate unusual wallets", type: "investigation" },
  { id: 2, sector: "Threat Actor", action: "Alert on repeated activity by 'APT-X'", type: "alert" },
  { id: 3, sector: "Crisis", action: "Geo-fence user near protest zone", type: "geo" },
  { id: 4, sector: "Narrative", action: "Monitor trending keyword: 'election fraud'", type: "trend" },
  { id: 5, sector: "Finance", action: "Create rule for shell companies pattern", type: "rule" },
  { id: 6, sector: "Narrative", action: "Block coordinated term spike: 'fake ID'", type: "rule" },
];

const sectors = ["All", "Finance", "Threat Actor", "Crisis", "Narrative"];
const types = ["All", "investigation", "alert", "geo", "trend", "rule"];

const AIRecommendationsDashboard = () => {
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filtered = allRecommendations.filter((rec) => {
    const matchesSector = selectedSector === "All" || rec.sector === selectedSector;
    const matchesType = selectedType === "All" || rec.type === selectedType;
    return matchesSector && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">🧠 AI Recommendations Center</h1>
        <div className="flex space-x-2">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Sector</th>
                <th className="py-2">Recommendation</th>
                <th className="py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rec) => (
                <tr key={rec.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-medium">{rec.sector}</td>
                  <td>{rec.action}</td>
                  <td className="text-xs text-gray-500">{rec.type}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-400">
                    No recommendations found for current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendationsDashboard;