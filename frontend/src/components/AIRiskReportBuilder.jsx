import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const AIRiskReportBuilder = () => {
  const [type, setType] = useState("user");
  const [entity, setEntity] = useState("");
  const [report, setReport] = useState(null);

  const mockAnalysis = {
    score: 83,
    level: "HIGH",
    reasons: [
      "Increased mentions in fraud groups",
      "Part of 3 suspicious channels",
      "Spike in activity in the past 24 hours",
    ],
  };

  const handleAnalyze = () => {
    setReport(mockAnalysis);
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-bold">🧠 AI Risk Report Builder</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Entity Type</label>
            <Select defaultValue="user" onValueChange={setType}>
              <SelectTrigger>{type}</SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="group">Group</SelectItem>
                <SelectItem value="keyword">Keyword</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Name / ID</label>
            <Input
              placeholder="e.g., CryptoShark77"
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleAnalyze}>Analyze Risk</Button>

        {report && (
          <div className="mt-6 space-y-2 border rounded p-4 bg-white">
            <p>
              <strong>Risk Score:</strong>{" "}
              <span className="text-red-600 font-bold text-lg">{report.score}</span> ({report.level})
            </p>
            <ul className="list-disc list-inside text-gray-700">
              {report.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRiskReportBuilder;
