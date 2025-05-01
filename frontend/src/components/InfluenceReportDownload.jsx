import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const InfluenceReportDownload = () => {
  const [users, setUsers] = useState("");
  const [groups, setGroups] = useState("");
  const [notes, setNotes] = useState("");

  const handleDownload = () => {
    const payload = {
      users: users.split(",").map((u) => u.trim()),
      groups: groups.split(",").map((g) => g.trim()),
      observations: notes.split("\n").map((n) => n.trim())
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "influence_report_data.json";
    a.click();
  };

  return (
    <Card className="p-6 space-y-6">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-bold">📝 Influence Report Builder</h2>

        <div>
          <label className="text-sm font-medium">Influencers (comma separated)</label>
          <Input
            placeholder="e.g., CryptoShark77, AnonDealz"
            value={users}
            onChange={(e) => setUsers(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Groups (comma separated)</label>
          <Input
            placeholder="e.g., PayNova Complaints, Crypto Leaks"
            value={groups}
            onChange={(e) => setGroups(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Trend Observations</label>
          <textarea
            rows="5"
            className="w-full border p-2 rounded"
            placeholder="Write trends or insights..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button onClick={handleDownload}>⬇️ Download JSON</Button>
      </CardContent>
    </Card>
  );
};

export default InfluenceReportDownload;