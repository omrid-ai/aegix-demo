
import MainLayout from "./MainLayout";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const CrisisDashboard = () => {
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    fetch("/data/crisis_data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);

        setTimeout(() => {
          const ctx = document.getElementById("crisisTrendChart");
          if (ctx) {
            const newChart = new Chart(ctx, {
              type: "line",
              data: {
                labels: json.timeline.map((d) => d.date),
                datasets: [{
                  label: "Daily Incidents",
                  data: json.timeline.map((d) => d.count),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  fill: true,
                  tension: 0.3
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { labels: { color: "white" } },
                  title: {
                    display: true,
                    text: "Incident Timeline",
                    color: "white"
                  }
                },
                scales: {
                  x: { ticks: { color: "white" } },
                  y: { ticks: { color: "white" } }
                }
              }
            });
            setChart(newChart);
          }
        }, 200);
      });

    return () => {
      if (chart) chart.destroy();
    };
  }, []);

  if (!data) return <MainLayout><p className="text-white p-6">Loading...</p></MainLayout>;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">🚨 Crisis Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-800 p-4 rounded shadow text-white">
          <h3 className="font-semibold">Total Incidents</h3>
          <p className="text-2xl">{data.summary.totalIncidents}</p>
        </div>
        <div className="bg-yellow-700 p-4 rounded shadow text-white">
          <h3 className="font-semibold">High Severity</h3>
          <p className="text-2xl">{data.summary.highSeverity}</p>
        </div>
        <div className="bg-blue-800 p-4 rounded shadow text-white">
          <h3 className="font-semibold">Regions Affected</h3>
          <p className="text-2xl">{data.summary.regionsAffected}</p>
        </div>
      </div>

      <canvas id="crisisTrendChart" className="bg-white rounded-lg h-64 mb-8"></canvas>

      <h2 className="text-xl font-bold text-white mb-2">Live Alerts</h2>
      <table className="table-auto w-full text-left text-white">
        <thead>
          <tr>
            <th className="border-b p-2">Type</th>
            <th className="border-b p-2">Description</th>
            <th className="border-b p-2">Severity</th>
            <th className="border-b p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.alerts.map((alert, index) => (
            <tr key={index}>
              <td className="border-b p-2">{alert.type}</td>
              <td className="border-b p-2">{alert.description}</td>
              <td className="border-b p-2">{alert.severity}</td>
              <td className="border-b p-2">{alert.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default CrisisDashboard;
