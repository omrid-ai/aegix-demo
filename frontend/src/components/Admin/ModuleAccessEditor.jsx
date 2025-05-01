
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ModuleAccessEditor = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Module Access Editor</h2>
      <Card>
        <CardContent className="space-y-2">
          <p>Set which roles can access specific modules.</p>
          <p>(This could be dynamic in the future.)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleAccessEditor;
