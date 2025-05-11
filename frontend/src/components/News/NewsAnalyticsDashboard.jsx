import React, { useEffect, useState } from "react";
import { fetchLiveNews } from "@/utils/fetchLiveNews";
import topicsBySector from "@/utils/topicsBySector";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import moment from "moment";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const stopwords = new Set([
  "the", "and", "for", "are", "with", "from", "that", "this", "have", "has",
  "was", "will", "its", "but", "not", "you", "your", "who", "all", "his", "her",
  "their", "they", "them", "our", "out", "about", "just", "like", "more", "news",
  "report", "new", "one", "two", "say", "says", "after", "before", "over", "under",
]);

const extractTopKeywords = (articles) => {
  const freq = {};
  articles.forEach((article) => {
    const content = (article.title + " " + article.description)?.toLowerCase();
    const words = content.match(/\b\w{4,}\b/g) || [];
    words.forEach((word) => {
      if (!stopwords.has(word)) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });
  });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
  return {
    labels: sorted.map(([word]) => word),
    counts: sorted.map(([_, count]) => count),
    topKeyword: sorted.length > 0 ? sorted[0][0] : "N/A",
  };
};

const countSources = (articles) => {
  const counts = {};
  articles.forEach((a) => {
    const src = a.source?.name || "Unknown";
    counts[src] = (counts[src] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
};

const NewsAnalyticsDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sector, setSector] = useState("Cyber Threats");
  const [sentiment, setSentiment] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const keywords = topicsBySector[sector] || [];
      const allResults = await Promise.all(keywords.map(fetchLiveNews));
      let merged = allResults.flat().filter(Boolean);

      if (fromDate) {
        merged = merged.filter((a) =>
          a.publishedAt && moment(a.publishedAt).isSameOrAfter(moment(fromDate))
        );
      }
      if (toDate) {
        merged = merged.filter((a) =>
          a.publishedAt && moment(a.publishedAt).isSameOrBefore(moment(toDate))
        );
      }
      if (sentiment !== "all") {
        merged = merged.filter((a) =>
          a.sentiment?.toLowerCase() === sentiment.toLowerCase()
        );
      }

      setArticles(merged);
      setLoading(false);
    };
    fetchData();
  }, [sector, fromDate, toDate, sentiment]);

  const { labels, counts, topKeyword } = extractTopKeywords(articles);
  const sources = countSources(articles);

  const kpiData = {
    totalArticles: articles.length,
    uniqueSources: sources.length,
    topKeyword,
  };

  return (
    <div className="p-6 bg-[#0b1f2a] text-white min-h-screen space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Newspaper className="w-6 h-6" /> News Analytics Dashboard
      </h1>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-sm">Choose Sector:</label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="bg-[#132a3b] text-white px-3 py-1 rounded ml-2"
          >
            {Object.keys(topicsBySector).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-[#132a3b] text-white px-2 py-1 rounded ml-2"
          />
        </div>

        <div>
          <label className="text-sm">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-[#132a3b] text-white px-2 py-1 rounded ml-2"
          />
        </div>

        <div>
          <label className="text-sm">Sentiment:</label>
          <select
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
            className="bg-[#132a3b] text-white px-3 py-1 rounded ml-2"
          >
            <option value="all">All</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>⏳ Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Total Articles", "Unique Sources", "Top Keyword"].map((label, i) => (
              <Card key={i} className="bg-[#132a3b]">
                <CardContent className="p-4">
                  <h3 className="text-sm text-gray-400">{label}</h3>
                  <p className="text-xl font-semibold">
                    {label === "Total Articles"
                      ? kpiData.totalArticles
                      : label === "Unique Sources"
                      ? kpiData.uniqueSources
                      : kpiData.topKeyword}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-[#132a3b]">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">🔑 Top Keywords</h2>
              <div className="h-[250px]">
                <Bar
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "Frequency",
                        data: counts,
                        backgroundColor: "#4dd0e1",
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#132a3b]">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">📊 Source Distribution</h2>
              <div className="h-[250px]">
                <Bar
                  data={{
                    labels: sources.map(([src]) => src),
                    datasets: [
                      {
                        label: "Articles per Source",
                        data: sources.map(([_, count]) => count),
                        backgroundColor: "#81c784",
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#132a3b]">
            <CardContent className="p-4 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-2">📰 News Articles</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-600">
                    <th>Source</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td>{a.source?.name || "-"}</td>
                      <td>{a.author || "-"}</td>
                      <td>{a.publishedAt ? moment(a.publishedAt).format("YYYY-MM-DD") : "-"}</td>
                      <td>{a.title}</td>
                      <td>
                        {a.url ? (
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                          >
                            View
                          </a>
                        ) : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default NewsAnalyticsDashboard;
