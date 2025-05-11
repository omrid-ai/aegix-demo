
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdvantagePieChart = () => {
  const [categoryData, setCategoryData] = useState({});

  const keywordMap = {
    analytics: "Analytics",
    pricing: "Pricing",
    portfolio: "Product Breadth",
    developer: "Developer Focus",
    adoption: "Go-to-Market",
    LATAM: "Regional Expansion",
    edge: "Edge Computing",
    robustness: "Security",
    academic: "Academic",
    licensing: "Enterprise Licensing",
    inference: "Performance",
    platform: "Platform Offering"
  };

  useEffect(() => {
    axios.get("/data/competition/market_competitors.json").then((res) => {
      const counts = {};
      res.data.forEach((item) => {
        const adv = item.advantage?.toLowerCase() || "";
        let matched = false;
        for (const key in keywordMap) {
          if (adv.includes(key.toLowerCase())) {
            const cat = keywordMap[key];
            counts[cat] = (counts[cat] || 0) + 1;
            matched = true;
            break;
          }
        }
        if (!matched) {
          counts["Other"] = (counts["Other"] || 0) + 1;
        }
      });
      setCategoryData(counts);
    });
  }, []);

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Competitive Advantage Categories",
        data: Object.values(categoryData),
        backgroundColor: [
          "#4dc9f6", "#f67019", "#00a950", "#f53794", "#537bc4",
          "#acc236", "#166a8f", "#58595b", "#8549ba", "#e6a8d7", "#d99873", "#c1f1a5"
        ],
        borderColor: "#111",
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-gray-900 rounded p-4 mb-6 text-white">
      <h2 className="text-xl font-semibold mb-2">🥧 Competitive Advantage Breakdown</h2>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default AdvantagePieChart;
