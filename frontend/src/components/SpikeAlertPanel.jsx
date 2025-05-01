
import { useEffect, useState } from "react";
import SpikeNotification from "./SpikeNotification";

const calculateSpike = (timeline) => {
  if (timeline.length < 2) return null;
  const last = timeline[timeline.length - 1].shares;
  const prev = timeline[timeline.length - 2].shares;
  const spikeValue = last - prev;
  const spikePercentage = ((spikeValue) / (prev || 1)) * 100;

  if (spikePercentage >= 50) {
    return { spikeValue, spikePercentage };
  }
  return null;
};

const SpikeAlertPanel = ({ timeline }) => {
  const [spike, setSpike] = useState(null);

  useEffect(() => {
    const result = calculateSpike(timeline);
    setSpike(result);
  }, [timeline]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white mt-6 max-w-5xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-4">🚨 Spike Detection</h2>
      {spike ? (
        <div className="text-yellow-400 font-bold text-lg">
          ⚠️ Spike detected: {spike.spikeValue} new markets found ({Math.round(spike.spikePercentage)}% increase)
        </div>
      ) : (
        <div className="text-green-400 font-semibold text-lg">
          ✅ No spike detected.
        </div>
      )}
      <SpikeNotification spike={spike} />
    </div>
  );
};

export default SpikeAlertPanel;
