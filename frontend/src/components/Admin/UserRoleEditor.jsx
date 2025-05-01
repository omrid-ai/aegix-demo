
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

const UserRoleEditor = () => {
  const roles = ["admin", "analyst", "viewer"];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Edit User Role</h2>
      <Card>
        <CardContent className="space-y-4">
          <label>Email:</label>
          <input className="border p-2 w-full" placeholder="user@example.com" />
          <label>Select Role:</label>
          <Select>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoleEditor;
