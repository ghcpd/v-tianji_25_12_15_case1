import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/Layout';
import Home from './components/Home';
import Destinations from './components/Destinations';
import Trips from './components/Trips';
import Favorites from './components/Favorites';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="trips" element={<Trips />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
