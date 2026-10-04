import React from 'react';
import { Compass, User, LogOut, Navigation, Phone } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout }) {
  return (
    <header style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: '1.25rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(8px)',
      background: 'rgba(11, 25, 44, 0.35)'
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)'
        }}>
          <Navigation size={22} />
        </div>
        <div>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            display: 'block',
            lineHeight: 1
          }}>
            Travel Route
          </span>
          <span style={{
            fontSize: '0.68rem',
            color: '#94a3b8',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            Roadway Optimizer
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-desktop">
        <a href="#planner" style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>
          Find Routes
        </a>
        <a href="#vehicles" style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 500 }}>
          Vehicles & Pricing
        </a>
        <a href="#why-us" style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 500 }}>
          Why Choose Us
        </a>
        <a href="#popular" style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 500 }}>
          Scenic Highways
        </a>
      </nav>

      {/* Auth & Helpline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
          <Phone size={14} color="#38bdf8" />
          <span style={{ fontWeight: 600 }}>24x7 Roadway: 1800-419-7688</span>
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              color: '#ffffff',
              fontWeight: 600
            }}>
              👋 {user.name}
            </span>
            <button
              onClick={onLogout}
              title="Logout"
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#f87171',
                padding: '0.45rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '0.5rem 1.15rem',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 0.2s'
            }}
          >
            <User size={16} />
            <span>Login / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}
