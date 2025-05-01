import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/Select";
import { useNavigate } from "react-router-dom";

const allInfluencers = [
  { user: "CryptoShark77", score: 92, region: "Israel", lang: "Hebrew" },
  { user: "MoneyTalks911", score: 85, region: "USA", lang: "English" },
  { user: "AnonDealz", score: 76, region: "Germany", lang: "German" },
  { user: "ShekelKing", score: 74, region: "Israel", lang: "Hebrew" },
  { user: "EuroHacks", score: 69, region: "France", lang: "French" }
];

const alerts = [
  { msg: "CryptoShark77 joined 5 new groups", time: "10 min ago" },
  { msg: "MoneyTalks911 influence spiked", time: "30 min ago" },
  { msg: "AnonDealz added to fraud watchlist", time: "1 hr ago" }
];

const InfluenceOverviewDashboard = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("All");
  const [language, setLanguage] = useState("All");

  const filtered = allInfluencers.filter((u) => {
    return (
      (region === "All" || u.region === region) &&
      (language === "All" || u.lang === language)
    );
  });

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">📡 Influence Overview Dashboard</h1>

      <div className="flex gap-4">
        <div>
          <label className="text-sm">🌍 Filter by Region</label>
          <Select defaultValue="All" onValueChange={setRegion}>
            <SelectTrigger>{region}</SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Israel">Israel</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="France">France</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">🗣️ Filter by Language</label>
          <Select defaultValue="All" onValueChange={setLanguage}>
            <SelectTrigger>{language}</SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Hebrew">Hebrew</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="German">German</SelectItem>
              <SelectItem value="French">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Top Influencers</h2>
          <ul className="space-y-1">
            {filtered.map((inf, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{inf.user} ({inf.region}, {inf.lang})</span>
                <span className="font-bold">{inf.score}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Latest Influence Alerts</h2>
          <ul className="space-y-1">
            {alerts.map((alert, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{alert.msg}</span>
                <span className="text-sm text-muted-foreground">{alert.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={() => navigate("/influence-trends")}>📈 Trends</Button>
        <Button onClick={() => navigate("/influence-alerts")}>🚨 Alerts</Button>
        <Button onClick={() => navigate("/graph")}>🧩 Graph</Button>
      </div>
    </div>
  );
};

export default InfluenceOverviewDashboard;