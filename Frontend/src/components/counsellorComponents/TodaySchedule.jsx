import React from "react";

const TodaySchedule = ({ schedule }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
      <p className="text-sm text-gray-500 mb-4">Your appointments for today</p>
      <div className="space-y-4">
        {schedule.map((s, idx) => (
          <div key={idx} className="p-4 border rounded-xl flex justify-between items-center">
            <div>
              <h3 className="font-medium">{s.name}</h3>
              <p className="text-sm text-gray-500">{s.session}</p>
              <p className="text-xs text-gray-400">{s.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{s.time}</p>
              <div className="flex space-x-2 mt-2 justify-end">
                <button className="px-3 py-1 border rounded-lg text-sm">Chat</button>
                <button className="px-3 py-1 bg-black text-white rounded-lg text-sm">Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
