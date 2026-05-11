const express = require('express');
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Route to register a new user
// POST /api/users/register
router.post('/register', registerUser);

// Route to get all users
// GET /api/users
router.get('/', getAllUsers);

// Route to get a user by ID
// GET /api/users/:id
router.get('/:id', getUserById);

// Route to update a user by ID
// PUT /api/users/:id
router.put('/:id', updateUser);

// Route to delete a user by ID
// DELETE /api/users/:id
router.delete('/:id', deleteUser);

// Export the router
module.exports = router;