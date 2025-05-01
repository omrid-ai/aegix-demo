
import { useState, useEffect } from "react";

const sampleEvents = [
  { type: "Market", description: "New market detected: Atlas Dark Market" },
  { type: "Leak", description: "Data breach found: XYZ Database Dump" },
  { type: "Alert", description: "Spike in credentials leak detected" },
  { type: "Market", description: "New market detected: Nova Hidden Services" },
  { type: "Leak", description: "Credit card dump exposed from MegaStore" }
];

const getIcon = (type) => {
  switch (type) {
    case "Market":
      return "🛒";
    case "Leak":
      return "📄";
    case "Alert":
      return "⚠️";
    default:
      return "❔";
  }
};

const LiveFeedPanel = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      const timestamp = new Date().toLocaleTimeString();
      setEvents(prev => [{ timestamp, ...randomEvent }, ...prev.slice(0, 9)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white mt-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛰️ Live Threat Feed</h2>
      <div className="space-y-2 h-64 overflow-y-auto">
        {events.length === 0 ? (
          <p className="text-gray-400">Waiting for events...</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="flex items-center space-x-4 bg-gray-700 p-2 rounded">
              <div className="text-2xl">{getIcon(event.type)}</div>
              <div>
                <p className="font-semibold">{event.type}</p>
                <p className="text-sm text-gray-300">{event.description}</p>
                <p className="text-xs text-gray-400">{event.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveFeedPanel;
