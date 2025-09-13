import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GoArrowLeft } from "react-icons/go";

const UserInfo = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Hamburger button */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 text-2xl z-50 text-white bg-gray-800 p-2 rounded-md shadow-md"
      > 
      
        {!sidebarOpen ? <FaBars /> :  <FaTimes/> }
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40 flex flex-col justify-between`}
      >
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-2 border-b border-gray-700 pb-2">{user.username}</h2>

          {/* User details as card-like sections */}
          <div className="bg-gray-800 p-3 rounded-md shadow hover:bg-gray-700 transition">
            <p className="text-gray-300 font-semibold">User Type</p>
            <p className="text-white">{user.userType}</p>
          </div>

          <div className="bg-gray-800 p-3 rounded-md shadow hover:bg-gray-700 transition">
            <p className="text-gray-300 font-semibold">Email</p>
            <p className="text-white">{user.email}</p>
          </div>

          <div className="bg-gray-800 p-3 rounded-md shadow hover:bg-gray-700 transition">
            <p className="text-gray-300 font-semibold">Tenancy</p>
            <p className="text-white">{user.tenancy.tenancyName} ({user.tenancy.plan})</p>
          </div>
        </div>

        {/* Close sidebar button at bottom */}
        <button 
          className='flex items-center justify-center text-white bg-gray-700 hover:bg-gray-600 p-2 m-4 rounded-md shadow-md'
          onClick={toggleSidebar}
        >
          <GoArrowLeft className="mr-2"/> Close
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default UserInfo;
