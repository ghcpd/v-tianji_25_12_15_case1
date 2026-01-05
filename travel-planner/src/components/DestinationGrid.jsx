import React, { useState } from 'react'
import { Plus, Heart } from 'lucide-react'
import { getDestinations, saveFavorite, removeFavorite, isFavorite } from '../utils/storage'

export default function DestinationGrid({ onCreateTrip }) {
  const [destinations, setDestinations] = useState(getDestinations())
  const [favorites, setFavorites] = useState(new Map(
    destinations.map(d => [d.id, isFavorite(d.id)])
  ))

  const handleToggleFavorite = (destinationId) => {
    const newFavorites = new Map(favorites)
    const isFav = favorites.get(destinationId)
    
    if (isFav) {
      removeFavorite(destinationId)
      newFavorites.set(destinationId, false)
    } else {
      saveFavorite(destinationId)
      newFavorites.set(destinationId, true)
    }
    
    setFavorites(newFavorites)
  }

  return (
    <div className="page">
      <h2 style={{ color: 'white', marginBottom: '32px', fontSize: '28px', fontWeight: 'bold' }}>
        Explore Amazing Destinations
      </h2>
      
      <div className="destination-grid">
        {destinations.map(destination => (
          <div key={destination.id} className="destination-card" data-testid={`destination-card-${destination.id}`}>
            <div className="destination-image">
              <span>{destination.image}</span>
              <button
                className="favorite-btn"
                onClick={() => handleToggleFavorite(destination.id)}
                data-testid={`favorite-btn-${destination.id}`}
                aria-label={`Toggle favorite for ${destination.name}`}
              >
                {favorites.get(destination.id) ? '❤️' : '🤍'}
              </button>
            </div>
            
            <div className="destination-content">
              <h3>{destination.name}</h3>
              <p className="destination-country">{destination.country}</p>
              <p className="destination-description">{destination.description}</p>
              
              <div className="highlights">
                {destination.highlights.map((highlight, idx) => (
                  <span key={idx} className="highlight-tag">
                    {highlight}
                  </span>
                ))}
              </div>
              
              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px' }}
                onClick={onCreateTrip}
                data-testid={`create-trip-btn-${destination.id}`}
              >
                <Plus size={16} />
                Create Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
