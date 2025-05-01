import React from "react";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-60 bg-gray-900 border-r border-gray-800">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">AEGIX Intelligence System</h1>
          <div className="text-sm text-gray-300">Logged in as <strong>Omri</strong></div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>

        <footer className="bg-gray-800 text-gray-400 text-center text-xs py-2 border-t border-gray-700">
          &copy; 2025 AEGIX Platform
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
