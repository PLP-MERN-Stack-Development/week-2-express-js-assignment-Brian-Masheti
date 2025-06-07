const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('\x1b[36m%s\x1b[0m', `🎉 Successfully connected to MongoDB!`);
        console.log(`   Host: ${conn.connection.host}`);
        console.log(`   Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;