import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AnomalyTimeline from "@/components/Financial/AnomalyTimeline";
import TransactionPatternGraph from "@/components/Financial/TransactionPatternGraph";
import AnomalyExportReport from "@/components/Financial/AnomalyExportReport";

const FinanceDashboard = () => {
  return (
    <div className="p-6 space-y-6 text-[#00ffff] bg-[#111827] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">💸 AEGIX – Financial Monitoring</h1>
      <p className="text-gray-400 mb-8">
        Monitor suspicious wallets, detect anomalies, and track transaction patterns.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1e1e1e] text-white">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-[#00ffff] mb-2">Anomalies Over Time</h2>
            <AnomalyTimeline />
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e1e] text-white">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-[#00ffff] mb-2">Transaction Pattern Graph</h2>
            <TransactionPatternGraph />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1e1e1e] text-white mt-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-[#00ffff] mb-2">Anomaly Export Report</h2>
          <AnomalyExportReport />
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
