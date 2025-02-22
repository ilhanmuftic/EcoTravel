import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/fetch'; // Make sure to import the fetch function
import "../Recommendations.css";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any errors
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch data on component mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Replace with your actual endpoint for top-locations
        const response = await fetchWithAuth(`${API_URL}/api/top-locations/`);
        console.log(response)
        const data = await response.json()
        console.log('data', data)
  
        setRecommendations(data); // Assuming the response is an array

      } catch (err) {
        console.error(err)
        setError('Failed to fetch recommendations');
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
  
    fetchRecommendations();
    console.log("Recommendations 2: ", recommendations)
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    console.log(recommendations)
  }, [recommendations])

  if (loading) {
    return <div>Loading recommendations...</div>; // You can style this loading state as you like
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }

  return (
    <div className="recommendations-container">
      <h2>Recommendations</h2>
      <ul className="recommendations-list">
        {recommendations.map((rec, index) => (
          <li key={index} className="recommendation-item">
            <h3 className="rec-title">{rec.location_name}</h3>
            <p className="rec-description">{rec.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
