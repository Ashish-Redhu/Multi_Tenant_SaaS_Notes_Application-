import { useState, useContext } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginForm from './pages/LoginForm';
import NoteDetails from './pages/NoteDetails';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import './App.css'

function App() {
   const [showLogin, setShowLogin] = useState(false); 
   const {isLoggedIn, loading} = useContext(UserContext);


    if (loading) {
      // Show loader while verifying session
      return (
          <div className="flex justify-center items-center w-screen h-screen bg-gray-900 text-white">
              <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-lg font-medium">Loading, please wait...</p>
              </div>
          </div>
      );
   }
   
   return (
      <Router>
        <div className="w-screen">
          <Routes>
            <Route 
              path="/" 
              element={isLoggedIn ? <Dashboard/> : <Home setShowLogin={setShowLogin}/>}
            />

           <Route path="/notes/:id" 
              element={isLoggedIn ? <NoteDetails/> : <Navigate to="/"/>}
           />
          </Routes>

          {showLogin && <LoginForm setShowLogin={setShowLogin} />}
        </div>
      </Router>
   )
}

export default App;
