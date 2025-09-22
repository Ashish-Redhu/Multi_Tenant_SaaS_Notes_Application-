import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const LoginForm = ({ setShowLogin }) => {
  const { setUser, setIsLoggedIn, loading, setLoading} = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const backendURI = import.meta.env.VITE_BACKEND_URI;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            const response = await axios.post(`${backendURI}/login`, { email, password }, {withCredentials: true});
            const user = response.data.user;
            setUser(user);
            setIsLoggedIn(true);
        
            // Update login state and redirect
            setIsLoggedIn(true);
            setShowLogin(false);

            // Pass user data via navigate
            navigate('/');
        } 
        catch (err) {
            // Handle errors
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Server error occurred. Please try again.');
            }
        }
        finally{
          setLoading(false);
        }
  };

  const handleClose = ()=>{
    setShowLogin(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      {loading &&
      <div className="flex justify-center items-center w-screen h-screen bg-gray-900 text-white">
              <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-lg font-medium">Loading, please wait...</p>
              </div>
          </div>
      }
      {!loading && 
      <div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative">
          <button 
            onClick={handleClose} 
            className="absolute top-2 right-2 text-gray-600 hover:text-white text-xl"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
            <button 
              type="submit" 
              className="bg-purple-700 hover:bg-purple-600 py-2 rounded text-white font-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      }
    </div>
  );
}

export default LoginForm;
