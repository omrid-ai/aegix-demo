import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

ChartJS.register(ArcElement, Tooltip, Legend);

const LegalExposurePanel = () => {
  const [searchParams] = useSearchParams();
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [focusTerms, setFocusTerms] = useState([]);

  useEffect(() => {
    const focusParam = searchParams.get("focus");
    const terms = focusParam ? focusParam.split(",") : [];
    setFocusTerms(terms);
  }, [searchParams]);

  useEffect(() => {
    fetch("/data/legal/legal_cases.json")
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
        if (focusTerms.length === 0) {
          setFilteredCases(data);
        } else {
          const filtered = data.filter((c) =>
            focusTerms.some((term) =>
              c.description?.toLowerCase().includes(term.toLowerCase())
            )
          );
          setFilteredCases(filtered);
        }
      });
  }, [focusTerms]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Legal Exposure Cases", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Type", "Description", "Status", "Exposure", "Date"]],
      body: filteredCases.map((c) => [
        c.type,
        c.description,
        c.status,
        c.exposure,
        c.date,
      ]),
    });
    doc.save("legal_exposure_cases.pdf");
  };

  const getPieData = () => {
    const typeCounts = {};
    filteredCases.forEach((c) => {
      typeCounts[c.type] = (typeCounts[c.type] || 0) + 1;
    });
    return {
      labels: Object.keys(typeCounts),
      datasets: [
        {
          label: "# תיקים",
          data: Object.values(typeCounts),
          backgroundColor: [
            "#36A2EB",
            "#FF6384",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#F7464A",
          ],
        },
      ],
    };
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-4">⚖️ חשיפה משפטית</h1>

      {focusTerms.length > 0 && (
        <p className="text-gray-400 mb-4">
          סינון לפי מילים רגולטוריות:{" "}
          <span className="text-blue-300">{focusTerms.join(", ")}</span>
        </p>
      )}

      <Button
        variant="secondary"
        onClick={() => window.history.back()}
        className="mb-4"
      >
        ← חזור למסך הקודם
      </Button>

      <div className="flex justify-between items-center mb-6">
        <div className="w-[300px]">
          <Pie data={getPieData()} />
        </div>
        <Button onClick={exportToPDF}>📤 ייצא PDF</Button>
      </div>

      <div className="grid gap-4">
        {filteredCases.map((c, index) => (
          <Card key={index} className="bg-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{c.type}</h2>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    c.status === "Open"
                      ? "bg-red-600"
                      : c.status === "InProgress"
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-2">{c.description}</p>
              <p className="text-gray-400 text-xs mb-1">
                🔍 חשיפה: <b>{c.exposure}</b> | 📅 {c.date}
              </p>
              <p className="text-gray-400 text-xs mb-1">📝 {c.notes}</p>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline text-sm"
                >
                  פתיחה מקורית
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LegalExposurePanel;
