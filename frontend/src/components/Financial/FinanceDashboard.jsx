// 📁 src/components/Financial/FinanceDashboard.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TransactionPatternGraph from "@/components/Financial/TransactionPatternGraph";
import AnomalyTimeline from "@/components/Financial/AnomalyTimeline";
import AnomalyExportReport from "@/components/Financial/AnomalyExportReport";

const FinanceDashboard = () => {
  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold text-[#00ffff]">💸 Financial Intelligence</h1>
      <p className="text-gray-400">Analyze suspicious wallets and detect anomalies in transaction patterns.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#1e1e1e]">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#00ffff] mb-2">Transaction Pattern Overview</h2>
            <TransactionPatternGraph />
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e1e]">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#00ffff] mb-2">Anomaly Timeline</h2>
            <AnomalyTimeline />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1e1e1e]">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-[#00ffff] mb-2">Export Financial Anomalies</h2>
          <AnomalyExportReport />
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
