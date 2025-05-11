import React from "react";

const riskColors = {
  Critical: "bg-red-700",
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500"
};

const ActorRiskMatrix = ({ risks }) => {
  return (
    <table className="w-full border border-gray-700 text-sm">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-2 text-left">Cluster</th>
          <th className="p-2 text-left">Risk Level</th>
          <th className="p-2 text-left">Note</th>
        </tr>
      </thead>
      <tbody>
        {risks.map((item, idx) => (
          <tr key={idx} className="border-t border-gray-700">
            <td className="p-2 text-white font-medium">{item.cluster}</td>
            <td className={`p-2 text-black font-bold ${riskColors[item.risk_level] || "bg-gray-400"}`}>{item.risk_level}</td>
            <td className="p-2 text-gray-300">{item.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActorRiskMatrix;
