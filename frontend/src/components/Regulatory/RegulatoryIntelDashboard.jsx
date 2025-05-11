import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RegulatoryIntelDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [aiInsights, setAiInsights] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/fatf_documents.json")
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        generateAIInsights(data);
      })
      .catch((err) => console.error("Error loading FATF data:", err));
  }, []);

  const generateAIInsights = (data) => {
    const topics = data.map((d) => d.title.toLowerCase());
    const keywords = ["virtual assets", "beneficial ownership", "evaluation", "follow-up"];
    const hits = keywords.map((k) => ({
      keyword: k,
      count: topics.filter((t) => t.includes(k)).length,
    }));
    const summary = hits
      .filter((h) => h.count > 0)
      .map((h) => `🔎 הדגש הרגולטורי על "${h.keyword}" הופיע ב-${h.count} מסמכים`)
      .join("\n");

    setAiInsights(summary || "אין מגמות בולטות במסמכים.");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("FATF Regulatory Documents", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Date", "Title", "Link"]],
      body: documents.map((d) => [d.date, d.title, d.url]),
    });
    doc.save("fatf_documents.pdf");
  };

  const getMonthlyCounts = () => {
    const counts = {};
    documents.forEach((doc) => {
      const [month, year] = doc.date.split(" ");
      const key = `${month} ${year}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    const sortedKeys = Object.keys(counts).reverse();
    return {
      labels: sortedKeys,
      datasets: [
        {
          label: "מסמכים לפי תאריך",
          data: sortedKeys.map((k) => counts[k]),
          fill: false,
          borderColor: "#36a2eb",
          tension: 0.3,
        },
      ],
    };
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-2">📜 FATF Regulatory Intelligence</h1>

      <p className="text-gray-300 mb-6">
        ארגון FATF (Financial Action Task Force) הוא גוף בינלאומי המפקח על מדיניות למניעת הלבנת הון ומימון טרור. 
        המסך מציג מסמכים רגולטוריים עיקריים שפורסמו באתר הרשמי, מאפשר ניתוח מגמות, תובנות מבוססות AI ותגובות רלוונטיות.
      </p>

      <div className="flex justify-between mb-6">
        <Button variant="secondary" onClick={() => navigate("/")}>
          ← חזור לעמוד הראשי
        </Button>
        <Button onClick={exportToPDF}>📤 ייצא PDF</Button>
      </div>

      <div className="mb-6">
        <Line data={getMonthlyCounts()} />
      </div>

      <Card className="bg-gray-800 text-white mb-6">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">🤖 תובנות מבוססות AI</h2>
          <pre className="text-sm whitespace-pre-wrap">{aiInsights}</pre>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() =>
              navigate(
                "/legal-exposure?focus=beneficial+ownership,virtual+assets,evaluation"
              )
            }
          >
            ⚖️ בדוק חשיפה משפטית לנושאים רגולטוריים
          </Button>
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 border border-gray-700">📅 תאריך</th>
              <th className="px-4 py-2 border border-gray-700">📝 כותרת</th>
              <th className="px-4 py-2 border border-gray-700">🔗 קישור</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-800">
                <td className="px-4 py-2 border border-gray-700">{doc.date}</td>
                <td className="px-4 py-2 border border-gray-700">{doc.title}</td>
                <td className="px-4 py-2 border border-gray-700">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    צפה
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegulatoryIntelDashboard;
