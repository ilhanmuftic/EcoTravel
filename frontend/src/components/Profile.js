import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Profile.css";
import Navbar from './Navbar';
import { fetchWithAuth } from '../utils/fetch';

const Profile = () => {
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any errors
  const API_URL = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({});

  // Fetch data on component mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Replace with your actual endpoint for top-locations
        const response = await fetchWithAuth(`${API_URL}/api/user-profile/`);
        console.log(response)
        const data = await response.json()
        console.log('data', data)

        setUser(data); // Assuming the response is an array

      } catch (err) {
        console.error(err)
        setError('Failed to fetch recommendations');
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchRecommendations();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    console.log(user)
  }, [user])

  if (loading) {
    return <div>Loading user profile...</div>; // You can style this loading state as you like
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }


  return (
    <div className="profile-main">
      <Navbar />
      <section className="profile-container">
        {/* Left Section: Sidebar with Profile */}
        <div className="profile-sidebar">
          <div className="profile-header">
            <img
              src="profilepicture.png"
              alt="Profile"
              className="profile-picture"
            />
            <div className="username-section">
              <div className="username">{user.username}</div>
            </div>
          </div>

          {/* <div className="profile-links">
            <Link to="/account" className="profile-link">Account</Link>
          </div> */}
        </div>

        {/* Right Section: Account Details */}
        <div className="profile-details">
          <h2>Account Details</h2>
          <div className="detail-section">
            <div className="detail-item">
              <div className="detail-label">Email:</div>
              <div className="detail-value">{user.username}@example.com</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Username:</div>
              <div className="detail-value">{user.username}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Score:</div>
              <div className="detail-value">{user.score}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
