
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const UserManagementDashboard = () => {
  const users = [
    { name: "Alice", role: "admin", email: "alice@example.com" },
    { name: "Bob", role: "analyst", email: "bob@example.com" },
    { name: "Charlie", role: "viewer", email: "charlie@example.com" },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      <Card>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="border-b">
                  <td className="py-1">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementDashboard;
