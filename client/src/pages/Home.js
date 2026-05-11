import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Creator Platform</h1>
        <p>Showcase your creativity and connect with your audience</p>
        <div className="hero-buttons">
          <a href="/register" className="btn btn-primary">Get Started</a>
          <a href="/login" className="btn btn-secondary">Login</a>
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Create</h3>
          <p>Share your creative work with the world</p>
        </div>
        <div className="feature">
          <h3>Connect</h3>
          <p>Build relationships with your audience</p>
        </div>
        <div className="feature">
          <h3>Grow</h3>
          <p>Expand your reach and impact</p>
        </div>
      </div>
    </div>
  );
};

export default Home;