import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

const ExportReport = () => {
  const [data, setData] = useState({});
  const [section, setSection] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const files = [
        "mock_company.json",
        "mock_employees.json",
        "mock_reviews.json",
        "mock_legal_cases.json",
        "mock_competitors.json",
        "mock_narratives.json"
      ];
      const res = await Promise.all(
        files.map((f) => axios.get(`/data/company_analysis/${f}`))
      );
      setData({
        company: res[0].data,
        employees: res[1].data,
        reviews: res[2].data,
        legal: res[3].data,
        competitors: res[4].data,
        narratives: res[5].data
      });
    };
    fetchAll();
  }, []);

  if (!data.company) return <p className="p-6 text-white">Generating report...</p>;

  const totalScore = 7.3;
  const getColor = () => {
    if (totalScore < 5) return "bg-red-600";
    if (totalScore < 7.5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="p-6 space-y-6 text-white bg-black min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="AEGIX" className="h-12" />
          <h1 className="text-3xl font-bold">Export M&A Report</h1>
        </div>
        <Button onClick={() => window.print()}>🖨️ Print / Save PDF</Button>
      </div>

      <div className="flex justify-center">
        <div className={`text-2xl font-bold px-6 py-3 rounded shadow ${getColor()}`}>
          📊 Overall Readiness Score: {totalScore} / 10
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          <h2 className="text-xl font-semibold mb-2">📊 AI-Based Summary & Strategic Recommendations</h2>
          <ul className="list-disc ml-6 text-sm space-y-1">
            <li>⚠️ 2 employees flagged as High Risk. Recommend background vetting and monitoring.</li>
            <li>🔴 Most negative product reviews came from <b>Twitter</b>.</li>
            <li>📢 Dominant narrative source: <b>Telegram</b>.</li>
            <li>⚖️ 3 open legal cases.</li>
            <li>🏆 Leading competitor: <b>SynapseX</b>.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <h2 className="text-xl font-semibold mb-2">📋 Score Breakdown</h2>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-2">קריטריון</th>
                <th className="p-2">ניקוד שהושג</th>
                <th className="p-2">מקסימום</th>
                <th className="p-2">הערה</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-2">Product Sentiment</td>
                <td className="p-2">2</td>
                <td className="p-2">3</td>
                <td className="p-2">חלק מהביקורות שליליות</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Legal Exposure</td>
                <td className="p-2">1</td>
                <td className="p-2">2</td>
                <td className="p-2">קיימות חשיפות פתוחות</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Employee Risk</td>
                <td className="p-2">1</td>
                <td className="p-2">2</td>
                <td className="p-2">עובדים בסיכון גבוה</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Narrative Risk</td>
                <td className="p-2">2</td>
                <td className="p-2">2</td>
                <td className="p-2">נרטיבים קריטיים קיימים</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2">Competitor Threat</td>
                <td className="p-2">1</td>
                <td className="p-2">1</td>
                <td className="p-2">מתחרה דומיננטי מזוהה</td>
              </tr>
              <tr className="font-bold">
                <td className="p-2">סה"כ</td>
                <td className="p-2">{totalScore}</td>
                <td className="p-2">10</td>
                <td className="p-2">ניקוד כולל</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <h2 className="text-xl font-semibold mb-2">📂 Full Report Details</h2>
          <details className="mb-2">
            <summary className="cursor-pointer font-semibold">📢 Product Sentiment</summary>
            <ul className="list-disc ml-6 mt-1">
              {data.reviews.map((r, i) => (
                <li key={i}>{r.platform}: {r.comment} – Sentiment: {r.sentiment}</li>
              ))}
            </ul>
          </details>

          <details className="mb-2">
            <summary className="cursor-pointer font-semibold">⚖️ Legal Issues</summary>
            <ul className="list-disc ml-6 mt-1">
              {data.legal.map((l, i) => (
                <li key={i}>{l.type}: {l.description} – Status: {l.status}</li>
              ))}
            </ul>
          </details>

          <details className="mb-2">
            <summary className="cursor-pointer font-semibold">👥 Employees</summary>
            <ul className="list-disc ml-6 mt-1">
              {data.employees.map((e, i) => (
                <li key={i}>{e.name} ({e.role}) – Risk: {e.risk}</li>
              ))}
            </ul>
          </details>

          <details className="mb-2">
            <summary className="cursor-pointer font-semibold">🏆 Competitors</summary>
            <ul className="list-disc ml-6 mt-1">
              {data.competitors.map((c, i) => (
                <li key={i}>{c.name}: Market Share {c.market_share}% – {c.advantage}</li>
              ))}
            </ul>
          </details>

          <details>
            <summary className="cursor-pointer font-semibold">🧠 Narratives</summary>
            <ul className="list-disc ml-6 mt-1">
              {data.narratives.map((n, i) => (
                <li key={i}>{n.source}: {n.summary} ({n.type})</li>
              ))}
            </ul>
          </details>
        </CardContent>
      </Card>

      <Button variant="default" className="mt-6 print:hidden" onClick={() => navigate("/company-profile")}>
        ← Back to Company Profile
      </Button>
    </div>
  );
};

export default ExportReport;
