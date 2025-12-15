import './App.css'

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Trips from './pages/Trips';
import Favorites from './pages/Favorites';
import TripPlanner from './pages/TripPlanner';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:id" element={<TripPlanner />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}

export default App
