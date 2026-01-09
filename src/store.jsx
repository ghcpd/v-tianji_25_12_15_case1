import React, { createContext, useContext, useState } from 'react'

const StoreContext = createContext(null)

const initialDestinations = [
  {
    id: 'paris',
    name: 'Paris, France',
    desc: 'City of light — museums, cafes, and the Eiffel Tower.',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    desc: 'Ancient temples, zen gardens, and seasonal beauty.',
    img: 'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    desc: 'Tropical beaches, rice terraces, and vibrant culture.',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60'
  }
]

export function StoreProvider({ children }) {
  const [destinations] = useState(initialDestinations)
  const [favorites, setFavorites] = useState([])
  const [trips, setTrips] = useState([])

  function toggleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function createTrip({ name, days }) {
    const trip = {
      id: `trip-${Date.now()}`,
      name,
      days: Array.from({ length: Number(days) }, (_, i) => ({
        id: `day-${i + 1}`,
        name: `Day ${i + 1}`,
        items: []
      }))
    }
    setTrips((t) => [trip, ...t])
    return trip
  }

  function addItineraryItem(tripId, dayId, item) {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? {
              ...t,
              days: t.days.map((d) => (d.id === dayId ? { ...d, items: [...d.items, item] } : d))
            }
          : t
      )
    )
  }

  return (
    <StoreContext.Provider
      value={{ destinations, favorites, trips, toggleFavorite, createTrip, addItineraryItem }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const s = useContext(StoreContext)
  if (!s) throw new Error('useStore must be used within StoreProvider')
  return s
}
