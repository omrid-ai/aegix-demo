import React from "react";
import { Button } from "@/components/ui/button";

const ChatExportReport = () => {
  const handleExport = () => {
    alert("🧠 Report export started (PDF/HTML simulated)");
  };

  return (
    <div className="text-right mt-4">
      <Button onClick={handleExport}>📤 Export Chat Summary</Button>
    </div>
  );
};

export default ChatExportReport;