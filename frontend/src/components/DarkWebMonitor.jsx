import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import DarkWebNetworkGraph from "./DarkWeb/DarkWebNetworkGraph";
import { Link } from "react-router-dom";

const DarkWebMonitor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data/darkweb_monitor_data.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold mb-2">🕵️ Dark Web Monitor</h1>
      <p className="mb-4">This module surfaces intelligence from darknet markets, forums, and leaked databases.</p>

      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-bold">🔎 Search Dark Web</h2>
          <input type="text" placeholder="Enter keyword (e.g., email, system name)..." className="w-full bg-gray-800 border border-gray-600 p-2 mt-2 rounded" />
          <button className="mt-2 bg-blue-700 px-4 py-2 rounded">Search</button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2">🗃️ Leaked Items</h2>
          <table className="w-full text-sm">
            <thead>
              <tr><th>Item</th><th>Source</th><th>Type</th><th>Date</th></tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.source}</td>
                  <td>{item.type}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2">🧭 Market Map</h2>
          <p>[Dark Web Forum & Market Visual Map Placeholder]</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2">🌐 Dark Web Network Graph</h2>
          <DarkWebNetworkGraph />
        </CardContent>
      </Card>

      <div className="pt-4">
        <Link to="/dashboard">
          <button className="bg-blue-700 text-white px-4 py-2 rounded">
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DarkWebMonitor;