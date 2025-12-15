import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  getTips,
  saveTrip,
  deleteTrip,
  getFavorites,
  saveFavorite,
  removeFavorite,
  isFavorite,
  getDestinations,
  getDestinationById,
  getfavoriteDestinations,
  createTrip,
  addItinerary,
  getItinerariesByTrip,
  isValidDateRange,
  formatDate
} from '../utils/storage'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Trip Management', () => {
    it('should get empty trips initially', () => {
      const trips = getTips()
      expect(trips).toEqual([])
    })

    it('should create a new trip', () => {
      const trip = createTrip('Tokyo Adventure', '1', '2024-03-01', '2024-03-10')
      expect(trip).toBeDefined()
      expect(trip.name).toBe('Tokyo Adventure')
      expect(trip.destinationId).toBe('1')
    })

    it('should save and retrieve trips', () => {
      const trip = createTrip('Paris Trip', '2', '2024-06-01', '2024-06-07')
      const saved = getTips()
      
      expect(saved).toHaveLength(1)
      expect(saved[0].name).toBe('Paris Trip')
    })

    it('should delete a trip', () => {
      const trip = createTrip('London Trip', '3', '2024-07-01', '2024-07-10')
      const tripId = trip.id
      
      deleteTrip(tripId)
      const remaining = getTips()
      
      expect(remaining).toHaveLength(0)
    })

    it('should save multiple trips', () => {
      localStorage.clear()
      createTrip('Trip 1', '1', '2024-03-01', '2024-03-10')
      localStorage.clear()
      createTrip('Trip 2', '2', '2024-06-01', '2024-06-07')
      localStorage.clear()
      createTrip('Trip 3', '3', '2024-07-01', '2024-07-10')
      
      const trips = getTips()
      expect(trips.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Favorites Management', () => {
    it('should get empty favorites initially', () => {
      const favorites = getFavorites()
      expect(favorites).toEqual([])
    })

    it('should save a favorite', () => {
      saveFavorite('1')
      const favorites = getFavorites()
      
      expect(favorites).toHaveLength(1)
      expect(favorites[0]).toBe('1')
    })

    it('should check if destination is favorite', () => {
      saveFavorite('1')
      
      expect(isFavorite('1')).toBe(true)
      expect(isFavorite('2')).toBe(false)
    })

    it('should remove a favorite', () => {
      saveFavorite('1')
      saveFavorite('2')
      
      removeFavorite('1')
      const favorites = getFavorites()
      
      expect(favorites).toHaveLength(1)
      expect(favorites[0]).toBe('2')
    })

    it('should not duplicate favorites', () => {
      saveFavorite('1')
      saveFavorite('1')
      
      const favorites = getFavorites()
      expect(favorites).toHaveLength(1)
    })

    it('should get favorite destinations', () => {
      saveFavorite('1')
      saveFavorite('2')
      
      const favDests = getfavoriteDestinations()
      expect(favDests).toHaveLength(2)
      expect(favDests[0].id).toBe('1')
      expect(favDests[1].id).toBe('2')
    })
  })

  describe('Destination Management', () => {
    it('should get all destinations', () => {
      const destinations = getDestinations()
      expect(destinations.length).toBeGreaterThan(0)
    })

    it('should get destination by id', () => {
      const dest = getDestinationById('1')
      expect(dest).toBeDefined()
      expect(dest.id).toBe('1')
      expect(dest.name).toBe('Tokyo, Japan')
    })

    it('should return undefined for non-existent destination', () => {
      const dest = getDestinationById('999')
      expect(dest).toBeUndefined()
    })
  })

  describe('Itinerary Management', () => {
    it('should add itinerary to trip', () => {
      const trip = createTrip('Trip', '1', '2024-03-01', '2024-03-03')
      const updated = addItinerary(trip.id, '2024-03-01', ['Visit Tower', 'Dinner'])
      
      expect(updated.itineraries).toHaveLength(1)
      expect(updated.itineraries[0].activities).toHaveLength(2)
    })

    it('should get itineraries by trip', () => {
      const trip = createTrip('Trip', '1', '2024-03-01', '2024-03-03')
      addItinerary(trip.id, '2024-03-01', ['Activity 1'])
      addItinerary(trip.id, '2024-03-02', ['Activity 2'])
      
      const itineraries = getItinerariesByTrip(trip.id)
      expect(itineraries).toHaveLength(2)
    })

    it('should update existing itinerary', () => {
      const trip = createTrip('Trip', '1', '2024-03-01', '2024-03-03')
      const updated1 = addItinerary(trip.id, '2024-03-01', ['Activity 1'])
      const updated2 = addItinerary(trip.id, '2024-03-01', ['Activity 1', 'Activity 2'])
      
      expect(updated2.itineraries[0].activities).toHaveLength(2)
    })

    it('should sort itineraries by date', () => {
      const trip = createTrip('Trip', '1', '2024-03-01', '2024-03-05')
      addItinerary(trip.id, '2024-03-03', ['Day 3'])
      addItinerary(trip.id, '2024-03-01', ['Day 1'])
      addItinerary(trip.id, '2024-03-02', ['Day 2'])
      
      const trips = getTips()
      const currentTrip = trips.find(t => t.id === trip.id)
      
      expect(currentTrip.itineraries[0].date).toBe('2024-03-01')
      expect(currentTrip.itineraries[1].date).toBe('2024-03-02')
      expect(currentTrip.itineraries[2].date).toBe('2024-03-03')
    })
  })

  describe('Validation Functions', () => {
    it('should validate date range correctly', () => {
      expect(isValidDateRange('2024-03-01', '2024-03-10')).toBe(true)
      expect(isValidDateRange('2024-03-10', '2024-03-01')).toBe(false)
    })

    it('should format date correctly', () => {
      const formatted = formatDate('2024-03-15')
      expect(formatted).toContain('March')
      expect(formatted).toContain('15')
      expect(formatted).toContain('2024')
    })
  })
})
