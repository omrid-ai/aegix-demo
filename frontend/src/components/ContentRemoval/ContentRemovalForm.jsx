import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContentRemovalForm = () => {
  const [formData, setFormData] = useState({
    platform: "Facebook",
    link: "",
    reason: "",
    description: "",
    priority: "Medium",
    severity: "Moderate",
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/content-removal/submit", data);
      alert("✅ Request submitted successfully!");
      setTimeout(() => navigate("/content-removal"), 1000); // ניווט חזרה לדשבורד
    } catch (error) {
      console.error("Submit failed:", error);
      alert("❌ Submission failed.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Submit New Removal Request</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-lg bg-gray-800 p-4 rounded-lg">
        <select name="platform" onChange={handleChange} className="w-full p-2 rounded bg-gray-900" required>
          <option>All Platforms</option>
          <option>Facebook</option>
          <option>Telegram</option>
          <option>Twitter</option>
          <option>Google Search</option>
        </select>
        <input type="text" name="link" placeholder="Content Link" onChange={handleChange} className="w-full p-2 rounded bg-gray-900" required />
        <select name="reason" onChange={handleChange} className="w-full p-2 rounded bg-gray-900" required>
          <option value="">Reason</option>
          <option>Fake News</option>
          <option>Defamation</option>
          <option>Copyright</option>
          <option>Other</option>
        </select>
        <textarea name="description" placeholder="Detailed Description" onChange={handleChange} className="w-full p-2 rounded bg-gray-900" rows="3" required />
        <select name="priority" onChange={handleChange} className="w-full p-2 rounded bg-gray-900">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select name="severity" onChange={handleChange} className="w-full p-2 rounded bg-gray-900">
          <option>Minor</option>
          <option>Moderate</option>
          <option>Severe</option>
        </select>
        <input type="file" name="file" onChange={handleChange} className="w-full text-white" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
};

export default ContentRemovalForm;
