import React from 'react'
import { StoreProvider } from './store'
import DestinationList from './components/DestinationList'
import TripPlanner from './components/TripPlanner'
import Favorites from './components/Favorites'

export default function App() {
  return (
    <StoreProvider>
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#4F46E5" />
            </svg>
            <div>
              <h1>Travel Planner</h1>
              <p className="subtitle">Plan trips, build daily itineraries, and save favorites</p>
            </div>
          </div>
          <Favorites />
        </header>

        <main className="container">
          <aside className="sidebar">
            <DestinationList />
          </aside>

          <section className="content">
            <TripPlanner />
          </section>
        </main>

        <footer className="footer">Built with care — minimal demo UI</footer>
      </div>
    </StoreProvider>
  )
}
