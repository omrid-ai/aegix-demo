import { useEffect, useState } from "react";

const DisinfoMonitorPanel = () => {
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    fetch("/data/demo_data_oct7.json")
      .then((response) => response.json())
      .then((data) => setCampaignData(data))
      .catch((error) => console.error("Error fetching demo data:", error));
  }, []);

  if (!campaignData) {
    return <div className="p-6">Loading campaign data...</div>;
  }

  return (
    <div className="p-6 space-y-4 text-white">
      <h2 className="text-2xl font-bold mb-4">{campaignData.campaign_name}</h2>

      {/* תמונה ממוזערת עם קישור לפרטים */}
      {campaignData.images.map((image) => (
        <div key={image.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
          <img
            src={image.thumbnail}
            alt={image.title}
            className="w-64 h-auto rounded mb-2"
          />
          <h3 className="text-lg font-semibold">{image.title}</h3>
          <p className="text-gray-400">Misused Context: {image.misused_context}</p>
          <p className="text-gray-400">Spread Platforms: {image.platforms.join(", ")}</p>
          <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Full Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisinfoMonitorPanel;
