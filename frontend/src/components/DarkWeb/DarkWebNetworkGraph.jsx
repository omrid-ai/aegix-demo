import React, { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";

const DarkWebNetworkGraph = () => {
  const networkRef = useRef(null);

  useEffect(() => {
    fetch("/data/darkweb_network_data.json")
      .then((res) => res.json())
      .then((data) => {
        const nodes = new DataSet(data.nodes);
        const edges = new DataSet(data.edges);

        const container = networkRef.current;
        const options = {
          nodes: {
            shape: "dot",
            size: 12,
            font: { color: "#ffffff" },
            color: {
              border: "#ffffff",
              background: "#0ea5e9",
            },
          },
          edges: {
            color: "#999999",
          },
          layout: {
            improvedLayout: true,
          },
          physics: {
            stabilization: true,
          },
        };

        new Network(container, { nodes, edges }, options);
      })
      .catch((err) => console.error("Failed to load graph data:", err));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-white">🌐 Dark Web Network Graph</h2>
      <div
        ref={networkRef}
        style={{ height: "500px", backgroundColor: "#111", borderRadius: "12px" }}
      />
    </div>
  );
};

export default DarkWebNetworkGraph;