import React from "react";

export const Table = ({ children, className = "" }) => (
  <table className={`min-w-full table-auto border border-gray-200 ${className}`}>
    {children}
  </table>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableRow = ({ children }) => (
  <tr className="border-t border-gray-200">{children}</tr>
);

export const TableCell = ({ children }) => (
  <td className="px-4 py-2 text-sm text-gray-700">{children}</td>
);

export const TableBody = ({ children }) => <tbody>{children}</tbody>;