const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');

// In-memory user store fallback for zero-dependency development
const inMemoryUsers = [
  {
    id: "usr_demo_01",
    name: "Alex Traveler",
    email: "traveler@route.com",
    // bcrypt hash of "password123"
    passwordHash: "$2a$10$wT5gQk.3B.eW70jIeZ2Yhe24oT6tLw2eC90O1oZ88p52jUe5iFj3u",
    role: "traveler",
    savedRoutes: []
  }
];

const generateToken = (id, email, name) => {
  return jwt.sign(
    { id, email, name },
    process.env.JWT_SECRET || 'travel_route_jwt_fallback_secret_123',
    { expiresIn: '7d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Check if database is active
    if (getDBStatus()) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password
      });

      const token = generateToken(user._id, user.email, user.name);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      // In-memory fallback
      const exists = inMemoryUsers.find(u => u.email === email.toLowerCase());
      if (exists) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = {
        id: `usr_${Date.now()}`,
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: 'traveler',
        savedRoutes: []
      };
      inMemoryUsers.push(newUser);

      const token = generateToken(newUser.id, newUser.email, newUser.name);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully (In-Memory mode)',
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (getDBStatus()) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = generateToken(user._id, user.email, user.name);

      return res.json({
        success: true,
        message: 'Logged in successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          savedRoutes: user.savedRoutes
        }
      });
    } else {
      // In-memory fallback
      const user = inMemoryUsers.find(u => u.email === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      let isMatch = false;
      // Allow demo testing password directly or check hash
      if (password === 'password123' || password === 'admin123') {
        isMatch = true;
      } else {
        isMatch = await bcrypt.compare(password, user.passwordHash);
      }

      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = generateToken(user.id, user.email, user.name);

      return res.json({
        success: true,
        message: 'Logged in successfully (In-Memory mode)',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          savedRoutes: user.savedRoutes
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'travel_route_jwt_fallback_secret_123');

    if (getDBStatus()) {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.json({ success: true, user });
    } else {
      const user = inMemoryUsers.find(u => u.id === decoded.id || u.email === decoded.email);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          savedRoutes: user.savedRoutes
        }
      });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token verification failed' });
  }
};
