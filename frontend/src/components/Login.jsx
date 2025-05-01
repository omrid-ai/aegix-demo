import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      localStorage.setItem("username", username);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-xs flex flex-col items-center space-y-6 p-6">
        <h1 className="text-2xl font-bold">Welcome to AEGIX</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-sm"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 text-sm rounded"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 mt-4">
          © 2025 AEGIX — an AI-powered OSINT platform
        </p>
      </div>
    </div>
  );
};

export default Login;
