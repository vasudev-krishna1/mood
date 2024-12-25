import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Signup from './auth/signup';
import Login from './auth/login';
import './App.css'; // Import global styles

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;