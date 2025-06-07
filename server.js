const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const seedProducts = require('./config/seed');
const logger = require('./middleware/loggerMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('MONGO_URI:', process.env.MONGO_URI); // Debug log

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and seed default products
connectDB().then(() => {
  console.log('🎉 Successfully connected to MongoDB!');
  return seedProducts();
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error.message);
  process.exit(1);
});

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images
app.use(logger); // Log all requests

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes); // Auth moved to productRoutes.js

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Custom error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});