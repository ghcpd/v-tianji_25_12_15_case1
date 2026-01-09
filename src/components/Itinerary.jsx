import React, { useState, useEffect } from 'react'

export default function Itinerary({ trip, onAdd }) {
  const [openDay, setOpenDay] = useState(trip?.days?.[0]?.id)

  useEffect(() => {
    // when the trip changes, reset to its first day
    setOpenDay(trip?.days?.[0]?.id)
  }, [trip?.id])

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{trip?.name || 'No trip selected'}</h2>
        <p className="muted">Plan your days</p>
      </div>

      {!trip ? (
        <div className="empty">No trip selected. Create a trip to get started.</div>
      ) : (
        <div>
          <div className="days-tabs">
            {trip.days.map((d) => (
              <button
                key={d.id}
                className={`day-tab ${openDay === d.id ? 'active' : ''}`}
                onClick={() => setOpenDay(d.id)}
                data-testid={`day-tab-${d.id}`}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className="day-panel">
            {trip.days.map((d) => (
              <div key={d.id} style={{ display: openDay === d.id ? 'block' : 'none' }}>
                <h3>{d.name}</h3>
                <ul className="itinerary-list" data-testid={`itinerary-${d.id}`}>
                  {d.items.length === 0 && <li className="muted">No items yet</li>}
                  {d.items.map((it, idx) => (
                    <li key={idx} className="it-item" data-testid="itinerary-item">
                      <div className="it-time">{it.time}</div>
                      <div className="it-place">{it.place}</div>
                    </li>
                  ))}
                </ul>

                <AddItemForm
                  onAdd={(item) => {
                    onAdd(trip.id, d.id, item)
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AddItemForm({ onAdd }) {
  const [place, setPlace] = useState('')
  const [time, setTime] = useState('09:00')

  function submit(e) {
    e.preventDefault()
    if (!place) return
    onAdd({ place, time })
    setPlace('')
  }

  return (
    <form className="add-item" onSubmit={submit} data-testid="add-item-form">
      <input
        className="input"
        placeholder="Place or activity"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        data-testid="add-item-place"
      />
      <input className="input time" type="time" value={time} onChange={(e) => setTime(e.target.value)} data-testid="add-item-time" />
      <button className="btn small" type="submit" data-testid="add-item-submit">
        Add
      </button>
    </form>
  )
}
