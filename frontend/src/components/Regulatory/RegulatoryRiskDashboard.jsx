import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import RegulatoryAlertsPanel from "./RegulatoryAlertsPanel";

const RegulatoryRiskDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">⚖️ Regulatory Risk Dashboard</h1>

      <Card>
        <CardContent className="p-6">
          <p className="text-gray-300 mb-4">
            Monitoring ongoing legislative updates, regulatory signals, and compliance risk triggers.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <RegulatoryAlertsPanel />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryRiskDashboard;