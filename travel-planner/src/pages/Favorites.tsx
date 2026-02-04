import { useFavorites } from '../context/FavoritesContext';

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) return <div className="p-4">No favorites yet.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
      <ul className="space-y-2">
        {favorites.map((f) => (
          <li key={f.id} className="p-2 border rounded-md flex justify-between items-center">
            <span>{f.name}</span>
            <button
              onClick={() => removeFavorite(f.id)}
              className="text-red-600 underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
