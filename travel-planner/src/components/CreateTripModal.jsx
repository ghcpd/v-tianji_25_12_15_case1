import React, { useState } from 'react'
import { X } from 'lucide-react'
import { createTrip, getDestinations, isValidDateRange } from '../utils/storage'

export default function CreateTripModal({ onClose, onTripCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    destinationId: '',
    startDate: '',
    endDate: ''
  })
  
  const [error, setError] = useState('')
  const destinations = getDestinations()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      setError('Trip name is required')
      return
    }
    
    if (!formData.destinationId) {
      setError('Please select a destination')
      return
    }
    
    if (!formData.startDate || !formData.endDate) {
      setError('Please select start and end dates')
      return
    }
    
    if (!isValidDateRange(formData.startDate, formData.endDate)) {
      setError('End date must be after start date')
      return
    }

    try {
      createTrip(
        formData.name,
        formData.destinationId,
        formData.startDate,
        formData.endDate
      )
      onTripCreated()
    } catch (err) {
      setError('Failed to create trip')
    }
  }

  return (
    <div className="modal-overlay" data-testid="create-trip-modal">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">✈️ Create New Trip</div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="trip-name">Trip Name</label>
            <input
              id="trip-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Summer Vacation 2024"
              data-testid="trip-name-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <select
              id="destination"
              name="destinationId"
              value={formData.destinationId}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
              data-testid="destination-select"
            >
              <option value="">Select a destination</option>
              {destinations.map(dest => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              data-testid="start-date-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              data-testid="end-date-input"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" data-testid="submit-trip-btn">
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
