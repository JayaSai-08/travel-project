import React from 'react';
import { Bus, Route, Wallet, ShieldCheck, MapPin, Gauge } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section id="why-us" style={{ padding: '5rem 0 3rem' }}>
      <div className="container">
        {/* Large stylized numeral matching reference screenshot */}
        <div className="section-meta-number">01</div>
        <h2 className="section-header-title">
          why to choose us?
        </h2>
        <p className="section-subtitle">
          Intelligent roadway routing engineered for maximum savings, shortest transit mileage, and effortless road travel.
        </p>

        {/* 3 High-End Cards matching reference layout */}
        <div className="feature-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: '#e0f2fe', color: '#0284c7' }}>
              <Bus size={28} />
            </div>
            <h3 className="feature-title">
              Selection of Road Vehicles
            </h3>
            <p className="feature-desc">
              Express roadway buses, luxury multi-axle Volvo sleepers, shared shuttles, private hatchback cabs, sedans, and motorbikes for every budget requirement.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: '#d1fae5', color: '#059669' }}>
              <Wallet size={28} />
            </div>
            <h3 className="feature-title">
              Affordable &amp; Low Prices
            </h3>
            <p className="feature-desc">
              Transparent per-kilometer fares, optimized toll calculations, and multi-passenger cost-sharing. We guarantee the most economical highway fares.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Route size={28} />
            </div>
            <h3 className="feature-title">
              Shortest Path Algorithm
            </h3>
            <p className="feature-desc">
              Powered by Dijkstra’s shortest path graph algorithm. Analyzes national expressways, toll charges, and road conditions to give you the fastest and shortest route.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
