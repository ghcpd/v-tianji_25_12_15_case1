import { Link } from 'react-router-dom'

const trips = [
  { id: '1', name: 'Paris Spring' },
  { id: '2', name: 'Tokyo Autumn' },
]

export default function Trips() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Trips</h2>
      <ul className="space-y-2">
        {trips.map((trip) => (
          <li key={trip.id} className="p-2 border rounded-md">
            <Link to={`/trips/${trip.id}`} className="underline text-blue-600">
              {trip.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
