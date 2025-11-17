import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl  flex items-center justify-between border border-gray-300">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default StatsCard;
