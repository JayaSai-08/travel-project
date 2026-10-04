import React from 'react';
import { Navigation, Mail, Phone, MapPin, Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-dark">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Navigation size={20} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Travel Route
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '380px', marginBottom: '1.25rem' }}>
              Find your way with affordable prices. Intelligent roadway pathfinding connecting major interstate networks with lowest fares and multi-vehicle road options.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#38bdf8' }}>
              <Shield size={14} />
              <span>National Highway Toll &amp; Fare Verified</span>
            </div>
          </div>

          {/* Col 2: Roadways & Vehicles */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Road Fleet &amp; Corridors
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <li><a href="#vehicles" style={{ color: '#94a3b8' }}>Express Roadway Buses</a></li>
              <li><a href="#vehicles" style={{ color: '#94a3b8' }}>Luxury Volvo AC Sleepers</a></li>
              <li><a href="#vehicles" style={{ color: '#94a3b8' }}>Shared Tempo Shuttles</a></li>
              <li><a href="#vehicles" style={{ color: '#94a3b8' }}>Hatchback &amp; Sedan Cabs</a></li>
              <li><a href="#vehicles" style={{ color: '#94a3b8' }}>Two-Wheeler Toll-Free Tourers</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Support (Matching reference screenshot footer) */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="#38bdf8" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Highway Central Hub, Connaught Place, New Delhi 110001</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                <span>Toll-Free Helpline: 1800-419-7688</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                <span>support@travelroute.com</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                Operating Hours: 24 Hours / 7 Days
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem'
        }}>
          <div>
            © {new Date().getFullYear()} Travel Route. All rights reserved. "Find your way with affordable prices".
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b' }}>
            <span>Privacy Policy</span>
            <span>Terms of Carriage</span>
            <span>Highway Safety Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
