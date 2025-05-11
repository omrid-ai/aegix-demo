import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const CompetitiveLandscapeMap = () => {
  const [competitors, setCompetitors] = useState([]);
  const [searchAdvantage, setSearchAdvantage] = useState("");
  const [marketShareFilter, setMarketShareFilter] = useState("all");

  useEffect(() => {
    const fetchCompetitors = async () => {
      const res = await axios.get("/data/company_analysis/mock_competitors.json");
      setCompetitors(res.data);
    };
    fetchCompetitors();
  }, []);

  const filtered = competitors.filter(c => {
    const advantageMatch = c.advantage.toLowerCase().includes(searchAdvantage.toLowerCase());
    const shareMatch =
      marketShareFilter === "all" ||
      (marketShareFilter === ">20" && c.market_share > 20) ||
      (marketShareFilter === "<20" && c.market_share <= 20);
    return advantageMatch && shareMatch;
  });

  if (!competitors.length) return <p className="p-6">Loading competitors...</p>;

  return (
    <div className="p-6 space-y-6 text-white bg-black min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Competitive Landscape Map</h1>
        <Button onClick={() => window.print()}>🖨️ Export Competitor Report</Button>
      </div>

      <div className="flex gap-4 items-center pt-4">
        <label>Market share:</label>
        <Select onValueChange={setMarketShareFilter} defaultValue="all">
          <option value="all">All</option>
          <option value=">20">Above 20%</option>
          <option value="<20">20% or less</option>
        </Select>

        <Input
          placeholder="Search advantage"
          value={searchAdvantage}
          onChange={(e) => setSearchAdvantage(e.target.value)}
          className="w-64"
        />
      </div>

      {filtered.map((comp, index) => (
        <Card key={index} className="bg-gray-900 border border-gray-700">
          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg font-semibold">{comp.name}</h2>
            <p className="text-gray-300">Market Share: {comp.market_share}%</p>
            <p className="text-gray-400">Advantage: {comp.advantage}</p>
          </CardContent>
        </Card>
      ))}

      <Button variant="default" className="mt-6" onClick={() => window.history.back()}>
        חזור לפרופיל החברה
      </Button>
    </div>
  );
};

export default CompetitiveLandscapeMap;