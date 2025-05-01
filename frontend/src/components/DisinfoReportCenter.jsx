import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import logo from "@/assets/aegix-logo.png"; // ודא שיש קובץ כזה בתיקייה

const disinfoFindings = [
  {
    keyword: "deep state",
    groups: ["Truth Revolution", "Global Awakening"],
    mentions: 82,
    trend: "Increasing",
    risk: "High",
  },
  {
    keyword: "fake vaccine",
    groups: ["Freedom Now", "Real Health News"],
    mentions: 60,
    trend: "Stable",
    risk: "Medium",
  },
  {
    keyword: "global banking control",
    groups: ["Money Truth Channel"],
    mentions: 45,
    trend: "Peaking",
    risk: "High",
  },
];

const DisinfoReportCenter = () => {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // לוגו בראש
    doc.addImage(logo, "PNG", 10, 10, 30, 12);
    doc.setFontSize(16);
    doc.text("Disinfo Intelligence Report", 50, 20);

    doc.setFontSize(10);
    const headers = ["Keyword", "Groups", "Mentions", "Trend", "Risk"];
    let startY = 40;

    doc.autoTable({
      head: [headers],
      body: disinfoFindings.map(row => [
        row.keyword,
        row.groups.join(" / "),
        row.mentions,
        row.trend,
        row.risk,
      ]),
      startY,
      theme: "grid",
      headStyles: { fillColor: [100, 100, 100] },
    });

    doc.save("disinfo_report.pdf");
  };

  return (
    <Card className="p-6">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">📄 Disinfo Intelligence Report</h2>
          <div className="space-x-3">
            <Button onClick={handleExportPDF}>Export as PDF</Button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm border mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Keyword</th>
                <th className="text-left p-2 border">Groups Mentioned</th>
                <th className="text-left p-2 border">Mentions</th>
                <th className="text-left p-2 border">Trend</th>
                <th className="text-left p-2 border">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {disinfoFindings.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2 border">{row.keyword}</td>
                  <td className="p-2 border">{row.groups.join(", ")}</td>
                  <td className="p-2 border">{row.mentions}</td>
                  <td className="p-2 border">{row.trend}</td>
                  <td className="p-2 border font-semibold">{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisinfoReportCenter;
