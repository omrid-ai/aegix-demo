// 📁 components/Layout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SystemHealthCheck from "./SystemHealthCheck";

const Layout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <Sidebar />
        <div className="p-4 text-xs text-center text-gray-400 border-t border-gray-800">
          AEGIX v1.0 – Powered by OSINT
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <TopBar /> {/* במקום הכותרת הקודמת */}
        <div className="bg-white shadow rounded-lg p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
