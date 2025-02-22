import React from 'react';
import { Link } from 'react-router-dom';
import "../Profile.css";
import Navbar from './Navbar';

const Profile = () => {
  return (
    <div className = "profile-main">
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
            <div className="username">Otorina</div>
          </div>
        </div>
        
        <div className="profile-links">
          <Link to="/account" className="profile-link">Account</Link>
          <Link to="/settings" className="profile-link">Settings</Link>
          <Link to="/login" className="profile-link">Log In</Link>

        </div>
      </div>
      
      {/* Right Section: Account Details */}
      <div className="profile-details">
        <h2>Account Details</h2>
        <div className="detail-section">
          <div className="detail-item">
            <div className="detail-label">Email:</div>
            <div className="detail-value">otorina@example.com</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Username:</div>
            <div className="detail-value">Otorina</div>
          </div>
          {/* Add more account details here as necessary */}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Profile;
