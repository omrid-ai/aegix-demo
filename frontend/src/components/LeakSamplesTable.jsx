import React from "react";
import { Table } from "@/components/ui/table";

const LeakSamplesTable = () => {
  const leaks = [
    { id: 1, type: "Email List", group: "DarkMarket", date: "2024-06-20" },
    { id: 2, type: "Credential Dump", group: "LeakersHub", date: "2024-06-18" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">🧾 Leak Samples</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Group</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leaks.map((leak) => (
            <tr key={leak.id}>
              <td>{leak.id}</td>
              <td>{leak.type}</td>
              <td>{leak.group}</td>
              <td>{leak.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LeakSamplesTable;