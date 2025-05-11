
import MainLayout from "./MainLayout";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const NarrativeDashboard = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = document.getElementById("narrativeTrendChart");
    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Oct 7", "Oct 8", "Oct 9", "Oct 10", "Oct 11"],
        datasets: [
          {
            label: "Mentions of 'Genocide'",
            data: [20, 90, 130, 80, 40],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: "Narrative Trend – Genocide Keyword",
            color: "white",
            font: { size: 18 },
          },
        },
        scales: {
          x: { ticks: { color: "white" } },
          y: { ticks: { color: "white" } },
        },
      },
    });
    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">🧠 Narrative Dashboard</h1>

      <div className="mb-8">
        <canvas style={{ maxHeight: "200px", maxWidth: "100%" }}
          id="narrativeTrendChart"
          className="bg-white rounded-lg h-64 w-full"
        ></canvas>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Groups Driving the Narrative:</h2>
        <ul className="list-disc pl-6 text-gray-300">
          <li>📢 GazaNewsNow (Telegram)</li>
          <li>📢 FreePalestineDaily (Instagram)</li>
          <li>📢 GenocideWatchX (Twitter/X)</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-lg">
        <h3 className="text-lg font-semibold mb-2">🖼️ Misused Image Case</h3>
        <img
          src="/images/thumbnails/scared_syrian_child_thumb.jpg"
          alt="Fake image used"
          className="rounded w-full max-h-64 object-cover mb-2"
        />
        <p className="text-gray-300 text-sm">
          This image, originally taken in Syria (2014), was misused in October 2023 to depict an Israeli airstrike in Gaza.
        </p>
      </div>
    </MainLayout>
  );
};

export default NarrativeDashboard;
