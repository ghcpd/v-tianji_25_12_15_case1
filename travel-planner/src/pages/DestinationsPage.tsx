import React from 'react'
import DestinationCard from '../components/DestinationCard'
import { sampleDestinations } from '../data/destinations'
import { usePlanner } from '../hooks/usePlanner'

export default function DestinationsPage() {
  const { favorites, toggleFavorite } = usePlanner()

  function isFavorite(id: string) {
    return favorites.find(f => f.id === id)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Explore Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleDestinations.map(d => (
          <DestinationCard key={d.id} dest={d} onToggleFavorite={toggleFavorite} favorite={!!isFavorite(d.id)} />
        ))}
      </div>
    </div>
  )
}
