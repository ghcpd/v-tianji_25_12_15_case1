import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { getfavoriteDestinations, getDestinations, removeFavorite, isFavorite } from '../utils/storage'

export default function FavoritesView() {
  const [favoriteDestinations, setFavoriteDestinations] = useState(getfavoriteDestinations())
  const [favorites, setFavorites] = useState(new Map(
    getDestinations().map(d => [d.id, isFavorite(d.id)])
  ))

  const handleRemoveFavorite = (destinationId) => {
    removeFavorite(destinationId)
    setFavoriteDestinations(getfavoriteDestinations())
    const newFavorites = new Map(favorites)
    newFavorites.set(destinationId, false)
    setFavorites(newFavorites)
  }

  if (favoriteDestinations.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">❤️</div>
          <h3>No favorites yet</h3>
          <p>Visit the destinations page to add places to your favorites!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h2 style={{ color: 'white', marginBottom: '32px', fontSize: '28px', fontWeight: 'bold' }}>
        ❤️ Favorite Destinations
      </h2>
      
      <div className="destination-grid">
        {favoriteDestinations.map(destination => (
          <div key={destination.id} className="destination-card" data-testid={`favorite-card-${destination.id}`}>
            <div className="destination-image">
              <span>{destination.image}</span>
              <button
                className="favorite-btn"
                onClick={() => handleRemoveFavorite(destination.id)}
                data-testid={`remove-favorite-btn-${destination.id}`}
                aria-label={`Remove ${destination.name} from favorites`}
              >
                ❤️
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
