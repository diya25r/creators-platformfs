const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Options for connection (these are default in newer versions but good to specify)
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log connection error and exit the process
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other files
module.exports = connectDB;