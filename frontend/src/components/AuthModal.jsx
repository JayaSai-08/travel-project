import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { loginUser, registerUser } from '../api/client';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (tab === 'login') {
        const res = await loginUser({ email, password });
        localStorage.setItem('tr_token', res.token);
        localStorage.setItem('tr_user', JSON.stringify(res.user));
        onAuthSuccess(res.user);
        onClose();
      } else {
        const res = await registerUser({ name, email, password });
        localStorage.setItem('tr_token', res.token);
        localStorage.setItem('tr_user', JSON.stringify(res.user));
        setSuccessMsg('Account created successfully! Logging you in...');
        setTimeout(() => {
          onAuthSuccess(res.user);
          onClose();
        }, 1000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('traveler@route.com');
    setPassword('password123');
    setErrorMsg('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: '#64748b',
            padding: '0.25rem',
            borderRadius: '50%'
          }}
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0284c7, #0369a1)',
            color: '#ffffff',
            marginBottom: '0.75rem'
          }}>
            <Lock size={22} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            {tab === 'login' ? 'Welcome to Travel Route' : 'Join Travel Route'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
            {tab === 'login' 
              ? 'Sign in to access your booked road routes & personalized fares' 
              : 'Create an account to book low price road journeys across India'}
          </p>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#f1f5f9',
          padding: '0.3rem',
          borderRadius: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <button
            type="button"
            className={`tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setErrorMsg(''); }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`tab-btn ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setErrorMsg(''); }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success Alerts */}
        {errorMsg && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            padding: '0.65rem 0.85rem',
            borderRadius: '0.6rem',
            fontSize: '0.825rem',
            marginBottom: '1rem'
          }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#047857',
            padding: '0.65rem 0.85rem',
            borderRadius: '0.6rem',
            fontSize: '0.825rem',
            marginBottom: '1rem'
          }}>
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tab === 'register' && (
            <div className="form-group">
              <label className="form-label">
                <User size={14} /> Full Name
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Alex Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="you@travelroute.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={14} /> Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Quick Demo Credentials Fill Button for instant testing */}
          {tab === 'login' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleDemoFill}
                style={{
                  color: '#0284c7',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Sparkles size={13} />
                <span>Fill Demo Credentials (1-Click)</span>
              </button>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                demo: traveler@route.com
              </span>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={loading}
          >
            <span>{loading ? 'Authenticating...' : tab === 'login' ? 'Sign In to Travel Route' : 'Create My Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{
          marginTop: '1.25rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem'
        }}>
          <ShieldCheck size={14} color="#059669" />
          <span>256-Bit SSL Encrypted &amp; Secure JWT Sessions</span>
        </div>
      </div>
    </div>
  );
}
