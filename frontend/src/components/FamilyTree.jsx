import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";

const FamilyTree = ({ connections }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-4">
      {connections.map((conn) => (
        <div
          key={conn.id}
          onClick={() => setSelected(conn)}
          className="p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer flex justify-between items-center"
        >
          <div>
            <FaUserFriends className="inline mr-2 text-teal-400" />
            {conn.name} ({conn.relation})
          </div>
          <button className="text-cyan-300 hover:underline">View</button>
        </div>
      ))}

      {/* Popup if selected */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-80 space-y-4">
            <h2 className="text-xl font-bold">👤 {selected.name}</h2>
            <p><strong>Relation:</strong> {selected.relation}</p>
            <button onClick={() => setSelected(null)} className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTree;