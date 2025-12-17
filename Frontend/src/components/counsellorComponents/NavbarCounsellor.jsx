import React from "react";
import { FaRegHeart, FaBell, FaCog, FaUserCircle, FaSignOutAlt  } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarCounsellor = (props) => {
  const userdata = props.userdata;
  return (
    <div>
      <header className="flex justify-between items-center px-36 py-3 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <FaRegHeart className="text-blue-500 text-3xl" />
          <div>
        <h1 className="text-2xl font-bold">Counsellor Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Dr. {userdata.firstName} {userdata.lastName}</p>
      </div>
        </div>
        <div className="space-x-6 flex items-center ">
           {/* Bell Icon */}
        <button className="text-gray-600 hover:text-blue-600">
          <FaBell className="text-xl" />
        </button>
          
         {/* Settings */}
        <button className="text-gray-600 hover:text-blue-600">
          <FaCog className="text-xl" />
        </button>

        {/* Profile */}
        <button className="text-gray-600 hover:text-blue-600">
          <FaUserCircle className="text-2xl" />
        </button>

        <Link to="/" ><button className="flex items-center space-x-2 px-4 py-2 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
        </Link>
        </div>

      </header>
    </div>
  );
};

export default NavbarCounsellor;
