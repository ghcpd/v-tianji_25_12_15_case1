import { useFavorites } from '../context/FavoritesContext';

const mockDestinations = [
  { id: 1, name: 'Paris', description: 'City of Light', image: 'https://via.placeholder.com/300x200?text=Paris' },
  { id: 2, name: 'Tokyo', description: 'Modern metropolis', image: 'https://via.placeholder.com/300x200?text=Tokyo' },
  { id: 3, name: 'New York', description: 'The Big Apple', image: 'https://via.placeholder.com/300x200?text=NYC' },
];

const Destinations = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = (id: number) => favorites.some(f => f.id === id);

  const toggleFavorite = (dest: typeof mockDestinations[0]) => {
    if (isFavorite(dest.id)) {
      removeFavorite(dest.id);
    } else {
      addFavorite(dest);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Browse Destinations</h2>
      <div className="grid">
        {mockDestinations.map(dest => (
          <div key={dest.id} className="card">
            <img src={dest.image} alt={dest.name} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>{dest.name}</h3>
            <p>{dest.description}</p>
            <button
              onClick={() => toggleFavorite(dest)}
              className={`btn ${isFavorite(dest.id) ? 'btn-danger' : 'btn-secondary'}`}
            >
              {isFavorite(dest.id) ? 'Unfavorite' : 'Favorite'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;