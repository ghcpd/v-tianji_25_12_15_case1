import { Link } from 'react-router-dom'

const destinations = [
  { id: 'paris', name: 'Paris', country: 'France' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
  { id: 'sydney', name: 'Sydney', country: 'Australia' },
]

export default function Destinations() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Destinations</h2>
      <ul className="space-y-2">
        {destinations.map((d) => (
          <li key={d.id} className="p-2 border rounded-md">
            <Link to={`/trips/new?destination=${d.id}`} className="underline text-blue-600">
              {d.name}, {d.country}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
