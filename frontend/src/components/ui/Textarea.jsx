import React from "react";

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`border border-gray-300 rounded px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring focus:border-blue-300 ${className}`}
    {...props}
  />
);