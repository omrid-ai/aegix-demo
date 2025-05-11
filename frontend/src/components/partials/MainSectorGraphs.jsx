import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import CrisisMap from "./CrisisMap";

const MainSectorGraphs = () => {
  const [chartData, setChartData] = useState(null);
  const [narratives, setNarratives] = useState([]);
  const [aiTips, setAiTips] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("/data/risks_trend.json")
      .then(res => res.json())
      .then(data => setChartData({
        labels: data.labels,
        datasets: data.datasets.map(ds => ({
          ...ds,
          borderWidth: 2,
          fill: false
        }))
      }));

    fetch("/data/narrative_stats.json")
      .then(res => res.json())
      .then(data => setNarratives(data.narratives || []));

    fetch("/data/ai_recommendations.json")
      .then(res => res.json())
      .then(data => setAiTips(data.recommendations || []));

    fetch("/data/hostile_campaigns.json")
      .then(res => res.json())
      .then(data => setCampaigns(data.campaigns || []));
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } }
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Trends */}
      <Card>
        <CardContent>
          <h3 className="text-xl font-bold mb-2">📉 Risk Trends</h3>
          {chartData && <Line data={chartData} options={chartOptions} />}
        </CardContent>
      </Card>

      {/* Narrative Trends */}
      <Card>
        <CardContent>
          <h3 className="text-xl font-bold mb-2">💭 Narrative Trends</h3>
          <ul className="list-disc pl-4">
            {narratives.map((n, i) => (
              <li key={i}>
                {n.type} – Mentions: {n.mentions}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 🧠 AI Recommendations */}
      <Card>
        <CardContent>
          <h3 className="text-xl font-bold mb-2">🧠 AI Recommendations</h3>
          <ul className="list-disc pl-4">
            {aiTips.map((tip, i) => (
              <li key={i}>
                <strong>{tip.title}</strong>: {tip.message}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 🚨 Hostile Campaigns */}
      <Card>
        <CardContent>
          <h3 className="text-xl font-bold mb-2">🚨 Hostile Campaigns</h3>
          <ul className="list-disc pl-4">
            {campaigns.map((c, i) => (
              <li key={i}>
                <strong>{c.name}</strong> – Target: {c.target} – Channel: {c.channel}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Crisis Map */}
      <Card>
        <CardContent>
          <h3 className="text-xl font-bold mb-2">🗺️ Crisis Map</h3>
          <CrisisMap />
        </CardContent>
      </Card>
    </div>
  );
};

export default MainSectorGraphs;
