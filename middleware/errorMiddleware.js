// middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: Object.values(err.errors).map(e => e.message) });
  }

  // Handle invalid MongoDB ID errors
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  // Default to 500 for other errors
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;