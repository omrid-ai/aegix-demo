import React from "react";

const KeyHighlightsPanel = () => {
  const highlights = [
    "Sentiment shifted positively after minister’s statement.",
    "Spike in anti-government messages on Monday.",
    "Group X highly active on reform topic.",
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">✨ Key Highlights</h3>
      <ul className="list-disc pl-5">
        {highlights.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};

export default KeyHighlightsPanel;