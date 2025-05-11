// 📁 קובץ מעודכן: DashboardOverview.jsx
// כולל LiveAlertsPanel + גרף מגמות + KPI חשיפה + תובנות AI

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import LiveAlertsPanel from "./LiveAlertsPanel";
import AIInsightsPanel from "./Dashboard/AIInsightsPanel";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardOverview = () => {
  const [legalData, setLegalData] = useState([]);

  useEffect(() => {
    fetch("/data/legal/legal_cases.json")
      .then((res) => res.json())
      .then((data) => setLegalData(data));
  }, []);

  const highExposureCount = legalData.filter((c) => c.exposure === "High").length;

  const groupedByMonth = {};
  legalData.forEach((c) => {
    const month = c.date?.slice(0, 7); // YYYY-MM
    if (month) groupedByMonth[month] = (groupedByMonth[month] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(groupedByMonth),
    datasets: [
      {
        label: "Regulatory Cases",
        data: Object.values(groupedByMonth),
        backgroundColor: "#f87171",
      },
    ],
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📊 Overview Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-red-800">
          <CardContent className="p-4">
            <p className="text-lg font-semibold">🔴 תיקים ברמת חשיפה גבוהה</p>
            <p className="text-3xl mt-2">{highExposureCount}</p>
            <Link to="/legal-exposure" className="text-blue-300 underline text-sm mt-2 inline-block">
              מעבר ללוח חשיפה משפטית
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-900 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">📈 מגמות רגולציה לפי חודש</h2>
        <Bar data={chartData} />
      </div>

      <AIInsightsPanel results={legalData} /> {/* ✅ חדש */}
      <LiveAlertsPanel />
    </div>
  );
};

export default DashboardOverview;
