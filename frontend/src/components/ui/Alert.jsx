import React from "react";

export const Alert = ({ type = "info", children }) => {
  const baseClass = "px-4 py-2 rounded text-sm";
  const typeClass = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  };

  return <div className={`${baseClass} ${typeClass[type]}`}>{children}</div>;
};