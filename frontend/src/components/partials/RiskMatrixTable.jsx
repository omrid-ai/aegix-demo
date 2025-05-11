import React from "react";

const RiskMatrixTable = ({ risks }) => {
  return (
    <table className="w-full text-left border border-gray-700">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-2">Area</th>
          <th className="p-2">Risk Level</th>
          <th className="p-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        {risks.map((r, idx) => (
          <tr key={idx} className="border-t border-gray-700">
            <td className="p-2 font-medium text-white">{r.area}</td>
            <td className="p-2 text-yellow-400">{r.risk}</td>
            <td className="p-2 text-gray-300">{r.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RiskMatrixTable;
