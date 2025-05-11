import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WalletHeatmap = () => {
  const [wallets, setWallets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/data/mock_wallet_heatmap.json").then((res) => {
      setWallets(res.data);
    });
  }, []);

  const getColor = (score) => {
    if (score >= 8) return "#ff0000";
    if (score >= 5) return "#ffa500";
    return "#00ff00";
  };

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📍 Wallet Risk Map (Circles)</h1>
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-700 rounded">
        ← Back
      </button>
      <MapContainer
        center={[31.771959, 35.217018]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {wallets.map((wallet, index) => (
          <CircleMarker
            key={index}
            center={[wallet.lat, wallet.lon]}
            radius={10}
            fillOpacity={0.7}
            color={getColor(wallet.risk_score)}
          >
            <Tooltip>
              <div>
                <div><strong>ID:</strong> {wallet.wallet_id}</div>
                <div><strong>Risk:</strong> {wallet.risk_score}</div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WalletHeatmap;
