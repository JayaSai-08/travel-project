const mongoose = require('mongoose');

const cityNodeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  x: Number,
  y: Number,
  lat: Number,
  lng: Number,
  desc: String
});

const roadSegmentSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  highway: { type: String, required: true },
  avgSpeedKmph: { type: Number, default: 70 },
  tollCost: { type: Number, default: 0 },
  roadType: { type: String, default: 'National Highway' }
});

const vehicleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  baseFare: { type: Number, required: true },
  perKmRate: { type: Number, required: true },
  tollMultiplier: { type: Number, default: 1 },
  avgSpeedMultiplier: { type: Number, default: 1 }
});

const CityNode = mongoose.models.CityNode || mongoose.model('CityNode', cityNodeSchema);
const RoadSegment = mongoose.models.RoadSegment || mongoose.model('RoadSegment', roadSegmentSchema);
const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

module.exports = { CityNode, RoadSegment, Vehicle };
