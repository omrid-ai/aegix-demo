import React from "react";

const AvatarAdminPanel = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Avatar Intelligence Suite</h1>
      <p>בחר תת־מודול מהתפריט:</p>
      <ul className="list-disc pl-6 mt-2">
        <li>ניהול אוואטרים</li>
        <li>עריכת פרופילים</li>
        <li>לוח בקרה של סיכונים</li>
        <li>תזמון פעילות</li>
      </ul>
    </div>
  );
};

export default AvatarAdminPanel;