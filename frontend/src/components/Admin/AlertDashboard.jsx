// 📁 /frontend/src/components/Admin/AlertDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

const AlertDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("/api/alerts/logs");
        setAlerts(response.data);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🔔 Alert Dashboard</h2>
      {loading ? (
        <p>Loading alerts...</p>
      ) : (
        <Card>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Sector</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{alert.sector}</td>
                    <td>{alert.category}</td>
                    <td>{alert.type}</td>
                    <td>{alert.description}</td>
                    <td>{alert.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AlertDashboard;
