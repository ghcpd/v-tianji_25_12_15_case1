import React from 'react'
import { useStore } from '../store'

export default function Favorites() {
  const { destinations, favorites } = useStore()

  const favItems = destinations.filter((d) => favorites.includes(d.id))

  return (
    <div className="favorites" data-testid="favorites">
      <div className="fav-count">⭐ {favItems.length}</div>
      <div className="fav-list">
        {favItems.slice(0, 3).map((d) => (
          <div key={d.id} className="fav-pill" title={d.name} data-testid={`favorite-${d.id}`}>
            {d.name.split(',')[0]}
          </div>
        ))}
      </div>
    </div>
  )
}
