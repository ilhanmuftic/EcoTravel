import React, { useState } from "react";
import StreetView from "./StreetView";
import GuessMap from "./GuessMap";

const Game = ({ handleGuessSubmit, location }) => {
  const [userGuess, setUserGuess] = useState(null); // Track user's guess
  console.log("LOCATION", location, location.lat)

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
    </div>
  );
};

export default Game;
