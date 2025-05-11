import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const EmployeeNarrativeMonitor = () => {
  const [narratives, setNarratives] = useState([]);

  useEffect(() => {
    fetch("/data/mock_narratives.json")
      .then((res) => res.json())
      .then((data) => setNarratives(data || []));
  }, []);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">📢 Narrative Monitor by Employee</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {narratives.map((item, index) => (
          <Card key={index} className="bg-gray-900 border border-gray-700">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{item.employee}</h2>
              <p className="text-sm text-gray-400">Sentiment: <span className={
                item.sentiment === "Negative" ? "text-red-400" :
                item.sentiment === "Neutral" ? "text-yellow-300" : "text-green-400"
              }>{item.sentiment}</span></p>
              <p className="text-sm italic">Topic: {item.topic}</p>
              <p className="text-xs text-gray-300">"{item.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeNarrativeMonitor;
