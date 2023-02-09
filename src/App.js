import React, { useEffect, useState } from 'react'
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from './firebase';
import SendOTP from './components/SendOTP/SendOTP';

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      }
      else 
        setUserName("");
      
    //  console.log(user.displayName);
    });
  }, []);

  return (
    <div className="App">

      <Router>
        <Routes>
        
          <Route path="/home" element={<Home name={userName} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/sendOTP" element={<SendOTP />} />
          {/* <Route path="*" element={<NoPage />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
