import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import DestinationsPage from './pages/DestinationsPage'
import TripBuilderPage from './pages/TripBuilderPage'
import FavoritesPage from './pages/FavoritesPage'
import ItineraryPage from './pages/ItineraryPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav className="bg-white border-b py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold">Travel Planner</Link>
            <div className="space-x-4">
              <Link to="/destinations" className="text-slate-600 hover:text-slate-900">Destinations</Link>
              <Link to="/trips" className="text-slate-600 hover:text-slate-900">Trips</Link>
              <Link to="/favorites" className="text-slate-600 hover:text-slate-900">Favorites</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DestinationsPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/trips" element={<TripBuilderPage />} />
            <Route path="/itinerary/:id" element={<ItineraryPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
