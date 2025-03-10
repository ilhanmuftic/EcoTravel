import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Profile dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false); // Bars dropdown

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle profile dropdown
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle bars dropdown
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo and Title */}
      <div className="navbar-title">
        <div className="navbar-icons">
          <FontAwesomeIcon
            icon={faBars}
            className="fa-bars"
            onClick={toggleDropdown}
          />
        </div>
        <a href="/" className="navbar-logo-link">
          <img src="/favicon.ico" alt="Logo" className="navbar-logo" />
          <p className="navbar-name">EcoTravel</p>
        </a>
      </div>

      {/* Dropdown Menu for Bars Icon */}
      {dropdownOpen && (
        <div className="bars-dropdown">
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/">Home Screen</Link></li>
            <li><Link to="/login">Log In</Link></li>

          </ul>
        </div>
      )}

      {/* Center Section: Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/play" className="full-box-link">Play</Link>
        </li>
        <li>
          <Link to="/about" className="full-box-link">About Us</Link>
        </li>
        <li>
          <Link to="/preview" className="full-box-link">Add Location</Link>
        </li>
      </ul>

      {/* Right Section: Profile Dropdown */}
      <div className="navbar-profile" onClick={toggleMenu}>
        <img
          src="/profilepicture.png"
          alt="Profile"
          className="profile-icon"
        />
        {menuOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <img
                src="/profilepicture.png"
                alt="User"
                className="dropdown-profile-picture"
              />
              <div className="dropdown-username">User</div>
            </div>
            <ul className="dropdown-menu">
              <li>
                <Link to="/profile">Account</Link>
              </li>
              <hr />

              <li>
                <Link to="/login">Log In</Link>
              </li>

            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
