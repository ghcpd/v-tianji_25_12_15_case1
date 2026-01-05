import React, { useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { getTips, getDestinationById, addItinerary, formatDate } from '../utils/storage'

export default function TripDetailView({ tripId, onBack }) {
  const [trip, setTrip] = useState(() => {
    const trips = getTips()
    return trips.find(t => t.id === tripId)
  })
  
  const [newActivityDate, setNewActivityDate] = useState('')
  const [newActivityText, setNewActivityText] = useState('')
  const [error, setError] = useState('')

  if (!trip) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Trip not found</p>
          <button className="btn btn-primary" onClick={onBack}>
            <ArrowLeft size={18} />
            Back to Trips
          </button>
        </div>
      </div>
    )
  }

  const destination = getDestinationById(trip.destinationId)

  const handleAddActivity = (e) => {
    e.preventDefault()
    setError('')

    if (!newActivityDate) {
      setError('Please select a date')
      return
    }

    if (!newActivityText.trim()) {
      setError('Please enter an activity')
      return
    }

    const existingItinerary = trip.itineraries.find(i => i.date === newActivityDate)
    const activities = existingItinerary ? [...existingItinerary.activities, newActivityText] : [newActivityText]

    const updatedTrip = addItinerary(trip.id, newActivityDate, activities)
    setTrip(updatedTrip)
    
    setNewActivityDate('')
    setNewActivityText('')
  }

  const getDaysInTrip = () => {
    const start = new Date(trip.startDate)
    const end = new Date(trip.endDate)
    const days = []
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d).toISOString().split('T')[0])
    }
    
    return days
  }

  const allDays = getDaysInTrip()

  return (
    <div className="page">
      <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '24px' }} data-testid="back-btn">
        <ArrowLeft size={18} />
        Back
      </button>

      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '32px', 
        marginBottom: '24px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '24px', marginBottom: '32px' }}>
          <div style={{ fontSize: '64px' }}>{destination?.image}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px', color: '#333' }}>{trip.name}</h2>
            <p style={{ fontSize: '18px', color: '#667eea', marginBottom: '8px', fontWeight: '600' }}>
              📍 {destination?.name}
            </p>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </p>
            <p style={{ color: '#999', fontSize: '14px' }}>
              Trip duration: {allDays.length} days
            </p>
          </div>
        </div>
      </div>

      <div className="itinerary-container" data-testid="itinerary-container">
        <div className="itinerary-header">
          <h2>📋 Daily Itinerary</h2>
        </div>

        {allDays.map(date => {
          const dayItinerary = trip.itineraries.find(i => i.date === date)
          return (
            <div key={date} className="itinerary-day" data-testid={`itinerary-day-${date}`}>
              <div className="itinerary-day-title">
                {formatDate(date)}
              </div>
              
              {dayItinerary && dayItinerary.activities.length > 0 ? (
                <ul className="activities-list">
                  {dayItinerary.activities.map((activity, idx) => (
                    <li key={idx} className="activity-item" data-testid={`activity-item-${idx}`}>
                      {activity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#999', fontSize: '13px', marginLeft: '10px' }}>
                  No activities planned yet
                </p>
              )}
            </div>
          )
        })}

        <div className="add-activity-form">
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleAddActivity}>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label htmlFor="activity-date" style={{ marginBottom: '6px' }}>Select Date</label>
              <input
                id="activity-date"
                type="date"
                value={newActivityDate}
                onChange={(e) => setNewActivityDate(e.target.value)}
                min={trip.startDate}
                max={trip.endDate}
                data-testid="activity-date-input"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div className="activity-input-group">
              <input
                type="text"
                placeholder="e.g., Visit Eiffel Tower, Have dinner at..."
                value={newActivityText}
                onChange={(e) => setNewActivityText(e.target.value)}
                data-testid="activity-input"
              />
              <button type="submit" className="btn btn-primary" data-testid="add-activity-btn">
                <Plus size={16} />
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
