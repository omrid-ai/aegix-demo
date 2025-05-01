import React from "react";

const MessageClusterView = () => {
  const clusters = [
    { topic: "Regulation Delay", count: 34 },
    { topic: "Government Criticism", count: 22 },
    { topic: "Support for Reform", count: 18 },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">📌 Message Clusters</h3>
      <ul className="list-disc pl-5">
        {clusters.map((c, i) => (
          <li key={i}>{c.topic} ({c.count} mentions)</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageClusterView;