import React from "react";

const Progress = ({ value = 0, className = "" }) => {
  const percentage = Math.min(100, Math.max(0, value));
  let color = "bg-green-500";
  if (percentage > 66) color = "bg-red-500";
  else if (percentage > 33) color = "bg-yellow-400";

  return (
    <div className={`w-full h-4 bg-gray-800 rounded overflow-hidden ${className}`}>
      <div
        className={`h-4 ${color}`}
        style={{ width: `${percentage}%`, transition: "width 0.3s ease-in-out" }}
      ></div>
    </div>
  );
};

export { Progress };
