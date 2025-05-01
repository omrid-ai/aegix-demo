
import React from "react";

const LogDetailsView = () => {
  const details = {
    id: 1,
    user: "Admin",
    action: "Changed user role",
    timestamp: "2025-04-13 12:03",
    metadata: { target: "bob@example.com", newRole: "viewer" },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Log Details</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(details, null, 2)}</pre>
    </div>
  );
};

export default LogDetailsView;
