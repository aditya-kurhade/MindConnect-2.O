import React from "react";
import { FaRegCommentDots, FaStar } from "react-icons/fa";

const Counsellors = ({ counsellors }) => {
  return (
    <div className="flex-1 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Your Counsellors</h2>
      <div className="space-y-4">
        {counsellors.map((c, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-xl"
          >
            {/* Left: Profile Image */}
            <img
              src={c.image}
              alt={c.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* Middle: Details */}
            <div className="flex-1 ml-4">
              <h3 className="font-semibold text-gray-800">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.specialty}</p>
              <div className="flex items-center text-sm text-yellow-500">
                <FaStar className="mr-1" /> {c.rating}
              </div>
            </div>

            {/* Right: Message Icon */}
            <button className="text-black border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                <FaRegCommentDots size={20} />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Counsellors;
