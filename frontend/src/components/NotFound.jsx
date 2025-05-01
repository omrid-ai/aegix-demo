// 📁 components/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-700 mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-6">Oops! Page not found.</p>
      <Link
        to="/dashboard"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ⬅️ Go back to dashboard
      </Link>
    </div>
  );
};

export default NotFound;