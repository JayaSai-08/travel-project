import React, { useState } from 'react';
import { 
  Bus, 
  BedDouble, 
  Users, 
  Car, 
  CarTaxiFront, 
  Bike, 
  Check, 
  Fuel, 
  Leaf, 
  ArrowRight,
  Info
} from 'lucide-react';

const ICON_MAP = {
  Bus: Bus,
  BedDouble: BedDouble,
  Users: Users,
  Car: Car,
  CarTaxiFront: CarTaxiFront,
  Bike: Bike
};

export default function VehicleComparison({ vehicles, onSelectVehicle, selectedVehicleId }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!vehicles || vehicles.length === 0) return null;

  return (
    <div id="vehicles" style={{ marginTop: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="section-meta-number">02</div>
        <h2 className="section-header-title">
          Roadway Vehicles &amp; Low Price Comparison
        </h2>
        <p className="section-subtitle">
          Transparent roadway pricing for every travel budget. Select your preferred vehicle class.
        </p>
      </div>

      <div className="vehicle-grid">
        {vehicles.map((v, index) => {
          const IconComp = ICON_MAP[v.icon] || Car;
          const isSelected = selectedVehicleId === v.vehicleId;
          const isLowestPrice = index === 0; // sorted by lowest price in backend
          const isExpanded = expandedId === v.vehicleId;

          return (
            <div
              key={v.vehicleId}
              className={`vehicle-card ${isLowestPrice ? 'recommended' : ''}`}
              style={{
                borderWidth: isSelected ? '2px' : '1.5px',
                borderColor: isSelected ? '#0284c7' : isLowestPrice ? '#059669' : '#e2e8f0',
                background: isSelected ? '#f0f9ff' : '#ffffff'
              }}
            >
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className={`pill-badge ${isLowestPrice ? 'badge-emerald' : 'badge-blue'}`}>
                  {isLowestPrice ? '★ Lowest Road Fare' : v.badge}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  {v.capacity}
                </span>
              </div>

              {/* Vehicle Identity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: isLowestPrice ? '#ecfdf5' : '#f0f9ff',
                  color: isLowestPrice ? '#059669' : '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComp size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    {v.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {v.tagline}
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div style={{
                background: '#f8fafc',
                padding: '0.85rem 1rem',
                borderRadius: '0.75rem',
                margin: '0.75rem 0',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                      {v.isPerSeatFare ? 'Fare per passenger' : 'Total Vehicle Fare'}
                    </span>
                    <div className="price-tag">
                      ₹{v.adjustedTotalPrice || v.pricingBreakdown.totalPrice}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Rate</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0284c7' }}>
                      ₹{v.perKmRate}/km
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#64748b'
                }}>
                  <span>Est. Travel Time: <strong>{v.estimatedTime}</strong></span>
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : v.vehicleId)}
                    style={{ color: '#0284c7', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    <Info size={12} />
                    {isExpanded ? 'Hide Fare Details' : 'Fare Breakdown'}
                  </button>
                </div>

                {/* Expanded Fare Breakdown Details */}
                {isExpanded && (
                  <div style={{
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #e2e8f0',
                    fontSize: '0.75rem',
                    color: '#475569'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Base Flag-down Fare:</span>
                      <span>₹{v.pricingBreakdown.baseFare}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Road Mileage Fare:</span>
                      <span>₹{v.pricingBreakdown.mileageFare}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Highway Toll Share:</span>
                      <span>₹{v.pricingBreakdown.tollShare}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>State Roadway Cess &amp; GST (5%):</span>
                      <span>₹{v.pricingBreakdown.tax}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Features */}
              <ul style={{ listStyle: 'none', margin: '0.75rem 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {v.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#475569' }}>
                    <Check size={14} color="#059669" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Fuel & Eco Details */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#64748b',
                marginBottom: '1rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid #f1f5f9'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Fuel size={13} /> {v.fuelType}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Leaf size={13} color="#059669" /> {v.carbonFootprintKg} kg CO₂
                </span>
              </div>

              {/* Book Button */}
              <button
                type="button"
                className="btn-primary"
                onClick={() => onSelectVehicle(v)}
                style={{
                  width: '100%',
                  background: isLowestPrice 
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
                    : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                }}
              >
                <span>Select &amp; Book Road Ride</span>
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
