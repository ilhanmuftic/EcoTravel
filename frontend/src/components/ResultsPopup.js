import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getDistance } from "../utils/distance";
import { fetchWithAuth } from '../utils/fetch';
import { toast } from 'react-toastify'; // Importing toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for toast notifications


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

const ResultsPopup = ({ show, onClose, guess, actual, score, location_id }) => {
    const [rating, setRating] = useState(0); // Store selected rating
    const API_URL = process.env.REACT_APP_API_URL;

    if (!show) return null;

    // const distance = getDistance({ lat: guess[0], lng: guess[1] }, actual);


    const handleSubmit = async (star) => {
        try {
            const data = await fetchWithAuth(`${API_URL}/api/rate-location/`, {
                method: 'POST',
                body: JSON.stringify({
                    rating: star,
                    location: location_id, // Sending the location along with the rating
                }),
            });

            toast.success("Rating submitted successfully!");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

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

                {/* Star Rating System */}
                {score >= 4000 ?
                    <div style={styles.ratingContainer}>
                        Eco Friendly Rating <br />

                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{
                                    ...styles.star,
                                    color: star <= rating ? '#aaffaa' : '#555',
                                }}
                                onClick={() => {
                                    setRating(star); // Set the rating
                                    handleSubmit(star); // Immediately submit the rating
                                }}
                            >
                                ★
                            </span>
                        ))}


                    </div> : null}

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
