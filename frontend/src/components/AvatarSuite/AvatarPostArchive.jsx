
import React, { useEffect, useState } from "react";
import axios from "axios";

const AvatarPostArchive = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/data/avatar_posts.json").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="p-6 text-white bg-black min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">🗃️ Avatar Post Archive</h1>
      {posts.map((post, idx) => (
        <div key={idx} className="border-b border-gray-700 pb-2 mb-2">
          <p><strong>Avatar:</strong> {post.avatar}</p>
          <p><strong>Date:</strong> {post.date}</p>
          <p><strong>Platform:</strong> {post.platform}</p>
          <p><strong>Topic:</strong> {post.topic}</p>
          <p><strong>Engagement:</strong> {post.interactions}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AvatarPostArchive;
