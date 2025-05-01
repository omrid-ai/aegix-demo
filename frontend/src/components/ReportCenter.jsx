// src/components/ReportCenter.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReportCenter = () => {
  const reports = [
    { name: "Users Report", date: "2025-04-08", link: "/reports/telegram_users_report.csv" },
    { name: "Groups Report", date: "2025-04-08", link: "/reports/telegram_groups_report.csv" },
    { name: "Geo Map", date: "2025-04-08", link: "/reports/geo_map.html" },
  ];

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Report Center</h2>
        <ul className="space-y-4">
          {reports.map((r, idx) => (
            <li key={idx} className="flex justify-between items-center border p-3 rounded-md">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
              <a href={r.link} download>
                <Button variant="outline">Download</Button>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ReportCenter;
