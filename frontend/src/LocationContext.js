// LocationContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { getRandomLocation } from "./utils/randomLocation";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [isLocationFetched, setIsLocationFetched] = useState(false);

  const fetchLocation = async () => {
    if (!isLocationFetched) {
      try {
        const randomLocation = await getRandomLocation();
        setLocation(randomLocation);
        setIsLocationFetched(true); // Mark location as fetched
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    }
  };

  return (
    <LocationContext.Provider value={{ location, fetchLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
