import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

const POPULAR_TRIPS = [
  {
    title: "Mumbai to Goa Coastal Drive",
    highway: "NH 66 Konkan Coastal Highway",
    originId: "MUM",
    destId: "GOA",
    distance: "590 km",
    duration: "10h 15m",
    startingFare: "₹945",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    badge: "Scenic Western Ghats"
  },
  {
    title: "Delhi to Agra Expressway",
    highway: "Yamuna 6-Lane Concrete Expressway",
    originId: "DEL",
    destId: "AGR",
    distance: "210 km",
    duration: "2h 20m",
    startingFare: "₹415",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    badge: "Fastest Speed Track"
  },
  {
    title: "Bengaluru to Chennai Corridor",
    highway: "NE-7 Express Highway",
    originId: "BLR",
    destId: "CHN",
    distance: "345 km",
    duration: "4h 05m",
    startingFare: "₹605",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    badge: "Southern Business Route"
  }
];

export default function PopularRoadways({ onSelectTrip }) {
  return (
    <section id="popular" style={{ padding: '4rem 0', background: '#f1f5f9' }}>
      <div className="container">
        <div className="section-meta-number">03</div>
        <h2 className="section-header-title">
          Popular Roadway Corridors
        </h2>
        <p className="section-subtitle">
          Explore iconic roadway routes optimized for lowest fares and seamless highway travel.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {POPULAR_TRIPS.map((trip, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease'
              }}
            >
              {/* Image with overlay badge */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={trip.image}
                  alt={trip.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {trip.badge}
                </span>
                <span style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: '#059669',
                  color: '#ffffff',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}>
                  From {trip.startingFare}
                </span>
              </div>

              {/* Card Details */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                    {trip.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600, marginBottom: '0.75rem' }}>
                    🛣️ {trip.highway}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                    <span>Distance: <strong>{trip.distance}</strong></span>
                    <span>•</span>
                    <span>Avg Time: <strong>{trip.duration}</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTrip(trip.originId, trip.destId)}
                  className="btn-primary"
                  style={{ marginTop: '1.25rem', width: '100%', padding: '0.75rem' }}
                >
                  <span>Plan &amp; Check Lowest Prices</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
