import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getDistance } from "../utils/distance";


// Custom icon for map markers
const locationIcon = new L.Icon({
    iconUrl: '/crosshair.svg', // Replace with your marker image path
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const ResultsPopup = ({ show, onClose, guess, actual, score }) => {
    if (!show) return null;

    console.log("Guess actual ", guess, actual)

    const distance = getDistance({lat: guess[0], lng: guess[1]}, actual);  // Find cleaner solution
    

    return (
        <div style={styles.popupContainer}>
            <div style={styles.popup}>
                <h3>Distance: {distance.toFixed(2)} km</h3>
                <p>Score: {score}</p>
                <div style={styles.map}>
                    <MapContainer center={actual} zoom={7} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {/* Set center of crosshair to these coordinates */}
                        <Marker position={guess} icon={locationIcon} /> 
                        <Marker position={actual} icon={locationIcon} />
                        <Polyline positions={[guess, actual]} color="red" />
                    </MapContainer>
                </div>
                <button style={styles.closeButton} onClick={onClose}>
                    Close
                </button>
            </div>
            
        </div>
    );
};

// Inline styles for simplicity
const styles = {
    popupContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    popup: {
        background: '#fff',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        width: '90%',
        textAlign: 'center',
    },
    closeButton: {
        background: 'purple',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        width: '80%',
        padding: 20,
        marginTop: '20px',
        fontSize: "20px"
    },
    map: {
        marginTop: '20px',
        height: '300px',
        borderRadius: '10px',
        overflow: 'hidden',
    },
};

export default ResultsPopup;
