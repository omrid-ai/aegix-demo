import React from "react";
import AIInsightPanel from "@/components/AI/AIInsightPanel";
import AIRiskAlerts from "@/components/AI/AIRiskAlerts";
import AIPredictionTimeline from "@/components/AI/AIPredictionTimeline";
import AIExportPanel from "@/components/AI/AIExportPanel";

const AIRecommendationDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold">🧠 AI Recommendation Dashboard</h1>
      <AIInsightPanel />
      <AIPredictionTimeline />
      <AIRiskAlerts />
      <AIExportPanel />
    </div>
  );
};

export default AIRecommendationDashboard;