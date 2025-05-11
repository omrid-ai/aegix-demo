import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockCases = [
  {
    id: 1,
    title: "הפרת רגולציה בתחום virtual assets",
    summary: "מקרה משפטי שקשור להפרת חובת דיווח על נכסים דיגיטליים",
    status: "פתוח",
    date: "2024-03-01",
  },
  {
    id: 2,
    title: "Beneficial Ownership - אי גילוי",
    summary: "תיק נגד חברה שלא חשפה בעלות מהותית",
    status: "נסגר",
    date: "2023-11-15",
  },
  {
    id: 3,
    title: "תביעה כללית",
    summary: "תביעה כללית ללא קשר ישיר לרגולציה",
    status: "בטיפול",
    date: "2023-12-20",
  },
];

const LegalExposurePanel = () => {
  const [searchParams] = useSearchParams();
  const focusTopics = searchParams.get("focus")?.split(",") || [];
  const [filteredCases, setFilteredCases] = useState([]);

  useEffect(() => {
    if (focusTopics.length === 0) {
      setFilteredCases(mockCases);
    } else {
      const filtered = mockCases.filter((c) =>
        focusTopics.some((topic) =>
          c.summary.toLowerCase().includes(topic.toLowerCase())
        )
      );
      setFilteredCases(filtered);
    }
  }, [focusTopics]);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-4">⚖️ חשיפה משפטית</h1>

      {focusTopics.length > 0 && (
        <p className="text-gray-400 mb-4">
          סינון לפי מילות מפתח רגולטוריות:{" "}
          <span className="text-blue-300">{focusTopics.join(", ")}</span>
        </p>
      )}

      <div className="grid gap-4">
        {filteredCases.map((c) => (
          <Card key={c.id} className="bg-gray-800">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-1">{c.title}</h2>
              <p className="text-sm text-gray-300 mb-2">{c.summary}</p>
              <div className="text-sm text-gray-400">
                סטטוס: <b>{c.status}</b> | תאריך: {c.date}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LegalExposurePanel;
