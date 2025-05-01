import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const SmartSearch = () => {
  const [searchConfig, setSearchConfig] = useState({});
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/search_config.json")
      .then((res) => res.json())
      .then(setSearchConfig)
      .catch((err) => console.error("Failed to load search_config.json", err));
  }, []); 

  const handleSearch = () => {
    const query = {
      sector: selectedSector,
      category: selectedCategory,
      countries: selectedCountries,
      sources: selectedSources,
    };
    navigate("/search-results", { state: { query } });
  };

  const currentSubcategory = searchConfig[selectedSector]?.subcategories?.find(
    (s) => s.name === selectedCategory
  );

  return (
    <div className="p-6 text-white bg-black min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">🔍 Search Intelligence</h1>

      <Card>
        <CardContent className="space-y-4 p-6">
          {/* Sector */}
          <div>
            <label className="block text-sm mb-1">📁 Select Sector</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value);
                setSelectedCategory("");
                setSelectedCountries([]);
                setSelectedSources([]);
              }}
            >
              <option value="">-- Select --</option>
              {Object.keys(searchConfig).map((sector) => (
                <option key={sector}>{sector}</option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          {selectedSector && (
            <div>
              <label className="block text-sm mb-1">📌 Subcategory</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Select --</option>
                {searchConfig[selectedSector]?.subcategories?.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Keyword Display */}
          {currentSubcategory?.keywords?.length > 0 && (
            <div className="bg-gray-800 border border-gray-700 p-4 rounded space-y-1">
              <p className="text-sm font-semibold text-cyan-400">🔑 Suggested Keywords</p>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {currentSubcategory.keywords.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Filters */}
          {selectedCategory && (
            <>
              <div>
                <label className="block text-sm mb-1">🌍 Countries</label>
                <select
                  multiple
                  className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
                  onChange={(e) =>
                    setSelectedCountries(
                      Array.from(e.target.selectedOptions).map((o) => o.value)
                    )
                  }
                >
                  {(searchConfig[selectedSector]?.countries || []).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">🛰 Source Types</label>
                <select
                  multiple
                  className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
                  onChange={(e) =>
                    setSelectedSources(
                      Array.from(e.target.selectedOptions).map((o) => o.value)
                    )
                  }
                >
                  {(searchConfig[selectedSector]?.sources || []).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded text-white"
            onClick={handleSearch}
          >
            🚀 Search
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartSearch;
