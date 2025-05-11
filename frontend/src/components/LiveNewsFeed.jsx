import React, { useEffect } from "react";
import { useNews } from "@/context/NewsContext";
import axios from "axios";

const fallbackImage = "/images/default-news.jpg";

const LiveNewsFeed = () => {
  const { articles, addArticles } = useNews();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/news?q=cyber");
        if (res.data && res.data.length) {
          addArticles(res.data);
        } else {
          const mock = await fetch("/data/news_mock.json").then(r => r.json());
          addArticles(mock);
        }
      } catch (err) {
        console.error("❌ Error fetching news:", err);
        const mock = await fetch("/data/news_mock.json").then(r => r.json());
        addArticles(mock);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-[#132a3b] text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">📰 Live Cyber News</h2>
      <div className="space-y-6">
        {articles.map((article, idx) => (
          <div key={idx} className="flex items-start gap-4 border-b border-gray-600 pb-4">
            <img
              src={article.urlToImage || fallbackImage}
              onError={(e) => e.currentTarget.src = fallbackImage}
              alt={article.title}
              className="w-[100px] h-[100px] object-cover rounded-md shadow"
            />
            <div>
              <h3 className="text-lg font-bold">{article.title}</h3>
              <p className="text-sm text-gray-300 line-clamp-2">{article.description || "No description."}</p>
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm mt-1 inline-block"
                >
                  🔗 Read More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveNewsFeed;
