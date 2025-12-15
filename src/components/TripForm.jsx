import React, { useState } from 'react'

export default function TripForm({ onCreate, onClose }) {
  const [name, setName] = useState('My Trip')
  const [days, setDays] = useState(3)

  function submit(e) {
    e.preventDefault()
    if (!name) return
    onCreate({ name, days })
    onClose()
  }

  return (
    <div className="modal" data-testid="trip-form">
      <form className="panel panel-form" onSubmit={submit}>
        <div className="panel-header">
          <h2>Create Trip</h2>
          <p className="muted">Simple trip creator</p>
        </div>

        <label className="label">Trip name</label>
        <input
          data-testid="trip-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

        <label className="label">Days</label>
        <input
          data-testid="trip-days-input"
          type="number"
          min="1"
          max="30"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="input"
        />

        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={onClose} data-testid="trip-cancel">
            Cancel
          </button>
          <button type="submit" className="btn primary" data-testid="trip-submit">
            Create Trip
          </button>
        </div>
      </form>
    </div>
  )
}
