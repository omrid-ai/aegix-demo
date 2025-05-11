import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const CompanyNewsDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [company, setCompany] = useState("BlackRock");
  const [query, setQuery] = useState("BlackRock");
  const [loading, setLoading] = useState(false);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "1d5345c4a40e4930a61bbbd1aa1b9807";

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = `https://newsapi.org/v2/everything?q=${company}&sortBy=publishedAt&language=en&pageSize=30&apiKey=${NEWS_API_KEY}`;
        const res = await axios.get(url);
        setArticles(res.data.articles || []);
      } catch (err) {
        console.error("News API error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (company) fetchNews();
  }, [company]);

  const sentimentData = () => {
    const counts = {};
    articles.forEach((a) => {
      const date = a.publishedAt.split("T")[0];
      counts[date] = (counts[date] || 0) + 1;
    });
    const labels = Object.keys(counts).sort();
    const data = labels.map((d) => counts[d]);
    return {
      labels,
      datasets: [{
        label: "Articles by Date",
        data,
        borderColor: "#4fc3f7",
        backgroundColor: "#81d4fa",
        tension: 0.2,
      }]
    };
  };

  const aiRecommendations = () => {
    if (articles.length < 3) return ["Insufficient data for AI summary."];
    const latest = articles.slice(0, 5);
    return [
      `📌 Spike in media mentions of "${company}" indicates rising visibility.`,
      `🧠 Articles mention themes like ${latest.map(a => a.title.split(" ").slice(0, 3).join(" ")).join(", ")}.`,
      "🔎 Consider monitoring regulatory, ESG, and M&A keywords in future news."
    ];
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">📰 News Coverage: {company}</h1>
        <Link to="/investigation-center" className="text-blue-400 hover:underline">← Back</Link>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search company name..."
          className="px-4 py-2 rounded bg-gray-800 text-white w-72"
        />
        <button onClick={() => setCompany(query)} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
          🔍 Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading news...</p>
      ) : (
        <>
          <div className="bg-gray-900 p-4 rounded mb-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-2">📊 Article Timeline</h2>
            <div className="bg-white rounded p-2">
              <Line data={sentimentData()} />
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded mb-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-pink-400 mb-2">🤖 AI Insights</h2>
            <ul className="list-disc ml-6 text-sm text-gray-200">
              {aiRecommendations().map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            <h2 className="text-lg font-semibold mb-3">🗞️ Latest News on {company}</h2>
            {articles.length === 0 ? (
              <p className="text-gray-400">No news articles found.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {articles.map((a, i) => (
                  <li key={i} className="border-b pb-2">
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {a.title}
                    </a>
                    <p className="text-gray-400">{a.source.name} — {new Date(a.publishedAt).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyNewsDashboard;
