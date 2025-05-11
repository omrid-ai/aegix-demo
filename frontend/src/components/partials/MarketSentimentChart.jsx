import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const MarketSentimentChart = ({ sentiment }) => {
  if (!sentiment) return null;

  const entries = Array.isArray(sentiment)
    ? sentiment.map((item, index) => [`${index}`, item])
    : Object.entries(sentiment);

  return (
    <Card>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold">Market Sentiment</h3>
        <ul className="list-disc ml-4 space-y-1">
          {entries.map(([key, data], index) => (
            <li key={index}>
              {data.region} – Score: {data.score}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MarketSentimentChart;
