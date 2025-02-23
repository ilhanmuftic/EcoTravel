import React, { useState, useEffect, useRef } from "react";
import Game from "./components/Game";
import AboutUs from "./components/AboutUs";
import Account from "./components/Profile";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PreviewLocation from "./components/PreviewLocation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this is imported!
import LoginPage from "./components/LoginPage";
import Leaderboard from "./components/Leaderboard";
import Recommendations from "./components/Recommendations";
import RegisterPage from "./components/Register";


const App = () => {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100vh', // Full height
            width: '100vw',  // Full width
            overflow: 'hidden'
          }}>
            <Navbar />
            <Recommendations />
            <Leaderboard />

          </div>
        } />
        <Route
          path="/play"
          element={<Game />}
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/preview" element={<PreviewLocation />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
      <ToastContainer
        theme="dark"  // Set the theme to light
      />

    </Router>
  );
};

export default App;
