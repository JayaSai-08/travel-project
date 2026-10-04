import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  ArrowRightLeft, 
  SlidersHorizontal, 
  Users, 
  Search, 
  Clock, 
  DollarSign, 
  Milestone,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function RoutePlanner({ 
  cities, 
  vehicles, 
  onCalculate, 
  loading,
  searchParams,
  setSearchParams
}) {
  const [criterion, setCriterion] = useState(searchParams.criterion || 'distance');

  const handleSwap = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({ ...searchParams, criterion });
  };

  return (
    <div id="planner" style={{ marginTop: '-4.5rem', position: 'relative', zIndex: 30, padding: '0 1rem' }}>
      <div className="planner-card">
        {/* Route Criterion Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="tab-selector" style={{ margin: 0 }}>
            <button
              type="button"
              className={`tab-btn ${criterion === 'distance' ? 'active' : ''}`}
              onClick={() => { setCriterion('distance'); setSearchParams(p => ({ ...p, criterion: 'distance' })); }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Milestone size={16} />
                <span>Shortest Path (Min Km)</span>
              </div>
            </button>
            <button
              type="button"
              className={`tab-btn ${criterion === 'price' ? 'active' : ''}`}
              onClick={() => { setCriterion('price'); setSearchParams(p => ({ ...p, criterion: 'price' })); }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <DollarSign size={16} color="#059669" />
                <span>Lowest Price (Affordable)</span>
              </div>
            </button>
            <button
              type="button"
              className={`tab-btn ${criterion === 'time' ? 'active' : ''}`}
              onClick={() => { setCriterion('time'); setSearchParams(p => ({ ...p, criterion: 'time' })); }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} />
                <span>Fastest Time (Expressway)</span>
              </div>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
            <Sparkles size={14} color="#0284c7" />
            <span>Algorithm: <strong>Dijkstra Graph Pathfinding</strong></span>
          </div>
        </div>

        {/* Input Form Grid */}
        <form onSubmit={handleSubmit}>
          <div className="search-grid">
            {/* Origin City */}
            <div className="form-group">
              <label className="form-label">
                <MapPin size={14} color="#0284c7" />
                <span>Starting Point</span>
              </label>
              <select
                className="form-select"
                value={searchParams.origin}
                onChange={(e) => setSearchParams(prev => ({ ...prev, origin: e.target.value }))}
                required
              >
                {cities.map(c => (
                  <option key={c.id} value={c.id} disabled={c.id === searchParams.destination}>
                    {c.name} ({c.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '0.25rem' }}>
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Origin & Destination"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: '1.5px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7',
                  transition: 'all 0.2s ease'
                }}
              >
                <ArrowRightLeft size={18} />
              </button>
            </div>

            {/* Destination City */}
            <div className="form-group">
              <label className="form-label">
                <Navigation size={14} color="#e11d48" />
                <span>Destination</span>
              </label>
              <select
                className="form-select"
                value={searchParams.destination}
                onChange={(e) => setSearchParams(prev => ({ ...prev, destination: e.target.value }))}
                required
              >
                {cities.map(c => (
                  <option key={c.id} value={c.id} disabled={c.id === searchParams.origin}>
                    {c.name} ({c.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Vehicle */}
            <div className="form-group">
              <label className="form-label">
                <SlidersHorizontal size={14} />
                <span>Road Vehicle Class</span>
              </label>
              <select
                className="form-select"
                value={searchParams.vehicleId}
                onChange={(e) => setSearchParams(prev => ({ ...prev, vehicleId: e.target.value }))}
              >
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.category}) - ₹{v.perKmRate}/km
                  </option>
                ))}
              </select>
            </div>

            {/* Passengers */}
            <div className="form-group">
              <label className="form-label">
                <Users size={14} />
                <span>Travelers</span>
              </label>
              <select
                className="form-select"
                value={searchParams.passengers}
                onChange={(e) => setSearchParams(prev => ({ ...prev, passengers: Number(e.target.value) }))}
              >
                {[1, 2, 3, 4, 5, 6, 8, 12].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>

            {/* Search Submit Button */}
            <div>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                <Search size={18} />
                <span>{loading ? 'Finding Path...' : 'Find Route & Prices'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
