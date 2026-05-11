// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Routes
// Mount auth routes at /api/auth
app.use('/api/auth', authRoutes);

// Mount user routes at /api/users
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running and healthy',
    timestamp: new Date().toISOString()
  });
});

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});