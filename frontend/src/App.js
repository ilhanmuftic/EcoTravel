import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocationProvider, useLocation } from "./LocationContext";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Account from "./components/Profile";
import Game from "./components/Game";
import ResultsPopup from "./components/ResultsPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <LocationProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={      <div>  <Navbar />
Welcome to the game! Navigate to /game to play.</div>}
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Account />} />
          <Route
            path="/game"
            element={<GamePage />}
          />
        </Routes>
        <ToastContainer theme="dark" />
      </Router>
    </LocationProvider>
  );
};

const GamePage = () => {
  const { location, fetchLocation } = useLocation();

  useEffect(() => {
    // Fetch the location only when entering the game page
    fetchLocation();
  }, [fetchLocation]);

  return (
    <div>
      <h1>Game Page</h1>
      {location ? (
        <Game location={location} />
      ) : (
        <div>Loading location...</div>
      )}
      <ResultsPopup />
    </div>
  );
};

export default App;
