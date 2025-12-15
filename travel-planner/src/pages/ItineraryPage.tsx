import React from 'react'
import { useParams } from 'react-router-dom'
import { usePlanner } from '../hooks/usePlanner'

export default function ItineraryPage() {
  const { id } = useParams()
  const { trips } = usePlanner()
  const trip = trips.find(t => t.id === id)
  if (!trip) return <div>Trip not found</div>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{trip.name}</h1>
      {trip.days.length === 0 ? <p className="text-slate-600">No activities yet. Add some from the Trips page.</p> : (
        <div className="space-y-4">
          {trip.days.map(d => (
            <div key={d.day} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Day {d.day}</h3>
              <ul className="mt-2">
                {d.activities.map(a => (
                  <li key={a.id} className="text-sm">{a.name} — <span className="text-slate-500">{a.country}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
