import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Optional CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // New field for password confirmation
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true); // Set loading state

    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      setMessage(response.data.message); // Assuming the backend returns a message
      // Optionally store token or user info in localStorage/sessionStorage
      // localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Already have an account?{' '}
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
