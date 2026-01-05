import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App.jsx'

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

describe('App Component Integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Navigation', () => {
    it('should render the app title', () => {
      render(<App />)
      expect(screen.getByText('Travel Planner')).toBeDefined()
    })

    it('should have navigation buttons', () => {
      render(<App />)
      expect(screen.getByTestId('nav-button-destinations')).toBeDefined()
      expect(screen.getByTestId('nav-button-trips')).toBeDefined()
      expect(screen.getByTestId('nav-button-favorites')).toBeDefined()
    })

    it('should navigate to trips view', () => {
      render(<App />)
      const tripsBtn = screen.getByTestId('nav-button-trips')
      fireEvent.click(tripsBtn)
      
      expect(screen.getByText('No trips yet')).toBeDefined()
    })

    it('should navigate to favorites view', () => {
      render(<App />)
      const favBtn = screen.getByTestId('nav-button-favorites')
      fireEvent.click(favBtn)
      
      expect(screen.getByText('No favorites yet')).toBeDefined()
    })
  })

  describe('Destinations', () => {
    it('should display destination cards', () => {
      render(<App />)
      
      expect(screen.getByTestId('destination-card-1')).toBeDefined()
      expect(screen.getByTestId('destination-card-2')).toBeDefined()
      expect(screen.getByTestId('destination-card-3')).toBeDefined()
    })

    it('should have favorite buttons for destinations', () => {
      render(<App />)
      
      expect(screen.getByTestId('favorite-btn-1')).toBeDefined()
      expect(screen.getByTestId('favorite-btn-2')).toBeDefined()
    })
  })

  describe('Create Trip Modal', () => {
    it('should open create trip modal', () => {
      render(<App />)
      
      const createBtn = screen.getByTestId('create-trip-btn-1')
      fireEvent.click(createBtn)
      
      expect(screen.getByTestId('create-trip-modal')).toBeDefined()
    })

    it('should close modal on cancel', () => {
      render(<App />)
      
      const createBtn = screen.getByTestId('create-trip-btn-1')
      fireEvent.click(createBtn)
      
      const cancelBtn = screen.getByText('Cancel')
      fireEvent.click(cancelBtn)
      
      expect(screen.queryByTestId('create-trip-modal')).not.toBeInTheDocument()
    })
  })
})
