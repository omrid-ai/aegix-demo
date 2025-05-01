import React from "react";

export const Select = ({ children }) => (
  <div className="relative inline-block w-64">
    {children}
  </div>
);

export const SelectTrigger = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded shadow focus:outline-none"
  >
    {children}
  </button>
);

export const SelectContent = ({ children }) => (
  <div className="absolute mt-2 w-full bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
    {children}
  </div>
);

export const SelectItem = ({ value, onClick, children }) => (
  <div
    onClick={() => onClick(value)}
    className="px-4 py-2 cursor-pointer hover:bg-cyan-700 text-white"
  >
    {children}
  </div>
);