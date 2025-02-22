import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getDistance } from "../utils/distance";

// Custom icon for map markers
const locationIcon = new L.Icon({
    iconUrl: '/crosshair.svg', // Replace with your marker image path
    iconSize: [25, 41],
    iconAnchor: [15, 20],
});

const locationGuessIcon = new L.Icon({
    iconUrl: '/crosshair-guess.svg', // Replace with your marker image path
    iconSize: [25, 41],
    iconAnchor: [15, 20],
});

const ResultsPopup = ({ show, onClose, guess, actual, score }) => {
    const [rating, setRating] = useState(0); // Store selected rating

    if (!show) return null;

    const distance = getDistance({ lat: guess[0], lng: guess[1] }, actual);

    return (
        <div style={styles.popupContainer}>
            <div style={styles.popup}>

            <div style={styles.map}>
                    <MapContainer center={actual} zoom={7} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={guess} icon={locationGuessIcon} />
                        <Marker position={actual} icon={locationIcon} />
                        <Polyline positions={[guess, actual]} color="red" />
                    </MapContainer>
                </div>
                <h3 style={styles.text}>Score: {score}</h3>
                {/* <p style={styles.text}>Distance: {distance.toFixed(2)} km</p> */}
                Eco Friendly Rating <br />

                {/* Star Rating System */}
                <div style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            style={{
                                ...styles.star,
                                color: star <= rating ? '#aaffaa' : '#555',
                            }}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>


                <button style={styles.closeButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

// Dark mode styles
const styles = {
    popupContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        color: 'white',
    },
    popup: {
        background: '#222',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.2)',
    },
    text: {
        color: 'white',
        fontSize: '28px',

    },
    closeButton: {
        background: '#6a0dad',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        width: '80%',
        padding: 20,
        marginTop: '20px',
        fontSize: "20px",
    },
    map: {
        marginTop: '20px',
        height: '300px',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    ratingContainer: {
        marginTop: '15px',
        fontSize: '30px',
    },
    star: {
        cursor: 'pointer',
        margin: '0 5px',
    },
};

export default ResultsPopup;
