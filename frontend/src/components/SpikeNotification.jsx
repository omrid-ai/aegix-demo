
import { useEffect, useState } from "react";

const SpikeNotification = ({ spike }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (spike) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [spike]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 bg-yellow-400 text-black p-4 rounded-lg shadow-lg z-50 animate-bounce">
      <div className="flex items-center space-x-2">
        <span className="text-2xl">🔔</span>
        <div>
          <p className="font-bold">Spike Detected!</p>
          <p className="text-sm">+{spike.spikeValue} new markets ({Math.round(spike.spikePercentage)}% increase)</p>
        </div>
      </div>
    </div>
  );
};

export default SpikeNotification;
