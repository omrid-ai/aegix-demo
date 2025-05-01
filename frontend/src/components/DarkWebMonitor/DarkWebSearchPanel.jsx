import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DarkWebSearchPanel = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert("Searching dark web for: " + query);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">🔍 Search Dark Web</h3>
      <div className="flex gap-2 mt-2">
        <Input
          placeholder="Enter keyword (e.g., email, system name)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default DarkWebSearchPanel;
