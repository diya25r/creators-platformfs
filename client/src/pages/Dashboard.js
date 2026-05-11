import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Mock user data - in real app, this would come from API/context
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    projects: 5,
    followers: 120
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Welcome back, {user.name}!</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{user.projects}</h3>
            <p>Projects</p>
          </div>
          <div className="stat-card">
            <h3>{user.followers}</h3>
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