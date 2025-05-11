
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent } from "@/components/ui/card";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ProductSentimentDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [sentimentTimeline, setSentimentTimeline] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);

  useEffect(() => {
    axios.get("/data/company_analysis/mock_reviews.json").then((res) => setReviews(res.data));
    axios.get("/data/sentiment/daily_sentiment_mock.json").then((res) => setSentimentTimeline(res.data));
    axios.get("/api/ai-insights").then((res) => setAiInsights(res.data));
  }, []);

  const chartData = {
    labels: sentimentTimeline.map((d) => d.date),
    datasets: [
      {
        label: "Positive",
        data: sentimentTimeline.map((d) => d.positive),
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Negative",
        data: sentimentTimeline.map((d) => d.negative),
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Neutral",
        data: sentimentTimeline.map((d) => d.neutral),
        borderColor: "gray",
        backgroundColor: "rgba(128,128,128,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    scales: {
      x: { ticks: { color: "#ccc" } },
      y: { ticks: { color: "#ccc" } },
    },
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="flex justify-end gap-4 mb-4">
        <Card className="bg-gray-900 border border-gray-700">
          <CardContent className="p-2">
            <button
              onClick={() => window.location.href = "/company-profile"}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              ← Back to Company Profile
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-700">
          <CardContent className="p-2">
            <a
              href="/AEGIX_Product_Sentiment_Report.pdf"
              download
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm"
            >
              Export PDF
            </a>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-3xl font-bold mb-6">📢 Product Sentiment Dashboard</h1>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-4">
          {reviews.map((r, i) => {
            const bgColor =
              r.sentiment === "Positive"
                ? "#14532d"
                : r.sentiment === "Negative"
                ? "#7f1d1d"
                : "#1f2937";

            const borderColor =
              r.sentiment === "Positive"
                ? "#22c55e"
                : r.sentiment === "Negative"
                ? "#f87171"
                : "#6b7280";

            const sentimentColor =
              r.sentiment === "Positive"
                ? "#86efac"
                : r.sentiment === "Negative"
                ? "#fca5a5"
                : "#facc15";

            return (
              <Card
                key={i}
                style={{
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">🧾 {r.platform}</span>
                    <span style={{ color: sentimentColor, fontWeight: 600 }}>
                      Sentiment: {r.sentiment}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#00000033",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #4b5563",
                      color: "#ffffff",
                      fontSize: "0.9rem",
                    }}
                  >
                    💬 {r.comment}
                  </div>

                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "0.85rem",
                        color: "#60a5fa",
                        textDecoration: "underline",
                        display: "inline-block",
                        marginTop: "6px"
                      }}
                    >
                      🔗 View original
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="space-y-4">
          <Card className="bg-gray-900 border border-gray-700">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold mb-2">🤖 AI Insights</h2>
              {aiInsights.map((tip, i) => (
                <p key={i} className="text-sm text-gray-300">
                  {tip}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border border-gray-700">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">📈 Sentiment Trends</h2>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductSentimentDashboard;
