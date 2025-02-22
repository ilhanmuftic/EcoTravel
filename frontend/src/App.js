import React, { useState, useEffect, useRef } from "react";
import ResultsPopup from "./components/ResultsPopup";
import { getRandomLocation } from "./utils/randomLocation";
import { getDistance } from "./utils/distance";
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs"; 
import Account from "./components/Profile"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { calculateScore } from "./utils/score";
import PreviewLocation from "./components/PreviewLocation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this is imported!


const App = () => {
  const [location, setLocation] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lastGuess, setLastGuess] = useState(null);
  const [score, setScore] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {

    const fetchLocation = async () => {
      const randomLocation = await getRandomLocation(); // Await the result
      setLocation(randomLocation); // Set it after the promise resolves
    };

    if (!hasRun.current) {
      fetchLocation()
      hasRun.current = true;
    }
  }, []);

  const handleGuessSubmit = async (guessCoords) => {
    const [lat, lng] = guessCoords;
    const distance = getDistance(location, { lat, lng });

    const points = calculateScore(distance)

    setScore((prevScore) => prevScore + points);
    setLastGuess({ guess: [lat, lng], actual: location, distance });

    setShowResults(true);

    const currentLocation = await getRandomLocation();
    if (!currentLocation) {
      setGameOver(true);
    } else {
      setLocation(currentLocation);
    }
  };

  const closeResults = () => {
    setShowResults(false);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              
              {!gameOver && location && (
                <Game handleGuessSubmit={handleGuessSubmit} location={location} />
              )}
              {gameOver && <div style={{fontSize: 50}}>You Won!</div>}
              <ResultsPopup
                show={showResults}
                onClose={closeResults}
                guess={lastGuess?.guess}
                actual={lastGuess?.actual}
                distance={lastGuess?.distance}
                score={score}
              />
            </div>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Account />} />  {/* Use the renamed ProfilePage here */}
        <Route path="/preview" element={<PreviewLocation />} />
      </Routes>
      <ToastContainer 
       theme="dark"  // Set the theme to light
      />

    </Router>
  );
};

export default App;
