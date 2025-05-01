import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import * as d3 from "d3";

const SearchResultsScreen = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(location.state?.query || {});

  useEffect(() => {
    fetch("/data/search_results_mock.json")
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Failed to load search results", err));
  }, []);

  useEffect(() => {
    const svg = d3.select("#network-graph");
    svg.selectAll("*").remove();
    svg.attr("width", 800).attr("height", 400);

    const nodes = results.map((r, i) => ({ id: r.title || "Node " + (i + 1), group: i % 5 }));
    const links = results.slice(1).map((r, i) => ({
      source: r.title || "Node " + (i + 1),
      target: results[i].title || "Node " + i,
    }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(400, 200));

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", "#0ea5e9")
      .call(drag(simulation));

    const labels = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", 10)
      .attr("fill", "#fff")
      .attr("dx", 12)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node
        .attr("cx", d => d.x).attr("cy", d => d.y);
      labels
        .attr("x", d => d.x).attr("y", d => d.y);
    });

    function drag(sim) {
      return d3.drag()
        .on("start", (event, d) => {
          if (!event.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  }, [results]);

  return (
    <div className="p-6 bg-black text-white min-h-screen space-y-8">
      <h1 className="text-3xl font-bold">📊 Search Results</h1>

      <Card>
        <CardContent className="text-sm text-gray-300 space-y-1">
          <p><strong>Sector:</strong> {query.sector || "—"}</p>
          <p><strong>Category:</strong> {query.category || "—"}</p>
          <p><strong>Countries:</strong> {query.countries?.join(", ") || "—"}</p>
          <p><strong>Sources:</strong> {query.sources?.join(", ") || "—"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">🔗 Network Graph</h2>
          <svg id="network-graph"></svg>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(results) && results.map((item, index) => (
          <Card key={index}>
            <CardContent className="space-y-1">
              <h3 className="text-lg font-semibold text-cyan-400">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.snippet}</p>
              <p className="text-xs text-gray-500">Source: {item.source} | Date: {item.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsScreen;