import React from 'react'
import { Compass, Heart, List, MapPin } from 'lucide-react'

export default function Navbar({ currentView, onViewChange }) {
  const navItems = [
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'trips', label: 'My Trips', icon: List },
    { id: 'favorites', label: 'Favorites', icon: Heart }
  ]

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Compass size={32} style={{ color: '#667eea' }} />
        <h1>Travel Planner</h1>
      </div>
      
      <div className="nav-buttons">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              className={isActive ? 'btn btn-primary' : 'btn btn-secondary'}
              onClick={() => onViewChange(item.id)}
              data-testid={`nav-button-${item.id}`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
