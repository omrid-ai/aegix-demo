
import MainLayout from "./MainLayout";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const FinanceDashboard = () => {
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    fetch("/data/finance_data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);

        setTimeout(() => {
          const ctx = document.getElementById("anomalyChart");
          if (ctx) {
            const newChart = new Chart(ctx, {
              type: "line",
              data: {
                labels: json.anomalyTrend.map((d) => d.date),
                datasets: [
                  {
                    label: "Anomalies",
                    data: json.anomalyTrend.map((d) => d.count),
                    borderColor: "rgb(255, 206, 86)",
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    tension: 0.4,
                    fill: true
                  }
                ]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { labels: { color: "white" } },
                  title: {
                    display: true,
                    text: "Financial Anomaly Trend",
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
      <h1 className="text-3xl font-bold mb-6">💸 Finance Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-800 p-4 rounded shadow text-white">
          <h3 className="font-semibold">Total Alerts</h3>
          <p className="text-2xl">{data.summary.totalAlerts}</p>
        </div>
        <div className="bg-red-800 p-4 rounded shadow text-white">
          <h3 className="font-semibold">Anomaly Amount (USD)</h3>
          <p className="text-2xl">${data.summary.anomalyAmountUSD.toLocaleString()}</p>
        </div>
        <div className="bg-purple-800 p-4 rounded shadow text-white">
          <h3 className="font-semibold">Flagged Groups</h3>
          <p className="text-2xl">{data.summary.flaggedGroups}</p>
        </div>
      </div>

      <canvas id="anomalyChart" className="bg-white rounded-lg h-64 mb-8"></canvas>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">Suspicious Entities</h2>
        <table className="table-auto w-full text-left text-white">
          <thead>
            <tr>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">Platform</th>
              <th className="border-b p-2">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {data.suspiciousEntities.map((entity, idx) => (
              <tr key={idx}>
                <td className="border-b p-2">{entity.name}</td>
                <td className="border-b p-2">{entity.platform}</td>
                <td className="border-b p-2">{entity.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default FinanceDashboard;
