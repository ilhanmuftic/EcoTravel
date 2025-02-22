import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const GuessMap = ({ onGuessSubmit }) => {
  const [markerPosition, setMarkerPosition] = useState([43.9159, 17.6791]); // Default Bosnia coords

  const crosshairIcon = new L.Icon({
    iconUrl: "/crosshair.svg", // Reference to the SVG in the public folder
    iconSize: [20, 20], // Size of the crosshair
    iconAnchor: [10, 10], // Center the icon on the map
    popupAnchor: [0, 0],
  });

  // Add a marker where the user clicks
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer center={[43.9159, 17.6791]} zoom={7} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        <Marker position={markerPosition} icon={crosshairIcon} />
      </MapContainer>
      <button
        onClick={() => onGuessSubmit(markerPosition)}
        style={{
          padding: "8px 16px", // Smaller button padding
          fontSize: "14px",    // Smaller text size
          backgroundColor: "purple",  // A nice background color
          color: "white",      // White text for contrast
          border: "none",       // Remove border
          borderRadius: "5px",  // Rounded corners
          cursor: "pointer",
          marginTop: "25px",
          width: "100%",
          zIndex: 10 ,  // Add pointer cursor
                marginHorizontal: 'auto'
        }}
      >
        Submit Guess
      </button>
    </div>
  );
};

export default GuessMap;
