// Storage keys
const STORAGE_KEYS = {
  TRIPS: 'travel_planner_trips',
  FAVORITES: 'travel_planner_favorites'
}

// Default destinations data
const DESTINATIONS = [
  {
    id: '1',
    name: 'Tokyo, Japan',
    description: 'Experience vibrant culture, ancient temples, and modern technology',
    image: '🗾',
    country: 'Japan',
    highlights: ['Senso-ji Temple', 'Shibuya Crossing', 'Mount Fuji']
  },
  {
    id: '2',
    name: 'Paris, France',
    description: 'The city of love, art, and world-class cuisine',
    image: '🗼',
    country: 'France',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame']
  },
  {
    id: '3',
    name: 'New York, USA',
    description: 'The city that never sleeps with endless entertainment',
    image: '🗽',
    country: 'United States',
    highlights: ['Statue of Liberty', 'Central Park', 'Times Square']
  },
  {
    id: '4',
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with beautiful beaches and temples',
    image: '🏝',
    country: 'Indonesia',
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach']
  },
  {
    id: '5',
    name: 'Barcelona, Spain',
    description: 'Architectural wonders and vibrant Mediterranean culture',
    image: '🏛',
    country: 'Spain',
    highlights: ['Sagrada Familia', 'Park Güell', 'Gothic Quarter']
  },
  {
    id: '6',
    name: 'Dubai, UAE',
    description: 'Luxury, shopping, and stunning desert landscapes',
    image: '🏜',
    country: 'United Arab Emirates',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Gold Souk']
  }
]

// Trip management functions
export const getTips = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.TRIPS)
  return stored ? JSON.parse(stored) : []
}

export const saveTrip = (trip) => {
  const trips = getTips()
  const existingIndex = trips.findIndex(t => t.id === trip.id)
  
  if (existingIndex >= 0) {
    trips[existingIndex] = trip
  } else {
    trips.push(trip)
  }
  
  localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips))
  return trip
}

export const deleteTrip = (tripId) => {
  const trips = getTips()
  const filtered = trips.filter(t => t.id !== tripId)
  localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(filtered))
  return filtered
}

// Favorites management
export const getFavorites = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES)
  return stored ? JSON.parse(stored) : []
}

export const saveFavorite = (destinationId) => {
  const favorites = getFavorites()
  if (!favorites.includes(destinationId)) {
    favorites.push(destinationId)
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
  }
  return favorites
}

export const removeFavorite = (destinationId) => {
  const favorites = getFavorites()
  const filtered = favorites.filter(id => id !== destinationId)
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered))
  return filtered
}

export const isFavorite = (destinationId) => {
  const favorites = getFavorites()
  return favorites.includes(destinationId)
}

// Destination functions
export const getDestinations = () => DESTINATIONS

export const getDestinationById = (id) => {
  return DESTINATIONS.find(d => d.id === id)
}

export const getfavoriteDestinations = () => {
  const favorites = getFavorites()
  return DESTINATIONS.filter(d => favorites.includes(d.id))
}

// Trip creation
export const createTrip = (name, destinationId, startDate, endDate) => {
  const trip = {
    id: Date.now().toString(),
    name,
    destinationId,
    startDate,
    endDate,
    itineraries: [],
    createdAt: new Date().toISOString()
  }
  return saveTrip(trip)
}

// Itinerary functions
export const addItinerary = (tripId, date, activities) => {
  const trips = getTips()
  const trip = trips.find(t => t.id === tripId)
  
  if (!trip) return null

  const itineraryIndex = trip.itineraries.findIndex(i => i.date === date)
  
  if (itineraryIndex >= 0) {
    trip.itineraries[itineraryIndex].activities = activities
  } else {
    trip.itineraries.push({
      date,
      activities
    })
  }

  trip.itineraries.sort((a, b) => new Date(a.date) - new Date(b.date))
  
  return saveTrip(trip)
}

export const getItinerariesByTrip = (tripId) => {
  const trips = getTips()
  const trip = trips.find(t => t.id === tripId)
  return trip?.itineraries || []
}

// Validation functions
export const isValidDateRange = (startDate, endDate) => {
  return new Date(startDate) < new Date(endDate)
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
