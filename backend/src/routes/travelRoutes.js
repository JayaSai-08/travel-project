const express = require('express');
const router = express.Router();
const {
  getCities,
  getVehicles,
  getNetwork,
  calculateRoute,
  createBooking
} = require('../controllers/travelController');

router.get('/cities', getCities);
router.get('/vehicles', getVehicles);
router.get('/network', getNetwork);
router.post('/calculate', calculateRoute);
router.post('/book', createBooking);

module.exports = router;
