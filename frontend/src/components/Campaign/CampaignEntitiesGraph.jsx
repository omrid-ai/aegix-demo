import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CampaignEntitiesGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    fetch("/data/campaign_entities_graph.json")
      .then((res) => res.json())
      .then((data) => renderGraph(data));
  }, []);

  const renderGraph = (graph) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const width = 600;
    const height = 400;

    svg.attr("viewBox", [0, 0, width, height]);

    const simulation = d3.forceSimulation(graph.nodes)
      .force("link", d3.forceLink(graph.links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(graph.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(graph.nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", d => d3.schemeCategory10[d.group % 10])
      .call(drag(simulation));

    const label = svg.append("g")
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", "12px")
      .attr("fill", "#fff")
      .attr("dx", 12)
      .attr("dy", ".35em");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
  };

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

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
  🕸 Campaign Entities Graph
</h2>
<p className="text-sm text-gray-400 mb-4">
  This graph visualizes connections between fake entities, bots, and foreign propaganda actors involved in the campaign. 
  Each node represents an entity; links indicate detected influence relationships or coordination patterns.
</p>
      <svg ref={svgRef} width="100%" height="400"></svg>
    </div>
  );
};

export default CampaignEntitiesGraph;