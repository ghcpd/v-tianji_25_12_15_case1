import React from 'react'
import { useStore } from '../store'

export default function DestinationList() {
  const { destinations, favorites, toggleFavorite } = useStore()

  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <h2>Discover</h2>
          <p className="muted">Browse destinations</p>
        </div>

        <ul className="dest-list" data-testid="destination-list">
          {destinations.map((d) => (
            <li key={d.id} className="dest-card">
              <div className="thumb" style={{ backgroundImage: `url(${d.img})` }} role="img" aria-label={d.name} />
              <div className="dest-body">
                <div>
                  <h3>{d.name}</h3>
                  <p className="muted small">{d.desc}</p>
                </div>
                <div className="dest-actions">
                  <button
                    className={`btn-icon ${favorites.includes(d.id) ? 'fav' : ''}`}
                    aria-pressed={favorites.includes(d.id)}
                    data-testid={`fav-${d.id}`}
                    onClick={() => toggleFavorite(d.id)}
                    title={favorites.includes(d.id) ? 'Remove favorite' : 'Save favorite'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21s-7-4.35-9-7.09C-1 10.36 2.42 6 6.5 6c2.54 0 4.11 1.5 5.5 3 1.39-1.5 2.96-3 5.5-3C21.58 6 25 10.36 21 13.91 19 16.65 12 21 12 21z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
