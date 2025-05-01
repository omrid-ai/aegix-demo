
import React from "react";
import Sidebar from "../Sidebar";
import NarrativeTrendTimeline from "@/components/Narrative/NarrativeTrendTimeline";
import NarrativeTopicClusters from "@/components/Narrative/NarrativeTopicClusters";
import NarrativeGeoMap from "@/components/Narrative/NarrativeGeoMap";
import NarrativeExportReport from "@/components/Narrative/NarrativeExportReport";

const NarrativeDashboard = () => {
  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-[#00ffff]">🧠 Narrative Monitoring</h1>
        <p className="text-gray-400">Track disinformation trends, narrative clusters, and origin geolocation</p>

        <h2 className="text-xl font-semibold text-[#00ffff]">📈 Narrative Trend Timeline</h2>
        <NarrativeTrendTimeline />

        <h2 className="text-xl font-semibold text-[#00ffff]">🧠 Narrative Topic Clusters</h2>
        <NarrativeTopicClusters />

        <h2 className="text-xl font-semibold text-[#00ffff]">🗺️ Geolocation Heatmap</h2>
        <NarrativeGeoMap />

        <NarrativeExportReport />
      </div>
    </div>
  );
};

export default NarrativeDashboard;
