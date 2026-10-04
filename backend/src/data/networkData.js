/**
 * Network Dataset for Travel Route
 * Realistic road transit network connecting major cities with distance, highway names, speed, and tolls.
 */

const CITIES = [
  { id: "DEL", name: "Delhi", state: "Delhi NCR", x: 280, y: 70, lat: 28.6139, lng: 77.2090, desc: "Capital hub & major transit gateway" },
  { id: "JAI", name: "Jaipur", state: "Rajasthan", x: 190, y: 150, lat: 26.9124, lng: 75.7873, desc: "Pink City via NH48 Expressway" },
  { id: "AGR", name: "Agra", state: "Uttar Pradesh", x: 330, y: 140, lat: 27.1767, lng: 78.0081, desc: "Taj Gateway via Yamuna Expressway" },
  { id: "LKO", name: "Lucknow", state: "Uttar Pradesh", x: 450, y: 160, lat: 26.8467, lng: 80.9462, desc: "City of Nawabs via Agra-Lucknow Expressway" },
  { id: "UDR", name: "Udaipur", state: "Rajasthan", x: 130, y: 250, lat: 24.5854, lng: 73.7125, desc: "Lake City along Golden Quadrilateral" },
  { id: "AMD", name: "Ahmedabad", state: "Gujarat", x: 110, y: 340, lat: 23.0225, lng: 72.5714, desc: "Commercial hub on NE-1 Expressway" },
  { id: "BHO", name: "Bhopal", state: "Madhya Pradesh", x: 310, y: 260, lat: 23.2599, lng: 77.4126, desc: "Central Highway junction" },
  { id: "NGP", name: "Nagpur", state: "Maharashtra", x: 360, y: 350, lat: 21.1458, lng: 79.0882, desc: "Zero Mile Stone & central crossroads" },
  { id: "SUR", name: "Surat", state: "Gujarat", x: 130, y: 410, lat: 21.1702, lng: 72.8311, desc: "Diamond City on Western Highway" },
  { id: "MUM", name: "Mumbai", state: "Maharashtra", x: 140, y: 490, lat: 19.0760, lng: 72.8777, desc: "Coastal financial capital & port hub" },
  { id: "PUN", name: "Pune", state: "Maharashtra", x: 200, y: 520, lat: 18.5204, lng: 73.8567, desc: "Via Mumbai-Pune 6-Lane Expressway" },
  { id: "HYD", name: "Hyderabad", state: "Telangana", x: 350, y: 530, lat: 17.3850, lng: 78.4867, desc: "Cyber city connected via NH44" },
  { id: "GOA", name: "Goa (Panaji)", state: "Goa", x: 170, y: 640, lat: 15.2993, lng: 74.1240, desc: "Coastal paradise through Western Ghats" },
  { id: "BLR", name: "Bengaluru", state: "Karnataka", x: 280, y: 680, lat: 12.9716, lng: 77.5946, desc: "Silicon Plateau & Southern transit hub" },
  { id: "CHN", name: "Chennai", state: "Tamil Nadu", x: 400, y: 690, lat: 13.0827, lng: 80.2707, desc: "Eastern coastal terminus on Grand Southern Trunk" }
];

const ROAD_SEGMENTS = [
  // Northern Network
  { from: "DEL", to: "JAI", distanceKm: 270, highway: "Delhi-Jaipur Expressway (NH48)", avgSpeedKmph: 75, tollCost: 340, roadType: "Expressway" },
  { from: "DEL", to: "AGR", distanceKm: 210, highway: "Yamuna Expressway", avgSpeedKmph: 90, tollCost: 415, roadType: "Access-Controlled Expressway" },
  { from: "AGR", to: "LKO", distanceKm: 335, highway: "Agra-Lucknow Expressway", avgSpeedKmph: 95, tollCost: 655, roadType: "6-Lane Green Expressway" },
  { from: "AGR", to: "JAI", distanceKm: 240, highway: "Bikaner-Agra Highway (NH21)", avgSpeedKmph: 70, tollCost: 210, roadType: "National Highway" },
  { from: "JAI", to: "UDR", distanceKm: 395, highway: "NH48 (Golden Quadrilateral)", avgSpeedKmph: 75, tollCost: 380, roadType: "4-Lane Highway" },
  { from: "AGR", to: "BHO", distanceKm: 540, highway: "NH44 / MP State Highway", avgSpeedKmph: 65, tollCost: 460, roadType: "National Highway" },
  
  // Central / Western Network
  { from: "UDR", to: "AMD", distanceKm: 260, highway: "NH48 Himatnagar Corridor", avgSpeedKmph: 80, tollCost: 260, roadType: "National Highway" },
  { from: "AMD", to: "SUR", distanceKm: 270, highway: "NE-1 / Vadodara-Surat Highway", avgSpeedKmph: 85, tollCost: 320, roadType: "Expressway" },
  { from: "SUR", to: "MUM", distanceKm: 285, highway: "Western Highway (NH48)", avgSpeedKmph: 70, tollCost: 390, roadType: "6-Lane Highway" },
  { from: "AMD", to: "BHO", distanceKm: 580, highway: "Indore Corridor (NH47)", avgSpeedKmph: 68, tollCost: 440, roadType: "National Highway" },
  { from: "BHO", to: "NGP", distanceKm: 350, highway: "Betul Corridor (NH46)", avgSpeedKmph: 70, tollCost: 290, roadType: "National Highway" },
  
  // Maharashtra & South
  { from: "MUM", to: "PUN", distanceKm: 150, highway: "Mumbai-Pune Expressway", avgSpeedKmph: 90, tollCost: 320, roadType: "Concrete Expressway" },
  { from: "PUN", to: "GOA", distanceKm: 440, highway: "NH48 to NH66 (Ghat Pass)", avgSpeedKmph: 60, tollCost: 280, roadType: "Scenic Mountain Road" },
  { from: "MUM", to: "GOA", distanceKm: 590, highway: "Konkan Coastal Highway (NH66)", avgSpeedKmph: 58, tollCost: 310, roadType: "Coastal Highway" },
  { from: "PUN", to: "HYD", distanceKm: 560, highway: "Solapur-Hyderabad Highway (NH65)", avgSpeedKmph: 75, tollCost: 480, roadType: "4-Lane Highway" },
  { from: "NGP", to: "HYD", distanceKm: 500, highway: "NH44 North-South Corridor", avgSpeedKmph: 80, tollCost: 490, roadType: "National Highway" },
  
  // Deep South
  { from: "PUN", to: "BLR", distanceKm: 840, highway: "NH48 (Kolhapur-Hubli-Bengaluru)", avgSpeedKmph: 80, tollCost: 820, roadType: "Golden Quadrilateral" },
  { from: "GOA", to: "BLR", distanceKm: 560, highway: "Hubli-Chitradurga Highway (NH67/48)", avgSpeedKmph: 65, tollCost: 390, roadType: "National Highway" },
  { from: "HYD", to: "BLR", distanceKm: 570, highway: "Kurnool-Anantapur Expressway (NH44)", avgSpeedKmph: 85, tollCost: 510, roadType: "Expressway" },
  { from: "HYD", to: "CHN", distanceKm: 630, highway: "Vijayawada-Nellore Highway (NH16)", avgSpeedKmph: 75, tollCost: 560, roadType: "Coastal Corridor" },
  { from: "BLR", to: "CHN", distanceKm: 345, highway: "Bengaluru-Chennai Expressway (NE-7)", avgSpeedKmph: 85, tollCost: 360, roadType: "Expressway" }
];

const VEHICLE_CATEGORIES = [
  {
    id: "bus_standard",
    name: "Express Roadway Bus",
    category: "Bus",
    tagline: "Most Affordable Travel",
    badge: "Lowest Price",
    baseFare: 120, // in INR
    perKmRate: 1.4, // in INR/km
    tollMultiplier: 0.25, // Toll shared across passengers
    avgSpeedMultiplier: 0.85,
    capacity: "45 Seats",
    fuelType: "CNG / Diesel BS-VI",
    carbonKgPerKm: 0.03, // per person
    features: ["Luggage storage", "Standard push-back seats", "Punctual schedule", "Highway pitstops"],
    icon: "Bus"
  },
  {
    id: "bus_volvo",
    name: "Luxury Multi-Axle Volvo Sleeper",
    category: "Luxury Coach",
    tagline: "Comfortable Overnight Journey",
    badge: "Top Comfort",
    baseFare: 350,
    perKmRate: 2.3,
    tollMultiplier: 0.35,
    avgSpeedMultiplier: 0.95,
    capacity: "32 Berths",
    fuelType: "Euro-6 Turbo Diesel",
    carbonKgPerKm: 0.045,
    features: ["AC Berths", "Charging ports & WiFi", "Blanket & Water bottle", "Live GPS tracking"],
    icon: "BedDouble"
  },
  {
    id: "shared_shuttle",
    name: "Shared Road Shuttle / Van",
    category: "Van",
    tagline: "Economy Shared Door-to-Door",
    badge: "Value Pick",
    baseFare: 180,
    perKmRate: 2.1,
    tollMultiplier: 0.4,
    avgSpeedMultiplier: 0.9,
    capacity: "7-12 Seats",
    fuelType: "Hybrid CNG",
    carbonKgPerKm: 0.06,
    features: ["Flexible drop points", "Fast highway clearance", "AC Cabin", "Affordable group rates"],
    icon: "Users"
  },
  {
    id: "cab_mini",
    name: "Budget Hatchback Taxi",
    category: "Car",
    tagline: "Private Road Ride for 3-4",
    badge: "Private Budget",
    baseFare: 250,
    perKmRate: 9.5,
    tollMultiplier: 1.0, // Solo/Single-booking pays full toll
    avgSpeedMultiplier: 1.05,
    capacity: "4 Seats",
    fuelType: "Petrol / CNG",
    carbonKgPerKm: 0.12,
    features: ["Private cabin", "On-demand stops", "Music & AC", "Boot luggage space"],
    icon: "Car"
  },
  {
    id: "cab_sedan",
    name: "Executive Sedan / SUV",
    category: "Car",
    tagline: "Premium Chauffeur Road Drive",
    badge: "Speed & Luxury",
    baseFare: 450,
    perKmRate: 13.0,
    tollMultiplier: 1.0,
    avgSpeedMultiplier: 1.15,
    capacity: "4-6 Seats",
    fuelType: "Clean Diesel / Hybrid",
    carbonKgPerKm: 0.16,
    features: ["Top tier comfort", "Express toll tag clearance", "Professional driver", "Spacious legroom"],
    icon: "CarTaxiFront"
  },
  {
    id: "bike_tourer",
    name: "Two-Wheeler / Motorbike",
    category: "Bike",
    tagline: "Solo Adventure & No Tolls",
    badge: "Solo Explorer",
    baseFare: 80,
    perKmRate: 3.2,
    tollMultiplier: 0.0, // Bikes are exempt from most Indian road tolls!
    avgSpeedMultiplier: 0.9,
    capacity: "1-2 Riders",
    fuelType: "Petrol (60 kmpl)",
    carbonKgPerKm: 0.04,
    features: ["Zero toll charges", "Maximum scenic flexibility", "Helmet & gear provided", "Unmatched fuel economy"],
    icon: "Bike"
  }
];

module.exports = {
  CITIES,
  ROAD_SEGMENTS,
  VEHICLE_CATEGORIES
};
