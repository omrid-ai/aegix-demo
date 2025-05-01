import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import * as d3 from "d3";
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DisinfoTrendTimeline from "./Disinfo/DisinfoTrendTimeline";

const DisinfoMonitor = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [geoData, setGeoData] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/data/disinfo_data.json")
      .then((res) => res.json())
      .then((data) => {
        setGraphData({ nodes: data.nodes, links: data.links });
        setMessages(data.messages || []);
      })
      .catch((err) => console.error("Failed to load disinfo data:", err));

    fetch("/data/disinfo_geo_spread.json")
      .then((res) => res.json())
      .then(setGeoData)
      .catch((err) => console.error("Failed to load geo data:", err));
  }, []);

  useEffect(() => {
    const svg = d3.select("#disinfo-network")
      .attr("width", 800)
      .attr("height", 400);
    svg.selectAll("*").remove();

    const { nodes, links } = graphData;
    if (!nodes.length || !links.length) return;

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(400, 200));

    const link = svg.append("g")
      .attr("stroke", "#555")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    const colorScale = d3.scaleOrdinal()
      .domain(["source", "narrative", "campaign"])
      .range(["#38bdf8", "#fb923c", "#ef4444"]);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", (d) => colorScale(d.type))
      .call(drag(simulation));

    node.append("title").text((d) => d.id);

    const labels = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.id)
      .attr("font-size", 10)
      .attr("fill", "#fff")
      .attr("dx", 12)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
      labels
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);
    });

    function drag(simulation) {
      return d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  }, [graphData]);

  return (
    <div className="p-6 bg-black text-white space-y-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🧠 Disinformation Monitor</h1>
      <p className="mb-4">
        This dashboard visualizes active disinformation campaigns, showing the spread across geographic regions and key online actors involved.
        The network graph below maps influential accounts and connections, while the heatmap shows real-time intensity of disinformation mentions.
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-2">🌐 Influence Network</h2>
        <Card><CardContent><svg id="disinfo-network"></svg></CardContent></Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📈 Disinfo Trends</h2>
        <DisinfoTrendTimeline />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🌍 Geographic Spread</h2>
        <Card>
          <CardContent className="p-0">
            <MapContainer center={[30, 20]} zoom={2} style={{ height: "400px" }} className="z-0">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {geoData.map((point, i) => (
                <CircleMarker
                  key={i}
                  center={[point.lat, point.lng]}
                  radius={Math.log(point.intensity) * 2}
                  color="#dc2626"
                  fillOpacity={0.6}
                >
                  <LeafletTooltip>{point.label}: {point.intensity}</LeafletTooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📄 Sample Disinformation Messages</h2>
        <Card>
          <CardContent className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className="border-b border-gray-700 pb-2">
                <p><strong>Source:</strong> {m.source}</p>
                <p><strong>Content:</strong> {m.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DisinfoMonitor;