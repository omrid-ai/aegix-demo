import React from "react";

const Search = () => {
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">🔍 Search Panel</h1>
      <p className="text-gray-300">
        This screen is for executing smart OSINT queries based on category and sector.
      </p>
      <div className="mt-6 border border-gray-700 rounded-lg p-4 bg-gray-900">
        <p className="text-gray-400">Coming soon: advanced keyword filters, AI search suggestions, and export options.</p>
      </div>
    </div>
  );
};

export default Search;
