import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const wallets = [
  { address: "0xAbc123...9F", risk: "High", lastActivity: "2025-04-03" },
  { address: "0xDef456...8A", risk: "Medium", lastActivity: "2025-04-02" },
  { address: "0xXyz789...1C", risk: "Critical", lastActivity: "2025-04-01" },
];

const SuspiciousWalletsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-white">
        <thead className="text-xs uppercase text-[#00ffff]">
          <tr>
            <th className="px-4 py-2">Wallet Address</th>
            <th className="px-4 py-2">Risk Level</th>
            <th className="px-4 py-2">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="px-4 py-2">{wallet.address}</td>
              <td className="px-4 py-2">{wallet.risk}</td>
              <td className="px-4 py-2">{wallet.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuspiciousWalletsTable;
