import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LiveWalletScanner = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWallets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/data/mock_live_wallets.json'); // הנתיב לקובץ הנתונים שלך
        setWallets(response.data);
      } catch (error) {
        console.error("Error fetching live wallets:", error);
        setError("Failed to load live wallets.");
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();

    // אפשר להוסיף כאן מנגנון ריענון נתונים אוטומטי אם צריך
    // למשל, setInterval(fetchWallets, 5000); // רענון כל 5 שניות
  }, []);

  if (loading) {
    return <div className="p-4">טוען נתונים...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">שגיאה: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-gray-800">סורק ארנקים פעילים</h2>
      {wallets.length > 0 ? (
        <ul className="space-y-2">
          {wallets.map((wallet) => (
            <li key={wallet.wallet_id} className="bg-white rounded shadow-md p-4 flex items-center justify-between">
              <div>
                <strong className="text-gray-700">{wallet.wallet_id}</strong>
                <p className="text-gray-600 text-sm">נצפה לאחרונה: {wallet.last_seen}</p>
              </div>
              <div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${wallet.status === 'Active' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
                  {wallet.status}
                </span>
                <button
                  onClick={() => navigate('/wallet-profile/' + wallet.wallet_id)}
                  className="ml-2 px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded text-sm"
                >
                  עבור לפרופיל ארנק ←
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-600">אין ארנקים פעילים כרגע.</div>
      )}
    </div>
  );
};

export default LiveWalletScanner;