import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockData = [
  { username: "john_doe", group: "InternalOps", messages: 74, riskScore: 91, status: "Flagged" },
  { username: "alice_k", group: "R&D", messages: 49, riskScore: 68, status: "Normal" },
  { username: "user777", group: "Finance", messages: 102, riskScore: 95, status: "Critical" }
];

const InsiderRiskDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(mockData);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🕵 Insider Risk Monitor</h2>
      <Card>
        <CardContent className="p-4">
          <Table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Username</th>
                <th className="p-2 text-left">Group</th>
                <th className="p-2 text-left">Messages</th>
                <th className="p-2 text-left">Risk Score</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="border-t hover:bg-muted/50">
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.group}</td>
                  <td className="p-2">{user.messages}</td>
                  <td className="p-2">{user.riskScore}</td>
                  <td className="p-2 font-semibold">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
      <Button>Export Insider Report</Button>
    </div>
  );
};

export default InsiderRiskDashboard;