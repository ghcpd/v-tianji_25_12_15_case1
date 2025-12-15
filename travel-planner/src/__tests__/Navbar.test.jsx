import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../components/Navbar'

describe('Navbar Component', () => {
  it('should render navbar title', () => {
    render(<Navbar currentView="destinations" onViewChange={() => {}} />)
    expect(screen.getByText('Travel Planner')).toBeDefined()
  })

  it('should render all navigation buttons', () => {
    render(<Navbar currentView="destinations" onViewChange={() => {}} />)
    
    expect(screen.getByTestId('nav-button-destinations')).toBeDefined()
    expect(screen.getByTestId('nav-button-trips')).toBeDefined()
    expect(screen.getByTestId('nav-button-favorites')).toBeDefined()
  })

  it('should highlight active button', () => {
    render(<Navbar currentView="destinations" onViewChange={() => {}} />)
    
    const destBtn = screen.getByTestId('nav-button-destinations')
    expect(destBtn.className).toContain('btn-primary')
  })

  it('should call onViewChange when button is clicked', () => {
    let changedView = null
    const handleChange = (view) => {
      changedView = view
    }
    
    render(<Navbar currentView="destinations" onViewChange={handleChange} />)
    
    const tripsBtn = screen.getByTestId('nav-button-trips')
    fireEvent.click(tripsBtn)
    
    expect(changedView).toBe('trips')
  })

  it('should have button labels', () => {
    render(<Navbar currentView="destinations" onViewChange={() => {}} />)
    
    expect(screen.getByText('Destinations')).toBeDefined()
    expect(screen.getByText('My Trips')).toBeDefined()
    expect(screen.getByText('Favorites')).toBeDefined()
  })
})
