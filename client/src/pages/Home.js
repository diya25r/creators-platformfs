import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Creator Platform</h1>
        <p>Showcase your creativity and connect with your audience</p>
        <div className="hero-buttons">
          <Link to="/create" className="btn btn-primary">Create Post</Link>
          <Link to="/register" className="btn btn-secondary">Get Started</Link>
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
