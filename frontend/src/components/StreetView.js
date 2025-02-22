import React, { useEffect, useState, useRef } from "react";

const StreetView = ({ lat, lng }) => {
  const streetViewRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [hasStreetView, setHasStreetView] = useState(true);

  // Load the Google Maps API dynamically
  const loadGoogleMaps = () => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCTl6fgEoM8gSgN71VtHXBOyoqWI8mlYDw&libraries=places,geometry,visualization`;
      script.async = true;
      script.defer = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (loaded && window.google && streetViewRef.current) {
      const streetViewService = new window.google.maps.StreetViewService();

      streetViewService.getPanorama({ location: { lat, lng }, radius: 50 }, (data, status) => {
        if (status === window.google.maps.StreetViewStatus.OK) {
          const panorama = new window.google.maps.StreetViewPanorama(streetViewRef.current, {
            position: { lat, lng },
            pov: { heading: 34, pitch: 10 },
            zoom: 1,
            // Disable default UI elements like the copyright, zoom, and controls
            disableDefaultUI: true,  // Removes all default UI controls
            linksControl: false,     // Removes links to Google Maps
            panControl: false,       // Removes pan control
            zoomControl: false,      // Removes zoom control
            fullscreenControl: false, // Removes fullscreen control
            showRoadLabels: false,   // Hide road labels (optional)
            addressControl: false,   // Hide address info
          });
          setHasStreetView(true);
        } else {
          setHasStreetView(false);
        }
      });
    }
  }, [loaded, lat, lng]);

  if (!loaded) {
    return <div>Loading Google Maps...</div>;
  }

  if (!hasStreetView) {
    return <div>No Street View available at this location.</div>;
  }


  return <div ref={streetViewRef} style={{ width: "100%", height: "500px" }} />;
};

export default StreetView;
