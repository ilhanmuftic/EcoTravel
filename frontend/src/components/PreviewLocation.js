import React, { useState, useEffect } from 'react';
import StreetView from './StreetView'; // Assuming this is your StreetView component
import LocationDialog from './LocationDialog'; // The dialog box component

// TODO Rename this to add location
const PreviewLocation = () => {
  const [lat, setLat] = useState(null); // Default latitude (example: Sarajevo)
  const [lng, setLng] = useState(null); // Default longitude (example: Sarajevo)
  const [googleMapUrl, setGoogleMapUrl] = useState(''); // State to store Google Maps URL
  const [locationKey, setLocationKey] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (googleMapUrl) {
      extractCoordinatesFromUrl(googleMapUrl);
    }
  }, [googleMapUrl]); // Run the effect when googleMapUrl changes

  const handleGoogleMapUrlChange = (e) => {
    setGoogleMapUrl(e.target.value);
  };

  const extractCoordinatesFromUrl = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),/;
    const match = url.match(regex);
    if (match) {
      const newLat = parseFloat(match[1]);
      const newLng = parseFloat(match[2]);
      if (!isNaN(newLat) && !isNaN(newLng)) {
        setLat(newLat);
        setLng(newLng);
        setLocationKey(prevKey => prevKey + 1); // Trigger StreetView re-render
      }
    }
  };

  const handlePostLocation = () => {
    setShowDialog(true); // Show the dialog to enter city and location name
  };

  return (
    <div style={styles.container}>
      <div style={styles.streetViewContainer}>
        <StreetView key={locationKey} lat={lat} lng={lng} />
      </div>

      <div style={styles.inputContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Google Maps URL:</label>
          <input
            type="text"
            value={googleMapUrl}
            onChange={handleGoogleMapUrlChange}
            style={styles.input}
            placeholder="Enter Google Maps URL"
          />
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={handlePostLocation} style={styles.button}>Post Location</button>
        </div>
      </div>

      {/* Location dialog for city and location name */}
      {showDialog && (
        <LocationDialog 
          closeDialog={() => setShowDialog(false)} 
          lat={lat} 
          lng={lng} 
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '86.3vh',
    backgroundColor: '#1e1e2f', // Modern dark background
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
  },
  streetViewContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#292c3e',
    color: '#fff',
    width: '300px',
    marginBottom: '8px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    background: 'purple',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default PreviewLocation;
