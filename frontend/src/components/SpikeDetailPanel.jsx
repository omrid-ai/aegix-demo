
import React from "react";

const SpikeDetailPanel = ({ spikeDetails }) => {
  if (!spikeDetails || spikeDetails.length === 0) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white mt-6 max-w-6xl mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📝 Spike Details</h2>
      <table className="w-full text-left table-auto border-collapse">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">📅 Date</th>
            <th className="p-2">🏴 Name</th>
            <th className="p-2">🧩 Type</th>
            <th className="p-2">⚡ Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {spikeDetails.map((entry, idx) => (
            <tr key={idx} className="border-t border-gray-600">
              <td className="p-2">{entry.date}</td>
              <td className="p-2">{entry.name}</td>
              <td className="p-2">{entry.type}</td>
              <td className="p-2">{entry.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpikeDetailPanel;
