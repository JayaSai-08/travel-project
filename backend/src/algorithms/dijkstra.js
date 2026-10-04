/**
 * Dijkstra's Shortest Path & Multi-Criteria Optimization Engine
 * Calculates:
 * 1. Shortest Distance Path (min kilometers)
 * 2. Lowest Price Path (min fare + tolls)
 * 3. Fastest Path (min travel time)
 */

class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(item, priority) {
    this.elements.push({ item, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift()?.item;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

/**
 * Build Bidirectional Adjacency Graph from Road Segments
 */
function buildGraph(roadSegments) {
  const adjacency = {};

  roadSegments.forEach(segment => {
    const { from, to, distanceKm, highway, avgSpeedKmph, tollCost, roadType } = segment;

    if (!adjacency[from]) adjacency[from] = [];
    if (!adjacency[to]) adjacency[to] = [];

    // Forward direction
    adjacency[from].push({
      to,
      distanceKm,
      highway,
      avgSpeedKmph,
      tollCost,
      roadType
    });

    // Reverse direction (bi-directional roadways)
    adjacency[to].push({
      to: from,
      distanceKm,
      highway,
      avgSpeedKmph,
      tollCost,
      roadType
    });
  });

  return adjacency;
}

/**
 * Calculate weight based on criterion:
 * - 'distance': edge.distanceKm
 * - 'price': (edge.distanceKm * vehicle.perKmRate) + (edge.tollCost * vehicle.tollMultiplier)
 * - 'time': edge.distanceKm / (edge.avgSpeedKmph * vehicle.avgSpeedMultiplier)
 */
function getEdgeWeight(edge, criterion, vehicle) {
  if (criterion === "price") {
    const perKm = vehicle ? vehicle.perKmRate : 1.4;
    const tollMult = vehicle ? vehicle.tollMultiplier : 0.25;
    return (edge.distanceKm * perKm) + (edge.tollCost * tollMult);
  } else if (criterion === "time") {
    const speedMult = vehicle ? vehicle.avgSpeedMultiplier : 1.0;
    const speed = Math.max(edge.avgSpeedKmph * speedMult, 20);
    return edge.distanceKm / speed; // hours
  } else {
    // Default to distance in kilometers
    return edge.distanceKm;
  }
}

/**
 * Dijkstra Solver
 */
function findOptimalRoute(startId, endId, roadSegments, citiesMap, criterion = "distance", vehicle = null) {
  if (startId === endId) {
    const city = citiesMap[startId];
    return {
      success: true,
      criterion,
      path: [city],
      segments: [],
      totalDistanceKm: 0,
      totalDurationHours: 0,
      formattedTime: "0 mins",
      totalToll: 0
    };
  }

  const graph = buildGraph(roadSegments);

  const distances = {};
  const previous = {};
  const edgeDetails = {};
  const pq = new PriorityQueue();

  Object.keys(citiesMap).forEach(cityId => {
    distances[cityId] = Infinity;
    previous[cityId] = null;
  });

  distances[startId] = 0;
  pq.enqueue(startId, 0);

  while (!pq.isEmpty()) {
    const current = pq.dequeue();

    if (current === endId) break;

    const neighbors = graph[current] || [];
    for (const edge of neighbors) {
      const weight = getEdgeWeight(edge, criterion, vehicle);
      const alternate = distances[current] + weight;

      if (alternate < distances[edge.to]) {
        distances[edge.to] = alternate;
        previous[edge.to] = current;
        edgeDetails[edge.to] = edge;
        pq.enqueue(edge.to, alternate);
      }
    }
  }

  // If no path found
  if (distances[endId] === Infinity) {
    return {
      success: false,
      message: `No roadway connection found between ${citiesMap[startId]?.name} and ${citiesMap[endId]?.name}.`
    };
  }

  // Reconstruct path
  const path = [];
  const segments = [];
  let curr = endId;
  let totalDistanceKm = 0;
  let totalDurationHours = 0;
  let totalToll = 0;

  while (curr) {
    path.unshift(citiesMap[curr]);
    const prev = previous[curr];
    if (prev) {
      const edge = edgeDetails[curr];
      const speedMult = vehicle ? vehicle.avgSpeedMultiplier : 1.0;
      const speed = Math.max(edge.avgSpeedKmph * speedMult, 20);
      const segDuration = edge.distanceKm / speed;

      segments.unshift({
        from: citiesMap[prev],
        to: citiesMap[curr],
        highway: edge.highway,
        distanceKm: edge.distanceKm,
        tollCost: edge.tollCost,
        roadType: edge.roadType,
        durationHours: segDuration
      });

      totalDistanceKm += edge.distanceKm;
      totalDurationHours += segDuration;
      totalToll += edge.tollCost;
    }
    curr = prev;
  }

  const hours = Math.floor(totalDurationHours);
  const minutes = Math.round((totalDurationHours - hours) * 60);
  const formattedTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return {
    success: true,
    criterion,
    path,
    segments,
    totalDistanceKm: Math.round(totalDistanceKm),
    totalDurationHours: Number(totalDurationHours.toFixed(2)),
    formattedTime,
    totalToll: Math.round(totalToll)
  };
}

/**
 * Calculate multi-vehicle pricing and breakdown
 */
function calculateVehiclePrices(distanceKm, totalToll, vehicleCategories) {
  return vehicleCategories.map(vehicle => {
    const mileageFare = Math.round(distanceKm * vehicle.perKmRate);
    const tollShare = Math.round(totalToll * vehicle.tollMultiplier);
    const baseFare = vehicle.baseFare;
    const subtotal = baseFare + mileageFare + tollShare;
    
    // 5% standard roadway service tax/cess
    const tax = Math.round(subtotal * 0.05);
    const totalPrice = subtotal + tax;

    const speed = 70 * vehicle.avgSpeedMultiplier;
    const durationHours = distanceKm / speed;
    const hrs = Math.floor(durationHours);
    const mins = Math.round((durationHours - hrs) * 60);

    return {
      vehicleId: vehicle.id,
      name: vehicle.name,
      category: vehicle.category,
      tagline: vehicle.tagline,
      badge: vehicle.badge,
      icon: vehicle.icon,
      capacity: vehicle.capacity,
      fuelType: vehicle.fuelType,
      features: vehicle.features,
      pricingBreakdown: {
        baseFare,
        mileageFare,
        tollShare,
        tax,
        totalPrice
      },
      perKmRate: vehicle.perKmRate,
      estimatedTime: `${hrs}h ${mins}m`,
      carbonFootprintKg: Number((distanceKm * vehicle.carbonKgPerKm).toFixed(1))
    };
  }).sort((a, b) => a.pricingBreakdown.totalPrice - b.pricingBreakdown.totalPrice);
}

module.exports = {
  findOptimalRoute,
  calculateVehiclePrices,
  buildGraph
};
