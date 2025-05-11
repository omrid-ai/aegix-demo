import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PostArchive = () => {
  const archivedPosts = [
    { id: 101, platform: "Facebook", content: "פוסט ישן מהפייסבוק", archivedAt: "2024-12-01" },
    { id: 102, platform: "X (Twitter)", content: "ציוץ שנשמר", archivedAt: "2024-12-10" },
    { id: 103, platform: "Telegram", content: "פוסט קבוצתי שמור", archivedAt: "2024-12-20" },
  ];

  return (
    <div className="p-6 space-y-4 text-white">
      <h2 className="text-2xl font-bold">🗃 ארכיון פוסטים</h2>
      {archivedPosts.map(post => (
        <Card key={post.id}>
          <CardContent>
            <p><strong>{post.platform}</strong> – {post.content} <br />🕒 {post.archivedAt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostArchive;
