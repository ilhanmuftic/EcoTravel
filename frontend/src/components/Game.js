import React, { useState, useEffect, useRef }  from "react";
import StreetView from "./StreetView";
import GuessMap from "./GuessMap";
import ResultsPopup from "./ResultsPopup";
import { calculateScore } from "../utils/score";
import Navbar from "./Navbar";
import { getRandomLocation } from "../utils/randomLocation";
import { getDistance } from "../utils/distance";

const Game = ({ }) => {
  const [userGuess, setUserGuess] = useState(null); // Track user's guess
  const hasRun = useRef(false);
  const [showResults, setShowResults] = useState(false);
  const [location, setLocation] = useState(null);
  const [lastGuess, setLastGuess] = useState(null);
  const [score, setScore] = useState(0);


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
    setLocation(currentLocation);
    
  };

  const closeResults = () => {
    setShowResults(false);
  };

  return (
    <div
    
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1e1e2f", // Modern dark background
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
      
    >
      <Navbar />
      {/* Left Side: Street View */}
      <div
        style={{
          flex: 1,
          marginRight: "20px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {location ? (
          <StreetView lat={location.lat} lng={location.lng} />
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading location...
          </div>
        )}
      </div>

      {/* Right Side: Map and Button */}
      <div
        style={{
          flex: 0.6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          backgroundColor: "#2a2a3b",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "400px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <GuessMap
            onGuessSubmit={(guessCoords) => {
              handleGuessSubmit(guessCoords); // Submit guess and pass to parent
              setUserGuess(guessCoords); // Track guess locally
            }}
          />
        </div>

      </div>


      <ResultsPopup
        show={showResults}
        onClose={closeResults}
        guess={lastGuess?.guess}
        actual={lastGuess?.actual}
        distance={lastGuess?.distance}
        score={score}
      />
    </div>
  );
};

export default Game;
