import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ActorActivityTimeline from "./ActorActivityTimeline";
import ActorRiskMatrix from "./ActorRiskMatrix";
import ActorNetworkGraph from "./ActorNetworkGraph";
import ActorExportReport from "./ActorExportReport";

const ThreatActorDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-950 text-white min-h-screen">
      <h1 className="text-2xl font-bold">🕵️ Threat Actor Intelligence</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActorActivityTimeline />
        <ActorRiskMatrix />
      </div>
      <ActorNetworkGraph />
      <ActorExportReport />
    </div>
  );
};

export default ThreatActorDashboard;