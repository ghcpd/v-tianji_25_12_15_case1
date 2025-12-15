import { useEffect, useState } from 'react'
import { Destination } from '../data/destinations'

type Trip = {
  id: string
  name: string
  days: Array<{ day: number; activities: Destination[] }>
}

const STORAGE_KEY = 'travel-planner-store-v1'

export function usePlanner() {
  const [favorites, setFavorites] = useState<Destination[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        return parsed.favorites || []
      }
    } catch (e) {}
    return []
  })
  const [trips, setTrips] = useState<Trip[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        return parsed.trips || []
      }
    } catch (e) {}
    return []
  })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setFavorites(parsed.favorites || [])
        setTrips(parsed.trips || [])
      }
    } catch (e) {
      // ignore
    }
  }, [])

  function saveState(favs: Destination[], trs: Trip[]) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ favorites: favs, trips: trs })) } catch (e) { }
  }

  useEffect(() => {
    saveState(favorites, trips)
  }, [favorites, trips])

  function toggleFavorite(dest: Destination) {
    setFavorites(prev => {
      const exists = prev.find(d => d.id === dest.id)
      const next = exists ? prev.filter(d => d.id !== dest.id) : [...prev, dest]
      saveState(next, trips)
      return next
    })
  }

  function createTrip(name: string) {
    const id = Date.now().toString(36)
    const t: Trip = { id, name, days: [] }
    setTrips(prev => {
      const next = [...prev, t]
      saveState(favorites, next)
      return next
    })
    return t
  }

  function addActivity(tripId: string, day: number, dest: Destination) {
    setTrips(prev => {
      const next = prev.map(t => {
        if (t.id !== tripId) return t
        const dayObj = t.days.find(d => d.day === day)
        if (dayObj) {
          if (!dayObj.activities.find(a => a.id === dest.id)) dayObj.activities.push(dest)
          return { ...t }
        }
        return { ...t, days: [...t.days, { day, activities: [dest] }].sort((a,b)=>a.day-b.day) }
      })
      saveState(favorites, next)
      return next
    })
  }

  return { favorites, trips, toggleFavorite, createTrip, addActivity }
}

export type { Trip }
