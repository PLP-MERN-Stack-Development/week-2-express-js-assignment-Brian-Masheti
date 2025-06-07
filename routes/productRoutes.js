const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

// Public routes (no auth required)
router.get('/', getAllProducts); // GET /api/products
router.get('/:id', getProductById); // GET /api/products/:id

// Protected routes (require auth)
router.post('/', auth, createProduct); // POST /api/products
router.put('/:id', auth, updateProduct); // PUT /api/products/:id
router.delete('/:id', auth, deleteProduct); // DELETE /api/products/:id

module.exports = router;