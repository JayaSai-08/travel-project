require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const travelRoutes = require('./routes/travelRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Database connection (with automatic fallback to in-memory)
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/travel', travelRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    project: 'Travel Route API',
    tagline: 'Find your way with affordable prices',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint info
app.get('/', (req, res) => {
  res.json({
    service: 'Travel Route - Shortest Path & Lowest Roadway Price Finder',
    endpoints: [
      'GET /api/travel/cities',
      'GET /api/travel/vehicles',
      'GET /api/travel/network',
      'POST /api/travel/calculate',
      'POST /api/travel/book',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` 🚗 Travel Route Server running on http://localhost:${PORT}`);
  console.log(` Tagline: "Find your way with affordable prices"`);
  console.log(` Algorithms: Dijkstra (Shortest Path & Lowest Fare)`);
  console.log(`====================================================`);
});
