import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './Login.css'; // Optional CSS file for styling
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/login', formData, { withCredentials: true });

      // Store the token and user name in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.userName); // Assuming backend sends user's name

      setMessage('Login successful!');
      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Don't have an account?{' '}
        <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
}

export default Login;
