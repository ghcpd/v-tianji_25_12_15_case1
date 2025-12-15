import React, { useState } from 'react'
import { sampleDestinations } from '../data/destinations'
import { usePlanner } from '../hooks/usePlanner'
import { Link } from 'react-router-dom'

export default function TripBuilderPage() {
  const { trips, createTrip, addActivity } = usePlanner()
  const [name, setName] = useState('')

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    createTrip(name.trim())
    setName('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trips</h1>
      <form onSubmit={handleCreate} className="mb-6 flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Trip name" className="border rounded px-3 py-2 flex-1" />
        <button className="px-4 py-2 bg-slate-800 text-white rounded">Create</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map(t => (
          <div key={t.id} className="bg-white shadow rounded p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{t.name}</h3>
              <Link to={`/itinerary/${t.id}`} className="text-sm text-slate-600">Open</Link>
            </div>
            <div className="mt-3">
              <p className="text-sm text-slate-500">Add today's activity:</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {sampleDestinations.map(d => (
                  <button key={d.id} onClick={()=>addActivity(t.id, 1, d)} className="text-sm px-2 py-1 border rounded">{d.name}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
