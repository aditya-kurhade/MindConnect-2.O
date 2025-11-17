import React from "react";

const Appointments = ({ appointments }) => {
  return (
    <div className="flex-1 border-1 border-gray-300 p-6 rounded-xl ">
      <div className="flex justify-between items-center mb-8 ">
        <h2 className="text-2xl font-semibold">Upcoming Appointments</h2>
        <button className="text-black border border-gray-300 font-semibold rounded-sm text-sm p-2 hover:bg-gray-50  ">View All</button>
      </div>
      <div className="space-y-4">
        {appointments.map((appt, idx) => (
          <div key={idx} className="p-4  bg-gray-50 rounded-xl flex flex-row items-center gap-4">
            <div><img src={appt.img} alt={appt.name} className="w-10 h-10 rounded-full inline-block mr-3" /></div>
            <div className="flex flex-col " >
            <h3 className="font-semibold">{appt.name}</h3>
            <p className="text-sm text-gray-600">{appt.specialty}</p>
            <p className="text-sm mt-2">
              {appt.time} · {appt.type}
            </p>
            </div>
            <button className="mt-2 px-3 py-1 bg-black text-white rounded-lg w-fit ml-auto">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
