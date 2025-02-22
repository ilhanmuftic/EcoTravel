// src/utils/randomLocation.js

export const getRandomLocation = async () => {
  try {
    // Fetch locations from the server
    const response = await fetch(`${process.env.REACT_APP_API_URL}/random-location`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const randomLocation = await response.json();

    console.log("Random location", randomLocation, randomLocation.lat, randomLocation.lng);
    return randomLocation;
  } catch (error) {
    console.error("Error fetching random location:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
