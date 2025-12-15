import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>My Favorite Places</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet. Browse destinations to add some!</p>
      ) : (
        <div className="grid">
          {favorites.map(dest => (
            <div key={dest.id} className="card">
              <img src={dest.image} alt={dest.name} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>{dest.name}</h3>
              <p>{dest.description}</p>
              <button
                onClick={() => removeFavorite(dest.id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;