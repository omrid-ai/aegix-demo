import React from "react";

const NarrativeList = ({ narratives }) => {
  if (!narratives || narratives.length === 0) {
    return <p className="text-sm text-gray-400">No narratives found.</p>;
  }

  return (
    <ul className="list-disc ml-4 space-y-1">
      {narratives.map((n, index) => (
        <li key={index}>
          Sentiment: {n.sentiment} | Source: {n.source}
        </li>
      ))}
    </ul>
  );
};

export default NarrativeList;
