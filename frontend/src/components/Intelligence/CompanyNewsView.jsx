import React from "react";
import CompanyNewsPanel from "./CompanyNewsPanel";

const CompanyNewsView = () => {
  const companyName = "BlackRock"; // אפשר להפוך לדינמי לפי הצורך

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">📰 News Coverage: {companyName}</h1>
      <p className="text-sm text-gray-400 mb-4">
        This panel shows recent news headlines for the selected company from NewsAPI.
      </p>
      <CompanyNewsPanel companyName={companyName} />
    </div>
  );
};

export default CompanyNewsView;
