import React, { useState } from "react";
import { useLocation } from "../LocationContext";
import StreetView from "./StreetView";
import GuessMap from "./GuessMap";
import Navbar from "./Navbar";

const Game = () => {
  const { location, gameOver, handleGuessSubmit } = useLocation();
  const [userGuess, setUserGuess] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1e1e2f",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
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
              handleGuessSubmit(guessCoords);
              setUserGuess(guessCoords);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
