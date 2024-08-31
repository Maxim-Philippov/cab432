import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/navbar.css';

const Navbar = ({ isAuthenticated, handleSignout }) => {
  const navigate = useNavigate();
  const isSignedIn = !!localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/'); 
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Centered Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isSignedIn && (
            <>
              <li>
                <Link to="/my-videos">My Videos</Link>
              </li>
              <li>
                <Link to="/transcoding-settings">Settings</Link>
              </li>
            </>
          )}
        </ul>

        {/* Right-Aligned Buttons */}
        <div className="navbar-auth">
          {isSignedIn ? (
            <button className="auth-button" onClick={handleLogout}>
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/login" className="auth-button">
                Login
              </Link>
              <Link to="/register" className="auth-button">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;