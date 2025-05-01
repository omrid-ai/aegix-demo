import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CrisisLiveFeed from "./CrisisLiveFeed";
import CrisisHeatmapView from "./CrisisHeatmapView";
import CrisisTimeline from "./CrisisTimeline";
import CrisisReportExport from "./CrisisReportExport";

const CrisisResponseDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">🛑 Crisis Response Dashboard</h2>
      <CrisisLiveFeed />
      <CrisisHeatmapView />
      <CrisisTimeline />
      <CrisisReportExport />
    </div>
  );
};

export default CrisisResponseDashboard;