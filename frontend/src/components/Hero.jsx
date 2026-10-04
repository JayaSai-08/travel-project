import React from 'react';
import { Compass, Sparkles, ShieldCheck, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-wrapper" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', zIndex: 10 }}>
        {/* Subtle pill tag */}
        <div className="hero-overlay-tag">
          <Sparkles size={14} color="#38bdf8" />
          <span>ROADWAY TRANSIT &amp; FARE OPTIMIZATION</span>
        </div>

        {/* Project Title required */}
        <h1 className="hero-title">
          Travel Route
        </h1>

        {/* Subtitle below title required */}
        <p className="hero-subtitle">
          Find your way with affordable prices
        </p>

        {/* Highlight features pill */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <Compass size={16} color="#38bdf8" />
            <span>Dijkstra Shortest Path</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <ShieldCheck size={16} color="#4ade80" />
            <span>Low Price Guarantee</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <MapPin size={16} color="#fbbf24" />
            <span>Intercity Roadways &amp; Expressways</span>
          </div>
        </div>
      </div>
    </section>
  );
}
