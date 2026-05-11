import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2026 Creator Platform. All rights reserved.</p>
        <nav className="footer-nav">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/login" className="footer-link">Login</Link>
          <Link to="/register" className="footer-link">Register</Link>
          <Link to="/dashboard" className="footer-link">Dashboard</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;