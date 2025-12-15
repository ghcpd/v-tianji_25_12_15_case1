export type Destination = {
  id: string
  name: string
  country: string
  description: string
  image: string
}

export const sampleDestinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'City of lights, cafes and the Eiffel Tower.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b2dff6b8695f304f7f4d1cae67db6a9'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Temples, gardens and traditional culture.',
    image: 'https://images.unsplash.com/photo-1549893071-7c5f3292edc6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=62d8d78a3b5f366bf1f7bd4b1b4e2a21'
  },
  {
    id: 'nyc',
    name: 'New York City',
    country: 'USA',
    description: 'Skylines, museums and Broadway shows.',
    image: 'https://images.unsplash.com/photo-1520975913670-7e6a7e13a2b6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9d5ff35bd3b8b09d3b5461cea2f8b5a2'
  }
]
