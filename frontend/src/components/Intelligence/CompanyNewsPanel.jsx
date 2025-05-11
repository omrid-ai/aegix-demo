
import React, { useEffect, useState } from "react";
import { fetchCompanyNews } from "@/api/fetchCompanyNews";

const CompanyNewsPanel = ({ companyName }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchCompanyNews(companyName);
        setNews(articles);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };
    if (companyName) loadNews();
  }, [companyName]);

  if (loading) return <p className="text-white p-2">Loading news...</p>;

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700 mt-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">📰 Latest News on {companyName}</h2>
      {news.length === 0 ? (
        <p className="text-gray-300">No recent news found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {news.map((article, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-yellow-400 transition">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-300 hover:underline">
                {article.title}
              </a>
              <p className="text-sm text-gray-400 mt-1">
                {article.source.name} &middot; {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-300 text-sm mt-2">{article.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyNewsPanel;
