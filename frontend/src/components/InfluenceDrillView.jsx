import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const InfluenceDrillView = () => {
  const [data, setData] = useState(null);
  const [worldGeoJson, setWorldGeoJson] = useState(null);
  const [selectedKeyword, setSelectedKeyword] = useState("deep state");

  useEffect(() => {
    fetch("/data/influence_drill_data.json")
      .then((res) => res.json())
      .then((json) => setData(json));

    fetch("/data/world.geo.json")
      .then((res) => res.json())
      .then((geo) => setWorldGeoJson(geo));
  }, [selectedKeyword]);

  if (!data || !worldGeoJson) return <div>Loading...</div>;

  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: `Mentions of "${data.keyword}"`,
        data: data.daily_trend,
        fill: false,
        borderColor: "#f97316",
        tension: 0.3,
      },
    ],
  };

  const getCountryColor = (country) => {
    const countryData = data.heatmap_data.find((c) => c.country === country);
    if (!countryData) return { fillColor: "#f3f4f6" };
    const intensity = Math.min(1, countryData.count / 120);
    const color = `rgba(239,68,68,${intensity})`;
    return { fillColor: color };
  };

  const onEachCountry = (feature, layer) => {
    const countryName = feature.properties.name;
    const { fillColor } = getCountryColor(countryName);
    layer.setStyle({ fillColor, weight: 1, color: "#999", fillOpacity: 0.6 });
    layer.bindTooltip(`${countryName}`, { sticky: true });
  };

  return (
    <Card className="p-6">
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-bold">🌐 Influence Drill View</h2>

        <div className="flex gap-4">
          <label className="text-sm pt-2">Select Keyword:</label>
          <Select defaultValue={selectedKeyword} onValueChange={setSelectedKeyword}>
            <SelectTrigger>{selectedKeyword}</SelectTrigger>
            <SelectContent>
              <SelectItem value="deep state">deep state</SelectItem>
              <SelectItem value="fake vaccine">fake vaccine</SelectItem>
              <SelectItem value="global banking control">global banking control</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Line data={chartData} />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">🌍 Geolocation Heatmap</h3>
          <MapContainer center={[20, 0]} zoom={2} style={{ height: "300px" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <GeoJSON data={worldGeoJson} onEachFeature={onEachCountry} />
          </MapContainer>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Top Influencers</h3>
          <ul className="list-disc pl-6">
            {data.top_influencers.map((influencer, i) => (
              <li key={i} className="mb-2">
                <strong>{influencer.username}</strong> – Mentions: {influencer.mentions}, Groups: {influencer.groups.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluenceDrillView;
