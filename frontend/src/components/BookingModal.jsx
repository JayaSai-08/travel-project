import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Phone, User, Ticket, Milestone, Clock, ShieldCheck } from 'lucide-react';
import { bookTicket } from '../api/client';

export default function BookingModal({ isOpen, onClose, vehicle, routeData, user }) {
  const [passengerName, setPassengerName] = useState(user ? user.name : '');
  const [passengerPhone, setPassengerPhone] = useState('+91 98765 43210');
  const [travelDate, setTravelDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen || !vehicle || !routeData) return null;

  const { origin, destination, primaryRoute } = routeData;

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await bookTicket({
        origin: origin.name,
        destination: destination.name,
        vehicleId: vehicle.vehicleId,
        distanceKm: primaryRoute.totalDistanceKm,
        totalFare: vehicle.adjustedTotalPrice || vehicle.pricingBreakdown.totalPrice,
        passengerName,
        passengerPhone,
        travelDate
      });

      if (res.success) {
        setConfirmedBooking(res.booking);
      }
    } catch (err) {
      alert('Booking could not be finalized: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAll = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleCloseAll}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <button
          onClick={handleCloseAll}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#64748b' }}
        >
          <X size={20} />
        </button>

        {!confirmedBooking ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#e0f2fe',
                color: '#0284c7',
                marginBottom: '0.75rem'
              }}>
                <Ticket size={24} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                Confirm Roadway Booking
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Secure your seat with lowest price guarantee
              </p>
            </div>

            {/* Trip Summary Card */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                  {origin.name} → {destination.name}
                </span>
                <span className="pill-badge badge-blue">
                  {vehicle.name}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Milestone size={13} /> {primaryRoute.totalDistanceKm} km
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={13} /> {primaryRoute.formattedTime}
                </span>
              </div>

              <div style={{
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <span style={{ fontSize: '0.85rem', color: '#475569' }}>Total Roadway Fare:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                  ₹{vehicle.adjustedTotalPrice || vehicle.pricingBreakdown.totalPrice}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">
                  <User size={14} /> Lead Traveler Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="e.g. Alex Sharma"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={14} /> Contact Phone Number
                </label>
                <input
                  type="tel"
                  className="form-input"
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar size={14} /> Travel Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', background: '#059669' }}
                disabled={loading}
              >
                <span>{loading ? 'Confirming Ticket...' : 'Confirm Road Trip Booking'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Ticket Card */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#059669',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              Road Booking Confirmed!
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
              Your ticket has been generated with lowest price confirmation.
            </p>

            <div style={{
              background: '#f8fafc',
              border: '2px dashed #cbd5e1',
              borderRadius: '1rem',
              padding: '1.25rem',
              margin: '1.5rem 0',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Booking Reference</span>
                <span style={{ fontWeight: 800, color: '#0284c7', letterSpacing: '0.05em' }}>
                  {confirmedBooking.bookingId}
                </span>
              </div>

              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {confirmedBooking.origin} → {confirmedBooking.destination}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
                <div>Date: <strong>{confirmedBooking.travelDate}</strong></div>
                <div>Vehicle: <strong>{vehicle.name}</strong></div>
                <div>Passenger: <strong>{confirmedBooking.passengerName}</strong></div>
                <div>Paid: <strong style={{ color: '#059669' }}>₹{confirmedBooking.totalFare}</strong></div>
              </div>
            </div>

            <button
              onClick={handleCloseAll}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              <span>Back to Roadway Planner</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
