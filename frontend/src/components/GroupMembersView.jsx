import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockUsers = [
  { username: "CryptoShark77", lastSeen: "2025-04-08", risk: "High" },
  { username: "NovaScanner", lastSeen: "2025-04-07", risk: "Medium" },
  { username: "AnonZ", lastSeen: "2025-04-06", risk: "Low" },
  { username: "DarkExchange", lastSeen: "2025-04-06", risk: "High" },
  { username: "PayAlert24", lastSeen: "2025-04-05", risk: "Medium" },
  { username: "BitHunter", lastSeen: "2025-04-05", risk: "Low" },
  { username: "CoinHackPro", lastSeen: "2025-04-04", risk: "High" },
  { username: "FiTechMod", lastSeen: "2025-04-03", risk: "Low" },
];

const GroupMembersView = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.risk.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Group Members</h2>
          <Input
            type="text"
            placeholder="Search by user or risk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />
        </div>

        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="py-2">Username</th>
              <th>Last Seen</th>
              <th>Risk Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2">{user.username}</td>
                <td>{user.lastSeen}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      user.risk === "High"
                        ? "bg-red-600"
                        : user.risk === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {user.risk}
                  </span>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default GroupMembersView;
