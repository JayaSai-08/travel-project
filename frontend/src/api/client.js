/**
 * API Client for Travel Route Backend
 */

const API_BASE = '/api';

export const fetchCities = async () => {
  try {
    const res = await fetch(`${API_BASE}/travel/cities`);
    if (!res.ok) throw new Error('Failed to load cities');
    return await res.json();
  } catch (error) {
    console.warn('API offline, loading default city set:', error);
    return {
      success: true,
      cities: [
        { id: "DEL", name: "Delhi", state: "Delhi NCR", desc: "Capital transit hub" },
        { id: "JAI", name: "Jaipur", state: "Rajasthan", desc: "Pink City via NH48" },
        { id: "AGR", name: "Agra", state: "Uttar Pradesh", desc: "Yamuna Expressway" },
        { id: "LKO", name: "Lucknow", state: "Uttar Pradesh", desc: "Agra-Lucknow Expressway" },
        { id: "UDR", name: "Udaipur", state: "Rajasthan", desc: "Lake City Corridor" },
        { id: "AMD", name: "Ahmedabad", state: "Gujarat", desc: "Western Industrial Hub" },
        { id: "BHO", name: "Bhopal", state: "Madhya Pradesh", desc: "Central Highway Link" },
        { id: "NGP", name: "Nagpur", state: "Maharashtra", desc: "Zero Mile Stone Junction" },
        { id: "SUR", name: "Surat", state: "Gujarat", desc: "Diamond Corridor" },
        { id: "MUM", name: "Mumbai", state: "Maharashtra", desc: "Financial Capital" },
        { id: "PUN", name: "Pune", state: "Maharashtra", desc: "Mumbai-Pune Expressway" },
        { id: "HYD", name: "Hyderabad", state: "Telangana", desc: "NH44 North-South Link" },
        { id: "GOA", name: "Goa (Panaji)", state: "Goa", desc: "Western Ghats Coastal Pass" },
        { id: "BLR", name: "Bengaluru", state: "Karnataka", desc: "Southern Tech Hub" },
        { id: "CHN", name: "Chennai", state: "Tamil Nadu", desc: "Eastern Coastal Terminus" }
      ]
    };
  }
};

export const fetchVehicles = async () => {
  try {
    const res = await fetch(`${API_BASE}/travel/vehicles`);
    if (!res.ok) throw new Error('Failed to load vehicles');
    return await res.json();
  } catch (error) {
    console.warn('API offline, loading default vehicles:', error);
    return {
      success: true,
      vehicles: [
        {
          id: "bus_standard",
          name: "Express Roadway Bus",
          category: "Bus",
          tagline: "Most Affordable Travel",
          badge: "Lowest Price",
          baseFare: 120,
          perKmRate: 1.4,
          capacity: "45 Seats",
          icon: "Bus",
          features: ["Push-back seats", "Punctual halts", "Highway stops"]
        },
        {
          id: "bus_volvo",
          name: "Luxury Multi-Axle Volvo Sleeper",
          category: "Luxury Coach",
          tagline: "Comfortable Overnight Journey",
          badge: "Top Comfort",
          baseFare: 350,
          perKmRate: 2.3,
          capacity: "32 Berths",
          icon: "BedDouble",
          features: ["AC Berths", "WiFi & Charging", "Blanket & Water"]
        },
        {
          id: "shared_shuttle",
          name: "Shared Road Shuttle / Van",
          category: "Van",
          tagline: "Economy Shared Door-to-Door",
          badge: "Value Pick",
          baseFare: 180,
          perKmRate: 2.1,
          capacity: "7-12 Seats",
          icon: "Users",
          features: ["Group travel", "AC Cabin", "Quick highway transit"]
        },
        {
          id: "cab_mini",
          name: "Budget Hatchback Taxi",
          category: "Car",
          tagline: "Private Road Ride for 3-4",
          badge: "Private Budget",
          baseFare: 250,
          perKmRate: 9.5,
          capacity: "4 Seats",
          icon: "Car",
          features: ["Private cab", "On-demand halts", "AC Boot space"]
        },
        {
          id: "cab_sedan",
          name: "Executive Sedan / SUV",
          category: "Car",
          tagline: "Premium Chauffeur Road Drive",
          badge: "Speed & Luxury",
          baseFare: 450,
          perKmRate: 13.0,
          capacity: "4-6 Seats",
          icon: "CarTaxiFront",
          features: ["Top tier comfort", "Express toll fastag", "Extra legroom"]
        },
        {
          id: "bike_tourer",
          name: "Two-Wheeler / Motorbike",
          category: "Bike",
          tagline: "Solo Adventure & No Tolls",
          badge: "Solo Explorer",
          baseFare: 80,
          perKmRate: 3.2,
          capacity: "1-2 Riders",
          icon: "Bike",
          features: ["Zero highway tolls", "Maximum fuel savings", "Helmet included"]
        }
      ]
    };
  }
};

export const calculateRoute = async (payload) => {
  const res = await fetch(`${API_BASE}/travel/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Route calculation failed');
  return data;
};

export const bookTicket = async (payload) => {
  const res = await fetch(`${API_BASE}/travel/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};
