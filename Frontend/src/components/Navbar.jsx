import React from "react";
import { FaRegHeart, FaComments, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-36 py-3 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <FaRegHeart className="text-blue-500 text-3xl" />
          <Link to="/">
            <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-600 transition-colors">
              MindConnect
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/resources">
            <button className="text-gray-700 text-md hover:text-blue-600 transition-colors flex items-center gap-2">
              <FaBookOpen />
              Resources
            </button>
          </Link>
          <Link to="/forum">
            <button className="text-gray-700 text-md hover:text-blue-600 transition-colors flex items-center gap-2">
              <FaComments />
              Forum
            </button>
          </Link>
          <Link to="/signin">
            <button className="text-gray-700 text-md hover:text-blue-600 transition-colors">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
