import React from "react";
import narrativeStats from "/public/data/narrative_stats.json";

const NarrativeTable = () => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">🧠 Narrative Analysis Dashboard</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-400">
            <th>Category</th><th>Mentions</th><th>Impact</th><th>Campaign Size</th>
          </tr>
        </thead>
        <tbody>
          {narrativeStats.map((row, i) => (
            <tr key={i} className="border-t border-gray-700">
              <td>{row.topic}</td>
              <td>{row.mentions}</td>
              <td>{row.impact}</td>
              <td>{row.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NarrativeTable;