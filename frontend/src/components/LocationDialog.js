import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importing toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for toast notifications

const LocationDialog = ({ closeDialog, lat, lng }) => {
  const [cityName, setCityName] = useState('');
  const [locationName, setLocationName] = useState('');

  const handlePostLocation = async () => {
    if (!cityName || !locationName) {
      toast.error('Please provide both city and location name.'); // Show error toast if required fields are missing
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL;
    const payload = { lat, lng, city: cityName, name: locationName };

    try {
      const response = await fetch(`${apiUrl}/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Location posted successfully!'); // Success toast
      } else {
        const errorData = await response.json(); // Extract the error data from the response
        const errorMessage = errorData.error || 'Failed to post location'; // Default error message if no specific message is provided
        toast.error(`Error: ${errorMessage}`); // Show specific error message from response
      }
    } catch (error) {
      console.error('Error posting location:', error);
      toast.error('Error posting location'); // Generic error message in case of network or other issues
    }

    closeDialog(); // Close the dialog after posting
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3 style={styles.header}>Enter City and Location Name</h3>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>City Name:</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            style={styles.input}
            placeholder="Enter city name"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Location Name:</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            style={styles.input}
            placeholder="Enter location name"
          />
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={handlePostLocation} style={styles.button}>Post Location</button>
          <button onClick={closeDialog} style={styles.button}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: '#292c3e',
    padding: '20px',
    borderRadius: '8px',
    color: '#fff',
    width: '300px',
    textAlign: 'center',
  },
  header: {
    fontSize: '20px',
    marginBottom: '15px',
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
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    background: 'purple',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default LocationDialog;
