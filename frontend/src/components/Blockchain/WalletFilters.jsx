
import React from "react";

const WalletFilters = ({ filters, setFilters }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">🔎 Advanced Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Function Name</label>
          <select
            value={filters.function}
            onChange={(e) => setFilters(prev => ({ ...prev, function: e.target.value }))}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option value="transfer">transfer</option>
            <option value="approve">approve</option>
            <option value="deposit">deposit</option>
            <option value="withdraw">withdraw</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Min Value (ETH)</label>
          <input
            type="number"
            value={filters.minValue}
            onChange={(e) => setFilters(prev => ({ ...prev, minValue: e.target.value }))}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contracts Only</label>
          <select
            value={filters.contractOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, contractOnly: e.target.value === "true" }))}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default WalletFilters;
