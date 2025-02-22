import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/fetch'; // Ensure the fetch function is correctly imported
import "../Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]); // State to hold leaderboard data
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To handle errors
  const API_URL = process.env.REACT_APP_API_URL;

  // This useEffect only runs once on initial component mount
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetchWithAuth(`${API_URL}/api/leaderboard/`);

        const data = await response.json();
        // Check if data is valid and update state only if the data is new
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data); // Set the leaderboard data into state if it's an array
        } else {
          setError('No valid leaderboard data found');
        }
      } catch (err) {
        setError('Error fetching leaderboard');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      }
    };

    fetchLeaderboard(); // Trigger the fetch on mount
  }, []); // Empty array ensures this runs only once when the component mounts

  useEffect(() => {
    console.log("users", users)
  }, [users])

  if (loading) {
    return <div>Loading leaderboard...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error message if fetching fails
  }

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <ul className="leaderboard-list">
        {users.map((user, index) => (
          <li key={index} className="leaderboard-item">
            <span className="rank">#{index + 1}</span>
            <span className="username">{user.username}</span>
            <span className="score">{user.total_score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
