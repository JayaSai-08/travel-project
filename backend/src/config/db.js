const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/travel_route';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500 // Don't hang if MongoDB is offline
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    
    // Seed default demo user if not present
    const User = require('../models/User');
    const existing = await User.findOne({ email: 'traveler@route.com' });
    if (!existing) {
      await User.create({
        name: 'Alex Traveler',
        email: 'traveler@route.com',
        password: 'password123'
      });
      console.log('[Seed] Demo traveler user seeded in MongoDB (traveler@route.com / password123)');
    }
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB (${error.message}).`);
    console.log(`[Database Notice] Operating in High-Performance In-Memory Mode with preloaded roadway network.`);
    isConnected = false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
