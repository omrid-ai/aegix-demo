import React from "react";

const EmployeeRiskPanel = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-400">No employee risk data available.</p>;
  }

  return (
    <ul className="list-disc ml-4 space-y-1">
      {data.map((employee, index) => (
        <li key={index}>
          {employee.name} – Risk Level: {employee.riskLevel}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeRiskPanel;
