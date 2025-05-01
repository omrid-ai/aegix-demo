import React from "react";
import { Table } from "@/components/ui/table";

const data = [
  { site: "darkleaks.market", type: "Credentials", date: "2025-04-12" },
  { site: "onionforum.xyz", type: "Database Sale", date: "2025-04-11" },
];

const DarkWebLeakTable = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Leaked Items</h3>
      <Table>
        <thead>
          <tr><th>Source</th><th>Type</th><th>Date</th></tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.site}</td>
              <td>{entry.type}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DarkWebLeakTable;
