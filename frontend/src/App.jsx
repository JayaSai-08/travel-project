import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoutePlanner from './components/RoutePlanner';
import RouteMapVisualizer from './components/RouteMapVisualizer';
import VehicleComparison from './components/VehicleComparison';
import WhyChooseUs from './components/WhyChooseUs';
import PopularRoadways from './components/PopularRoadways';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

import { fetchCities, fetchVehicles, calculateRoute } from './api/client';

export default function App() {
  const [cities, setCities] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    origin: 'DEL',
    destination: 'JAI',
    vehicleId: 'bus_standard',
    passengers: 1,
    criterion: 'distance'
  });

  const [routeResult, setRouteResult] = useState(null);
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState(null);

  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('tr_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Load initial data and run first calculation
  useEffect(() => {
    const initApp = async () => {
      try {
        const [cData, vData] = await Promise.all([fetchCities(), fetchVehicles()]);
        if (cData.cities) setCities(cData.cities);
        if (vData.vehicles) setVehicles(vData.vehicles);

        // Perform initial calculation for instant preview
        const initialRes = await calculateRoute({
          origin: 'DEL',
          destination: 'JAI',
          vehicleId: 'bus_standard',
          passengers: 1,
          criterion: 'distance'
        });
        setRouteResult(initialRes);
      } catch (err) {
        console.error('Initialization error:', err);
      }
    };

    initApp();
  }, []);

  const handleCalculate = async (params) => {
    setLoading(true);
    try {
      const res = await calculateRoute(params);
      setRouteResult(res);
      // Scroll smoothly to results
      setTimeout(() => {
        const elem = document.getElementById('results-view');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      alert('Could not calculate route: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTrip = (originId, destId) => {
    const newParams = {
      ...searchParams,
      origin: originId,
      destination: destId
    };
    setSearchParams(newParams);
    handleCalculate(newParams);
  };

  const handleSelectVehicleForBooking = (veh) => {
    setSelectedVehicleForBooking(veh);
    if (!user) {
      // Prompt login or proceed directly
      setIsBookingOpen(true);
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tr_token');
    localStorage.removeItem('tr_user');
    setUser(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Hero with requested Title & Subtitle */}
      <Hero />

      {/* Floating Route Search Planner */}
      <RoutePlanner
        cities={cities}
        vehicles={vehicles}
        onCalculate={handleCalculate}
        loading={loading}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {/* Results View: Map Waypoints & Vehicle Comparisons */}
      <main className="container" id="results-view" style={{ flex: 1 }}>
        {routeResult && (
          <>
            <RouteMapVisualizer
              routeData={routeResult}
              requestedCriterion={searchParams.criterion}
            />

            <VehicleComparison
              vehicles={routeResult.vehicles}
              selectedVehicleId={searchParams.vehicleId}
              onSelectVehicle={handleSelectVehicleForBooking}
            />
          </>
        )}

        {/* Feature section matching 01 why to choose us from reference image */}
        <WhyChooseUs />

        {/* Popular road trips showcase */}
        <PopularRoadways onSelectTrip={handleSelectTrip} />
      </main>

      {/* Dark luxury footer matching reference image */}
      <Footer />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(loggedInUser) => setUser(loggedInUser)}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        vehicle={selectedVehicleForBooking}
        routeData={routeResult}
        user={user}
      />
    </div>
  );
}
