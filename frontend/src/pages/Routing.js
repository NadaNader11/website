import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home.js'; 
import User from './pages/user.js'; 

const Routing = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<Home />} />

        {/* Route for the user (booking) page */}
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
};

export default Routing;


