import React from "react";

const events = [
  { timestamp: "2024-04-10 09:30", description: "Unusual spike in volume" },
  { timestamp: "2024-04-10 10:45", description: "New wallet received 50+ txs" },
];

const AnomalyTimeline = () => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Anomaly Timeline</h3>
    <ul className="list-disc ml-4 text-sm">
      {events.map((e, idx) => (
        <li key={idx}>
          <strong>{e.timestamp}:</strong> {e.description}
        </li>
      ))}
    </ul>
  </div>
);

export default AnomalyTimeline;
