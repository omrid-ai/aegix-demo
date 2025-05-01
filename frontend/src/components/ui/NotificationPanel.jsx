// 📁 components/ui/NotificationPanel.jsx

import React from "react";

const mockNotifications = [
  { id: 1, type: "alert", message: "🚨 Suspicious login attempt", time: "2 minutes ago" },
  { id: 2, type: "system", message: "🛠 Scheduled maintenance at 22:00", time: "1 hour ago" },
  { id: 3, type: "report", message: "📄 New intelligence report available", time: "Today" }
];

const NotificationPanel = () => {
  return (
    <div className="absolute top-12 right-4 w-72 bg-white shadow-lg rounded-lg border z-50">
      <div className="p-3 border-b font-semibold text-gray-800">🔔 Notifications</div>
      <ul className="max-h-60 overflow-y-auto">
        {mockNotifications.map((note) => (
          <li key={note.id} className="p-3 hover:bg-gray-100 text-sm text-gray-700 border-b last:border-none">
            <div className="font-medium">{note.message}</div>
            <div className="text-xs text-gray-400">{note.time}</div>
          </li>
        ))}
      </ul>
      <div className="p-2 text-center text-sm text-blue-600 hover:underline cursor-pointer">
        View All
      </div>
    </div>
  );
};

export default NotificationPanel;