import React from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { FiHeart, FiSettings, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavbarClient = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-100">
      <div className="flex justify-between items-center px-6 md:px-12 lg:px-36 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <FiHeart className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            MindConnect
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all duration-200">
            <FaBell className="text-lg" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button className="w-10 h-10 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all duration-200">
            <FiSettings className="text-lg" />
          </button>

          <button className="w-10 h-10 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all duration-200">
            <FiUser className="text-xl" />
          </button>

          <div className="w-px h-8 bg-gray-200 mx-2" />

          <Link to="/">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              <FaSignOutAlt className="text-sm" />
              <span>Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavbarClient;
