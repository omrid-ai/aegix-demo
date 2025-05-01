import React from "react";
const Dashboard = () => {
  const username = localStorage.getItem("username") || "guest";
  const role = localStorage.getItem("userRole") || "viewer";
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">📊 AEGIX Dashboard</h1>
      <p className="mt-4">Welcome, <strong>{username}</strong> ({role})</p>
    </div>
  );
};
export default Dashboard;