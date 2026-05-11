const express = require('express');
const router = express.Router();

// This route is intentionally built to demonstrate backend error handling.
router.get('/test-error', (req, res, next) => {
  const error = new Error('Intentional test error for full-stack error handling');
  error.status = 500;
  next(error);
});

module.exports = router;
