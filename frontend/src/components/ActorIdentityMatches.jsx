import React from "react";

const confidenceColors = {
  High: "text-red-400",
  Medium: "text-yellow-400",
  Low: "text-gray-400"
};

const ActorIdentityMatches = ({ matches }) => {
  return (
    <div className="space-y-3">
      {matches.map((m, idx) => (
        <div key={idx} className="bg-gray-800 p-4 rounded border border-gray-700">
          <div className="text-white font-semibold text-sm">
            {m.actor_1} ↔ {m.actor_2}
          </div>
          <div className="text-xs text-gray-300">
            Match Type: {m.match_type} | <span className={confidenceColors[m.confidence]}>{m.confidence} Confidence</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActorIdentityMatches;
