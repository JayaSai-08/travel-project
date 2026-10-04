import React from 'react';
import { Map, Navigation, ArrowRight, ShieldCheck, Milestone, Clock, DollarSign } from 'lucide-react';

export default function RouteMapVisualizer({ routeData, requestedCriterion }) {
  if (!routeData || !routeData.primaryRoute) return null;

  const { primaryRoute, origin, destination, comparison } = routeData;
  const path = primaryRoute.path || [];
  const segments = primaryRoute.segments || [];

  return (
    <div style={{ marginTop: '2.5rem' }}>
      {/* Route Title & High-level stats bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className={`pill-badge ${requestedCriterion === 'price' ? 'badge-emerald' : requestedCriterion === 'time' ? 'badge-amber' : 'badge-blue'}`}>
                {requestedCriterion === 'price' ? 'Lowest Price Route' : requestedCriterion === 'time' ? 'Fastest ETA Route' : 'Shortest Path Route'}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Via Roadways &amp; Expressways
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span>{origin.name}</span>
              <ArrowRight size={20} color="#0284c7" />
              <span>{destination.name}</span>
            </h2>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Road Distance
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7' }}>
                {primaryRoute.totalDistanceKm} km
              </div>
            </div>

            <div style={{ textAlign: 'right', borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Estimated Travel Time
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                {primaryRoute.formattedTime}
              </div>
            </div>

            <div style={{ textAlign: 'right', borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                Estimated Highway Tolls
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>
                ₹{primaryRoute.totalToll}
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Comparison Pill Strip */}
        <div style={{
          marginTop: '1.25rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid #f1f5f9',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontSize: '0.8rem', fontWeight: 700 }}>
              <Milestone size={14} />
              <span>Shortest Distance Alternative</span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginTop: '0.2rem' }}>
              {comparison.shortestDistance.distanceKm} km ({comparison.shortestDistance.time})
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {comparison.shortestDistance.path}
            </div>
          </div>

          <div style={{ background: '#ecfdf5', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.8rem', fontWeight: 700 }}>
              <DollarSign size={14} />
              <span>Lowest Cost Road Route</span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#065f46', marginTop: '0.2rem' }}>
              {comparison.cheapestFare.distanceKm} km • Tolls: ₹{comparison.cheapestFare.toll}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#047857', marginTop: '0.1rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {comparison.cheapestFare.path}
            </div>
          </div>

          <div style={{ background: '#fffbeb', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #fde68a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#b45309', fontSize: '0.8rem', fontWeight: 700 }}>
              <Clock size={14} />
              <span>Fastest Corridor Route</span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#92400e', marginTop: '0.2rem' }}>
              {comparison.fastestETA.time} ({comparison.fastestETA.distanceKm} km)
            </div>
            <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '0.1rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {comparison.fastestETA.path}
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Road Journey Hops */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Navigation size={18} color="#0284c7" />
          <span>Road Transit Waypoints &amp; Highway Segments</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
          {path.map((city, index) => {
            const isFirst = index === 0;
            const isLast = index === path.length - 1;
            const nextSeg = segments[index];

            return (
              <div key={city.id} style={{ display: 'flex', gap: '1.25rem' }}>
                {/* Node indicator */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px' }}>
                  <div style={{
                    width: isFirst || isLast ? '26px' : '20px',
                    height: isFirst || isLast ? '26px' : '20px',
                    borderRadius: '50%',
                    background: isFirst ? '#0284c7' : isLast ? '#059669' : '#ffffff',
                    border: isFirst || isLast ? 'none' : '3px solid #0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: isFirst || isLast ? '0 0 10px rgba(2, 132, 199, 0.4)' : 'none',
                    zIndex: 2
                  }}>
                    {isFirst ? 'A' : isLast ? 'B' : index}
                  </div>
                  {!isLast && (
                    <div style={{
                      width: '3px',
                      flex: 1,
                      background: 'linear-gradient(180deg, #0284c7, #38bdf8)',
                      margin: '4px 0'
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: isLast ? 0 : '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                      {city.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      {city.state}
                    </span>
                    {isFirst && <span className="pill-badge badge-blue">Departure Hub</span>}
                    {isLast && <span className="pill-badge badge-emerald">Destination</span>}
                  </div>

                  {city.desc && (
                    <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {city.desc}
                    </div>
                  )}

                  {/* Connected road segment info */}
                  {nextSeg && (
                    <div style={{
                      marginTop: '0.75rem',
                      background: '#f8fafc',
                      borderRadius: '0.6rem',
                      padding: '0.6rem 0.85rem',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      fontSize: '0.825rem'
                    }}>
                      <span style={{ fontWeight: 700, color: '#0284c7' }}>
                        🛣️ {nextSeg.highway}
                      </span>
                      <span style={{ color: '#475569' }}>
                        Distance: <strong>{nextSeg.distanceKm} km</strong>
                      </span>
                      <span style={{ color: '#475569' }}>
                        Road Type: <strong>{nextSeg.roadType}</strong>
                      </span>
                      <span style={{ color: '#059669', fontWeight: 600 }}>
                        Toll: ₹{nextSeg.tollCost}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
