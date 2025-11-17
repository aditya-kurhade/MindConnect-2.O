import React from "react";
import { FiPlus , FiEdit, FiTrash2 } from "react-icons/fi";


const Appointments = ({ schedule, onAddAppointment, onEditAppointment, onDeleteAppointment }) => {
  return (
    <div className="p-6 bg-white shadow rounded-xl space-y-4">
      <div className="flex justify-between items-center mb-4">
  <h3 className="text-lg font-semibold">Appointments</h3>
  {/* Add Appointment Button */}
  <button
    onClick={onAddAppointment}
    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
  >
    <FiPlus className="text-lg" />
  </button>
</div>

      {schedule.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No appointments found</p>
      ) : (
        <ul className="space-y-3">
          {schedule.map((a, idx) => (
            <li key={idx} className="p-4 border rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-medium text-lg">{a.session}</h4>
                <p className="text-sm text-gray-500">👤 {a.name}</p>
                <p className="text-sm text-gray-500">🕒 {a.time} | ⏳ {a.duration}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                  onClick={() => onEditAppointment(idx)}
                >
                  <FiEdit />
                </button>
                <button
                  className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600"
                  onClick={() => onDeleteAppointment(idx)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
