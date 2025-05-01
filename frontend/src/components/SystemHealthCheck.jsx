import React, { useState } from "react";
import axios from "axios";

const SystemHealthCheck = () => {
  const [status, setStatus] = useState(null);

  const checkHealth = async () => {
    try {
      const res = await axios.get("/api/healthcheck");
      setStatus(res.data);
    } catch (err) {
      setStatus({ error: "Server unreachable" });
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🩺 System Health Check</h2>
      <button
        onClick={checkHealth}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Run Check
      </button>

      {status && (
        <div className="mt-4 space-y-2">
          <div>✅ .env Loaded: {status.env_loaded ? "Yes" : "No"}</div>
          <div>✅ Telegram API Connected: {status.telegram_connected ? "Yes" : "No"}</div>
          {status.telegram_error && (
            <div className="text-red-600">Error: {status.telegram_error}</div>
          )}
          <div>✅ DB Connected: {status.database_connected ? "Yes" : "No"}</div>
        </div>
      )}
    </div>
  );
};

export default SystemHealthCheck;
