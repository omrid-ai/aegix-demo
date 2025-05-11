import React from "react";
import InfluenceHeatmapView from "./InfluenceHeatmapView";
import InfluenceDrillView from "./InfluenceDrillView";
import InfluenceByGroupMap from "./InfluenceByGroupMap";
import InfluenceTrendChart from "./InfluenceTrendChart";
import InfluenceCompareUsers from "./InfluenceCompareUsers";
import InfluencerDetectionReport from "./InfluencerDetectionReport";
import InfluenceHeatmapDailyLang from "./InfluenceHeatmapDailyLang";
import InfluenceAlertsPanel from "./InfluenceAlertsPanel";
import InfluenceOverviewDashboard from "./InfluenceOverviewDashboard";
import InfluenceTrendGraph from "./InfluenceTrendGraph";
import InfluenceAlerts from "./InfluenceAlerts";
import InfluenceReportDownload from "./InfluenceReportDownload";
import InfluenceGraphRelations from "./InfluenceGraphRelations";

const InfluenceDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold mb-6">📡 Influence Analytics Dashboard</h1>

      <div className="space-y-12 max-w-4xl mx-auto">
        <InfluenceOverviewDashboard />
        <InfluenceHeatmapView />
        <InfluenceDrillView />
        <InfluenceByGroupMap />
        <InfluenceTrendChart />
        <InfluenceCompareUsers />
        <InfluencerDetectionReport />
        <InfluenceHeatmapDailyLang />
        <InfluenceTrendGraph />
        <InfluenceAlerts />
        <InfluenceAlertsPanel />
        <InfluenceGraphRelations />
        <InfluenceReportDownload />
      </div>
    </div>
  );
};

export default InfluenceDashboard;