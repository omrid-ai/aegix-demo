
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const EmployeeProfileView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get("/data/company_analysis/mock_company.json").then((res) => {
      const match = res.data.employees.find((e) => {
        const kebabName = e.name.toLowerCase().replace(/\s+/g, "-");
        return e.id === id || kebabName === id;
      });
      setEmployee(match);
    });
  }, [id]);

  if (!employee) return <p className="p-6 text-white">Loading...</p>;

  const position = employee.coordinates || [32.0853, 34.7818]; // default: Tel Aviv
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Risk styling
  const riskColor = employee.risk_level === "High"
    ? "#7f1d1d"
    : employee.risk_level === "Medium"
    ? "#78350f"
    : "#064e3b";

  const borderColor = employee.risk_level === "High"
    ? "#f87171"
    : employee.risk_level === "Medium"
    ? "#fbbf24"
    : "#34d399";

  return (
    <div className="p-6 bg-black text-white min-h-screen space-y-10">
      <h1 className="text-3xl font-bold">🧑‍💼 Employee Profile</h1>

      <Card style={{ backgroundColor: riskColor, border: `1px solid ${borderColor}` }}>
        <CardContent className="p-6 flex flex-col md:flex-row gap-8 items-start">
          <img
            src={employee.image}
            alt={employee.name}
            className="w-24 h-24 rounded-full border border-gray-500"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold">{employee.name}</h2>
            <p className="text-sm text-gray-200">{employee.role} | {employee.department}</p>
            <p className="text-sm text-gray-300">{employee.location}</p>
            {employee.url && (
              <a
                href={employee.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 text-sm underline"
              >
                🔗 View Profile
              </a>
            )}
            <p className="mt-2 text-yellow-300">⚠️ {employee.risk_reason}</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-2">📍 Residence Map</h3>
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={markerIcon}>
            <Popup>{employee.name}'s Location</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-1">🕸️ Social Network Graph</h3>
        <iframe
          src={`/data/graphs/social_graph_${employee.id.replace(/-/g, "_")}.html`}
          width="100%"
          height="500px"
          className="rounded border border-gray-700 mt-2"
          title="Social Graph"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-1">👨‍👩‍👧 Family Tree</h3>
        <iframe
          src={`/data/graphs/family_tree_${employee.id.replace(/-/g, "_")}.html`}
          width="100%"
          height="400px"
          className="rounded border border-gray-700 mt-2"
          title="Family Tree"
        />
      </div>

      <div className="pt-6">
        <button
          onClick={() => window.location.href = "/employee-risk"}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          ← חזור לרשימת העובדים
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfileView;
