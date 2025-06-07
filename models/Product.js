// models/Product.js

const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String, // e.g., 'images/laptop.png'
      default: '',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Prevent model overwrite by checking if model exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;