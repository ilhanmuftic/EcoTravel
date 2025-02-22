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


const App = () => {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<div><Navbar /></div>}/>
        <Route
          path="/play"
          element={<Game />}
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Account />} />  
        <Route path="/preview" element={<PreviewLocation />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
      <ToastContainer 
       theme="dark"  // Set the theme to light
      />

    </Router>
  );
};

export default App;
