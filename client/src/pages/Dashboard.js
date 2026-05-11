import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Welcome back, {user.name}!</h2>
        <p className="dashboard-email">{user.email}</p>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>5</h3>
            <p>Projects</p>
          </div>
          <div className="stat-card">
            <h3>120</h3>
            <p>Followers</p>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Create New Project</button>
          <button className="btn btn-secondary">View Analytics</button>
        </div>
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <ul>
            <li>Published new project: "My Latest Creation"</li>
            <li>Gained 5 new followers</li>
            <li>Updated profile information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;