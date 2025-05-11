import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PostTimeline = () => {
  const posts = [
    { id: 1, date: "2025-05-01", content: "פוסט ראשון – פתיחת חשבון." },
    { id: 2, date: "2025-05-02", content: "פוסט נוסף – פעילות בתחום פיננסים." },
    { id: 3, date: "2025-05-03", content: "תגובה לפוסט מתחרה." },
  ];

  return (
    <div className="p-6 space-y-4 text-white">
      <h2 className="text-2xl font-bold">📅 פוסטים לפי ציר זמן</h2>
      {posts.map(post => (
        <Card key={post.id}>
          <CardContent>
            <p><strong>{post.date}:</strong> {post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostTimeline;
