import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const FinancialAnomalyDashboard = () => {
  const [anomalies, setAnomalies] = useState([]);

  // סימולציית בקשה מהשרת
  useEffect(() => {
    const mockData = [
      { user: "UserX", amount: 12000, date: "2025-04-09", risk: "Medium" },
      { user: "UserY", amount: 42000, date: "2025-04-10", risk: "High" },
      { user: "UserZ", amount: 72000, date: "2025-04-11", risk: "Critical" },
    ];
    setAnomalies(mockData);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📉 Financial Anomaly Detector</h2>

      <Card>
        <CardContent className="p-4 overflow-auto">
          <Table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-left">User</th>
                <th className="p-2 border text-left">Amount</th>
                <th className="p-2 border text-left">Date</th>
                <th className="p-2 border text-left">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border">{row.user}</td>
                  <td className="p-2 border">${row.amount.toLocaleString()}</td>
                  <td className="p-2 border">{row.date}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      row.risk === "Critical"
                        ? "text-red-600"
                        : row.risk === "High"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {row.risk}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>

      <Button onClick={() => alert("📁 Export triggered")}>Export Report</Button>
    </div>
  );
};

export default FinancialAnomalyDashboard;
