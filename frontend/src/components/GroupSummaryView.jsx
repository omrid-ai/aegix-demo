import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const summary = {
  groupName: "CryptoLeakWatch 🇮🇱",
  totalUsers: 348,
  dailyActivity: 127,
  highRiskUsers: ["CryptoShark77", "DarkNode007", "HiddenExchange"],
  riskLevel: "HIGH",
  keywords: ["money laundering", "crypto fraud", "cash deals", "black market"],
  links: [
    "https://t.me/CryptoLeakWatch",
    "https://cryptofraudreports.io/group/CryptoLeakWatch",
  ],
};

const GroupSummaryView = () => {
  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">{summary.groupName}</h2>
        <p className="text-sm text-muted-foreground">
          Active Users: {summary.dailyActivity} | Total Members: {summary.totalUsers}
        </p>

        <div className="space-y-2">
          <div>
            <span className="font-medium">Risk Level:</span>{" "}
            <span className="px-2 py-1 rounded text-white bg-red-600">{summary.riskLevel}</span>
          </div>

          <div>
            <h4 className="font-semibold mt-4">⚠️ High Risk Users</h4>
            <ul className="list-disc list-inside text-gray-700">
              {summary.highRiskUsers.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mt-4">🔑 Keywords Identified</h4>
            <div className="flex flex-wrap gap-2">
              {summary.keywords.map((kw, i) => (
                <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mt-4">🔗 External Links</h4>
            <ul className="list-disc list-inside text-blue-600 underline">
              {summary.links.map((link, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupSummaryView;
