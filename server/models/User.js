const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  // Name field: required, must be a string, minimum length of 2 characters
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long']
  },
  // Email field: required, unique, converted to lowercase, must be a valid email
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        // Simple email regex validation
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  // Password field: required, minimum 6 characters, not selected by default for security
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // This prevents password from being returned in queries by default
  }
}, {
  // Enable timestamps: automatically adds createdAt and updatedAt fields
  timestamps: true
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;