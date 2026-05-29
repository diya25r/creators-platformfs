import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Creator Platform
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/create" className="nav-link">Create</Link>
              <button className="nav-link logout-button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
        {isAuthenticated && user && (
          <div className="header-user">Hello, {user.name}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
