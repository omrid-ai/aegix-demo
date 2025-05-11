
import React, { useState } from "react";

const ArchiveSearch = ({ onFilter }) => {
  const [platform, setPlatform] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ platform, topic });
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-4 mb-4">
      <input
        type="text"
        placeholder="Platform"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="px-2 py-1 rounded text-black"
      />
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="px-2 py-1 rounded text-black"
      />
      <button type="submit" className="bg-blue-600 px-4 py-1 rounded text-white">
        Filter
      </button>
    </form>
  );
};

export default ArchiveSearch;
