
// src/components/ThreatActors/ThreatActorProfile.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ThreatActorProfile = () => {
  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-[#00ffff] mb-4">👤 Threat Actor Profile</h1>
      <Card className="bg-[#1e1e1e] mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-[#00ffff]">Profile Overview</h2>
          <p className="text-gray-300 mt-2">Name: RedWolf</p>
          <p className="text-gray-300">Risk Level: High</p>
          <p className="text-gray-300">Linked Groups: DarkMarkets, CyberWarriors</p>
        </CardContent>
      </Card>

      <Card className="bg-[#1e1e1e] mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-[#00ffff]">Activity Summary</h2>
          <p className="text-gray-300 mt-2">• 350+ mentions in last 30 days</p>
          <p className="text-gray-300">• Associated with 5 high-risk Telegram groups</p>
        </CardContent>
      </Card>

      <Card className="bg-[#1e1e1e]">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-[#00ffff]">Export Profile Report</h2>
          <button className="mt-3 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white">Download PDF</button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatActorProfile;
