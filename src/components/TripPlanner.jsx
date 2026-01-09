import React, { useState } from 'react'
import { useStore } from '../store'
import TripForm from './TripForm'
import Itinerary from './Itinerary'

export default function TripPlanner() {
  const { trips, createTrip, addItineraryItem } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [selectedTripId, setSelectedTripId] = useState(trips?.[0]?.id || null)

  // keep selectedTripId in sync when trips change
  React.useEffect(() => {
    if (!selectedTripId && trips.length > 0) setSelectedTripId(trips[0].id)
  }, [trips])

  function handleCreate(data) {
    const t = createTrip(data)
    setSelectedTripId(t.id)
  }

  const selectedTrip = trips.find((t) => t.id === selectedTripId)

  return (
    <div>
      <div className="panel">
        <div className="panel-header split">
          <div>
            <h2>Your Trips</h2>
            <p className="muted">Create and manage trips</p>
          </div>
          <div>
            <button className="btn ghost" onClick={() => setShowForm(true)} data-testid="create-trip-button">
              + New Trip
            </button>
          </div>
        </div>

        <div className="trips-list" data-testid="trips-list">
          {trips.length === 0 && <div className="muted">No trips yet — create one to get started.</div>}
          {trips.map((t) => (
            <div key={t.id} className={`trip-card ${t.id === selectedTripId ? 'active' : ''}`} onClick={() => setSelectedTripId(t.id)} data-testid={`trip-${t.id}`}>
              <div>
                <div className="trip-name">{t.name}</div>
                <div className="muted small">{t.days.length} days</div>
              </div>
              <div className="chips">
                <div className="chip">Itinerary</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Itinerary trip={selectedTrip} onAdd={addItineraryItem} />

      {showForm && <TripForm onCreate={handleCreate} onClose={() => setShowForm(false)} />}
    </div>
  )
}
