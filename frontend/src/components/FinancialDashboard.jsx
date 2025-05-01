import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FinancialActivityChart from "@/components/Financial/FinancialActivityChart";
import SuspiciousWalletsTable from "@/components/Financial/SuspiciousWalletsTable";

const FinancialDashboard = () => {
  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold text-[#00ffff]">💸 Financial Intelligence</h1>
      <p className="text-gray-400">Monitor suspicious crypto activity and wallet behavior patterns</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#1e1e1e]">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#00ffff] mb-2">Transaction Activity</h2>
            <FinancialActivityChart />
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e1e]">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#00ffff] mb-2">Flagged Wallets</h2>
            <SuspiciousWalletsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDashboard;
