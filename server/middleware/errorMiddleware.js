// Global error handling middleware for Express.
// It ensures that all errors are returned in a consistent format.
const errorHandler = (err, req, res, next) => {
  console.error('Error middleware caught:', err.message || err);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
