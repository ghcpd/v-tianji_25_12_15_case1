import React, { useState } from 'react'
import { Compass, MapPin, Plus } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import DestinationGrid from './components/DestinationGrid.jsx'
import CreateTripModal from './components/CreateTripModal.jsx'
import TripsView from './components/TripsView.jsx'
import FavoritesView from './components/FavoritesView.jsx'
import TripDetailView from './components/TripDetailView.jsx'

export default function App() {
  const [currentView, setCurrentView] = useState('destinations')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTripId, setSelectedTripId] = useState(null)

  const handleTripCreated = () => {
    setShowCreateModal(false)
    setCurrentView('trips')
  }

  const handleViewTrip = (tripId) => {
    setSelectedTripId(tripId)
    setCurrentView('tripDetail')
  }

  const handleBackToTrips = () => {
    setCurrentView('trips')
    setSelectedTripId(null)
  }

  return (
    <div className="app-container">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="main-content">
        {currentView === 'destinations' && (
          <DestinationGrid
            onCreateTrip={() => setShowCreateModal(true)}
          />
        )}
        
        {currentView === 'trips' && (
          <TripsView
            onCreateTrip={() => setShowCreateModal(true)}
            onViewTrip={handleViewTrip}
          />
        )}

        {currentView === 'favorites' && <FavoritesView />}

        {currentView === 'tripDetail' && selectedTripId && (
          <TripDetailView
            tripId={selectedTripId}
            onBack={handleBackToTrips}
          />
        )}
      </div>

      {showCreateModal && (
        <CreateTripModal
          onClose={() => setShowCreateModal(false)}
          onTripCreated={handleTripCreated}
        />
      )}
    </div>
  )
}
