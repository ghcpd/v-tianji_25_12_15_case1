import { useParams, useSearchParams } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function TripPlanner() {
  const { id } = useParams<{ id?: string }>()
  const [searchParams] = useSearchParams()

  const destinationId = searchParams.get('destination')
  const { addFavorite } = useFavorites()

  const handleAddFavorite = () => {
    addFavorite({ id: (id ?? destinationId ?? 'unknown'), name: 'Sample Trip' })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Trip Planner</h2>
      <p>Trip ID: {id ?? 'new'}</p>
      {destinationId && <p>Destination: {destinationId}</p>}
      <button onClick={handleAddFavorite} className="mt-4 underline text-blue-600">
        Add to Favorites
      </button>
    </div>
  )
}
