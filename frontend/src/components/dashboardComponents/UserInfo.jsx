import React, { useState, useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const UserInfo = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [formData, setFormData] = useState({username: '', email: '', password: ''});
  const { setUser, setIsLoggedIn, totalUsersInTenancy, setTotalUsersInTenancy } = useContext(UserContext);
  const navigate = useNavigate();

  const backendURI = import.meta.env.VITE_BACKEND_URI;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInvite = () => {
    setShowInviteModal(true);
  }
  const handleCloseModal = () =>{
    setShowInviteModal(false);
  }

  const handleInputChange = (e) =>{
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const createUser = async()=>{
        const response = await axios.post(`${backendURI}/users/create`, {username: formData.username, email: formData.email, password:formData.password}, {withCredentials: true});
        setTotalUsersInTenancy(response.data.usersCount);
        handleCloseModal();
    }
    createUser();
  }

  const handleLogout = async ()=>{
    try {
      await axios.post(`${backendURI}/logout`, {}, { withCredentials: true });

      // Clear frontend state
      setUser(null);
      setIsLoggedIn(false);

      // Close sidebar if open
      setSidebarOpen(false);

      // Optionally redirect to home
      navigate("/");
    } 
    catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to log out. Try again.");
    }
  }


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

          <div className="bg-gray-800 p-3 rounded-md shadow hover:bg-gray-700 transition">
            <p className="text-gray-300 font-semibold">Total Users in Tenancy</p>
            <p className="text-white">{totalUsersInTenancy}</p>
          </div>

          {/* Invite User button visible only for admins */}
          {user.userType === "admin" && (
            <button
              onClick={handleInvite}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:cursor-pointer text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
            >
              Invite User
            </button>
          )}
        </div>
        
        <button
          className="flex items-center justify-center text-white p-3 m-4 rounded-md shadow-md font-semibold transition-all duration-200 
                    !bg-red-800 hover:!bg-red-700 hover:cursor-pointer hover:shadow-lg"
          onClick={handleLogout}
        >
          Logout
        </button>


      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
 
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">Invite New User</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
