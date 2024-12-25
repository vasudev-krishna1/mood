import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar

const Navbar = () => {
  const [user, setUser] = useState(null); // Track the user
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decoding JWT to extract user info (simplified for demo)
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // decode JWT payload (simplified)
        if (decodedToken && decodedToken.username) {
          setUser({ displayName: decodedToken.username });
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        // Optionally remove invalid token if decoding fails
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setUser(null);
    navigate('/'); // Redirect to home or login page
  };

  return (
    <nav className="navbar">
      <h1>Mental Health Journal</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>

        {user ? (
          <>
            <span>Hello, {user.displayName}</span> {/* Display user's name */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/signup')}>Signup</button>
            <button onClick={() => navigate('/login')}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
