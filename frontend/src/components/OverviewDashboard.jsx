import React from "react";
import TopStatsPanel from "./partials/TopStatsPanel";
import RiskTrendChart from "./partials/RiskTrendChart";
import NarrativeTable from "./partials/NarrativeTable";
import AIRecommendationsBox from "./partials/AIRecommendationsBox";
import CrisisMap from "./partials/CrisisMap";

const OverviewDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">AEGIX – Open-Source Intelligence Overview</h1>
      <TopStatsPanel />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskTrendChart />
        <AIRecommendationsBox />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NarrativeTable />
        <CrisisMap />
      </div>
    </div>
  );
};

export default OverviewDashboard;