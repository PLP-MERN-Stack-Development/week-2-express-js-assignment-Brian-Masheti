const Product = require('../models/product');

const seedProducts = async () => {
    try {
    // Check if products already exist to avoid duplicates
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('Products already seeded, skipping...');
      return;
    }

    // Default products from instructor's in-memory array
    const defaultProducts = [
      {
        name: 'Laptop',
        description: 'High-performance laptop with 16GB RAM',
        price: 1200,
        category: 'electronics',
        inStock: true,
        image: '../images/laptop.jpg',
      },
      {
        name: 'Smartphone',
        description: 'Latest model with 128GB storage',
        price: 800,
        category: 'electronics',
        inStock: true,
        image: '../images/smartphone.jpg',
      },
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with timer',
        price: 50,
        category: 'kitchen',
        inStock: false,
        image: '../images/coffee-maker.jpg',
      },
    ];

    await Product.insertMany(defaultProducts);
    console.log('Default products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error.message);
  }
};

module.exports = seedProducts;