// 📁 File: components/Search/CategorySearchScreen.jsx

import React, { useEffect, useState } from "react";
import KeywordSelector from "../ui/KeywordSelector";

const CategorySearchScreen = ({ sector, category }) => {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);

  // טוען מילות חיפוש ברירת מחדל מהשרת או קובץ
  useEffect(() => {
    const fetchDefaultKeywords = async () => {
      try {
        const res = await fetch(`/api/default-query?sector=${sector}&category=${category}`);
        const data = await res.json();
        setKeywords(data.keywords || []);
      } catch (error) {
        console.error("Failed to load default query:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultKeywords();
  }, [sector, category]);

  const handleStartSearch = () => {
    console.log("🔍 Final keywords:", keywords);
    // שלח ל-Backend או אלגוריתם חיפוש
  };

  if (loading) return <div className="p-4 text-gray-500">Loading search parameters...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">{sector} – {category}</h2>

      <KeywordSelector
        initialKeywords={keywords}
        onKeywordsChange={setKeywords}
      />

      <button
        onClick={handleStartSearch}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        🔍 Start Search
      </button>
    </div>
  );
};

export default CategorySearchScreen;
