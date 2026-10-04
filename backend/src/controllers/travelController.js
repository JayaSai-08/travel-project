const { CITIES, ROAD_SEGMENTS, VEHICLE_CATEGORIES } = require('../data/networkData');
const { findOptimalRoute, calculateVehiclePrices } = require('../algorithms/dijkstra');

// Fast lookup map for cities
const CITIES_MAP = CITIES.reduce((acc, city) => {
  acc[city.id] = city;
  return acc;
}, {});

// In-memory bookings store
const bookings = [];

exports.getCities = (req, res) => {
  res.json({
    success: true,
    total: CITIES.length,
    cities: CITIES
  });
};

exports.getVehicles = (req, res) => {
  res.json({
    success: true,
    total: VEHICLE_CATEGORIES.length,
    vehicles: VEHICLE_CATEGORIES
  });
};

exports.getNetwork = (req, res) => {
  res.json({
    success: true,
    cities: CITIES,
    segments: ROAD_SEGMENTS
  });
};

exports.calculateRoute = (req, res) => {
  try {
    const { origin, destination, criterion = 'distance', vehicleId = 'bus_standard', passengers = 1 } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Origin and Destination city IDs are required (e.g., origin: "DEL", destination: "MUM")'
      });
    }

    if (!CITIES_MAP[origin] || !CITIES_MAP[destination]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid origin or destination ID.'
      });
    }

    const selectedVehicle = VEHICLE_CATEGORIES.find(v => v.id === vehicleId) || VEHICLE_CATEGORIES[0];

    // 1. Solve for requested criterion
    const primaryRoute = findOptimalRoute(origin, destination, ROAD_SEGMENTS, CITIES_MAP, criterion, selectedVehicle);

    if (!primaryRoute.success) {
      return res.status(404).json(primaryRoute);
    }

    // 2. Also solve for Shortest Distance and Lowest Price routes for comparison
    const shortestRoute = findOptimalRoute(origin, destination, ROAD_SEGMENTS, CITIES_MAP, 'distance', selectedVehicle);
    const cheapestRoute = findOptimalRoute(origin, destination, ROAD_SEGMENTS, CITIES_MAP, 'price', selectedVehicle);
    const fastestRoute = findOptimalRoute(origin, destination, ROAD_SEGMENTS, CITIES_MAP, 'time', selectedVehicle);

    // 3. Calculate dynamic vehicle pricing breakdown for the selected route
    const vehicleComparisons = calculateVehiclePrices(
      primaryRoute.totalDistanceKm,
      primaryRoute.totalToll,
      VEHICLE_CATEGORIES
    );

    // Filter or adjust for passenger count
    const numPassengers = Math.max(1, parseInt(passengers) || 1);
    const passengerAdjustedVehicles = vehicleComparisons.map(v => {
      // In buses and shuttles, fare is multiplied by passengers. In private cars/taxis, fare is for the whole vehicle!
      const isPerSeat = v.category === 'Bus' || v.category === 'Luxury Coach' || v.category === 'Van';
      const seatMultiplier = isPerSeat ? numPassengers : 1;
      const subtotal = (v.pricingBreakdown.baseFare * seatMultiplier) + 
                       (v.pricingBreakdown.mileageFare * seatMultiplier) + 
                       v.pricingBreakdown.tollShare;
      const tax = Math.round(subtotal * 0.05);
      const total = subtotal + tax;

      return {
        ...v,
        passengerCount: numPassengers,
        isPerSeatFare: isPerSeat,
        adjustedTotalPrice: total,
        perPersonShare: isPerSeat ? Math.round(total / numPassengers) : Math.round(total / numPassengers)
      };
    });

    res.json({
      success: true,
      origin: CITIES_MAP[origin],
      destination: CITIES_MAP[destination],
      requestedCriterion: criterion,
      selectedVehicle,
      primaryRoute,
      comparison: {
        shortestDistance: {
          distanceKm: shortestRoute.totalDistanceKm,
          time: shortestRoute.formattedTime,
          path: shortestRoute.path.map(p => p.name).join(' → ')
        },
        cheapestFare: {
          distanceKm: cheapestRoute.totalDistanceKm,
          time: cheapestRoute.formattedTime,
          toll: cheapestRoute.totalToll,
          path: cheapestRoute.path.map(p => p.name).join(' → ')
        },
        fastestETA: {
          distanceKm: fastestRoute.totalDistanceKm,
          time: fastestRoute.formattedTime,
          path: fastestRoute.path.map(p => p.name).join(' → ')
        }
      },
      vehicles: passengerAdjustedVehicles
    });
  } catch (error) {
    console.error('Route calculation error:', error);
    res.status(500).json({ success: false, message: 'Internal error while calculating route' });
  }
};

exports.createBooking = (req, res) => {
  try {
    const { origin, destination, vehicleId, distanceKm, totalFare, passengerName, passengerPhone, travelDate } = req.body;

    if (!origin || !destination || !vehicleId || !passengerName) {
      return res.status(400).json({ success: false, message: 'Missing booking parameters' });
    }

    const bookingId = `TR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      bookingId,
      origin,
      destination,
      vehicleId,
      distanceKm,
      totalFare,
      passengerName,
      passengerPhone: passengerPhone || '+91 98765 43210',
      travelDate: travelDate || new Date().toISOString().split('T')[0],
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    res.status(201).json({
      success: true,
      message: 'Road travel ticket booked successfully!',
      booking: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Booking processing error' });
  }
};
