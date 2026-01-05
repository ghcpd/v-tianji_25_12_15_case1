import React, { useState } from 'react'
import { Plus, Trash2, Calendar } from 'lucide-react'
import { getTips, deleteTrip, getDestinationById, formatDate } from '../utils/storage'

export default function TripsView({ onCreateTrip, onViewTrip }) {
  const [trips, setTrips] = useState(getTips())

  const handleDeleteTrip = (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(tripId)
      setTrips(getTips())
    }
  }

  if (trips.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">✈️</div>
          <h3>No trips yet</h3>
          <p>Start planning your adventure by creating a new trip!</p>
          <button className="btn btn-primary" onClick={onCreateTrip}>
            <Plus size={18} />
            Create Your First Trip
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>My Trips</h2>
        <button className="btn btn-primary" onClick={onCreateTrip} data-testid="create-new-trip-btn">
          <Plus size={18} />
          New Trip
        </button>
      </div>
      
      <div className="trips-grid">
        {trips.map(trip => {
          const destination = getDestinationById(trip.destinationId)
          return (
            <div key={trip.id} className="trip-card" data-testid={`trip-card-${trip.id}`}>
              <h3>{trip.name}</h3>
              <p className="trip-info">
                📍 {destination?.name}
              </p>
              <p className="trip-info">
                <Calendar size={16} />
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </p>
              
              <div style={{ color: '#999', fontSize: '12px', marginTop: '12px' }}>
                {trip.itineraries.length} day{trip.itineraries.length !== 1 ? 's' : ''} planned
              </div>
              
              <div className="trip-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => onViewTrip(trip.id)}
                  data-testid={`view-trip-btn-${trip.id}`}
                >
                  View Details
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTrip(trip.id)}
                  data-testid={`delete-trip-btn-${trip.id}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
