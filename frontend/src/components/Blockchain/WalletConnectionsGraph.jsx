
import React from "react";
import { Graph } from "react-d3-graph";

const WalletConnectionsGraph = ({ transactions }) => {
  // Build nodes and links
  const nodes = {};
  const links = [];

  transactions.forEach(tx => {
    const from = tx.from.toLowerCase();
    const to = tx.to?.toLowerCase();
    if (!from || !to || from === "" || to === "") return;

    nodes[from] = { id: from };
    nodes[to] = { id: to };

    links.push({ source: from, target: to, label: `${(parseFloat(tx.value)/1e18).toFixed(3)} ETH` });
  });

  const data = {
    nodes: Object.values(nodes),
    links
  };

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightblue",
      size: 400,
      highlightStrokeColor: "blue",
      labelProperty: "id"
    },
    link: {
      highlightColor: "lightgray",
      renderLabel: true,
      fontSize: 10
    },
    height: 500,
    width: 900,
    directed: true,
    automaticRearrangeAfterDropNode: true
  };

  return (
    <div className="bg-white p-4 rounded shadow my-6">
      <h2 className="text-xl font-bold mb-4 text-black">Connections Graph</h2>
      <Graph
        id="wallet-connections"
        data={data}
        config={config}
      />
    </div>
  );
};

export default WalletConnectionsGraph;
