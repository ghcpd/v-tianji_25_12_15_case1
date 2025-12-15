import React, {useState, useEffect} from 'react'

type Destination = { id: string; name: string; country: string; description?: string }
type Trip = { id: string; name: string; days: { date: string; activities: string[] }[] }

const sampleDestinations: Destination[] = [
  { id: '1', name: 'Kyoto', country: 'Japan', description: 'Temples and gardens.' },
  { id: '2', name: 'Barcelona', country: 'Spain', description: 'Beaches and Gaudí.' },
  { id: '3', name: 'Vancouver', country: 'Canada', description: 'Mountains and sea.' },
]

function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as T : initial
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(state)) }, [key, state])
  return [state, setState] as const
}

export default function App() {
  const [destinations] = useState(sampleDestinations)
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', [])
  const [trips, setTrips] = useLocalStorage<Trip[]>('trips', [])
  const [query, setQuery] = useState('')

  function toggleFavorite(id: string) {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function createTrip(name: string) {
    const t: Trip = { id: Date.now().toString(), name, days: [] }
    setTrips(prev => [t, ...prev])
  }

  return (
    <div className="container">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Travel Planner</h1>
        <p className="text-slate-600">Browse destinations, create trips, and save favorites.</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Destinations</h2>
            <input aria-label="search" value={query} onChange={e => setQuery(e.target.value)} className="border rounded px-2 py-1" placeholder="Search" />
          </div>
          <ul className="space-y-3">
            {destinations.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase())).map(d => (
              <li key={d.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="font-semibold">{d.name} <span className="text-sm text-slate-500">— {d.country}</span></div>
                  <div className="text-sm text-slate-600">{d.description}</div>
                </div>
                <div>
                  <button aria-label={`fav-${d.id}`} onClick={() => toggleFavorite(d.id)} className={`px-3 py-1 rounded ${favorites.includes(d.id) ? 'bg-amber-400' : 'bg-slate-100'}`}>
                    {favorites.includes(d.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="bg-white rounded-lg p-4 shadow space-y-4">
          <div>
            <h3 className="font-medium">Create Trip</h3>
            <CreateTrip onCreate={createTrip} />
          </div>

          <div>
            <h3 className="font-medium">Favorites</h3>
            <ul className="text-sm text-slate-700">
              {favorites.length === 0 ? (
                <li className="text-slate-500">No favorites yet</li>
              ) : (
                // Only render favorites that match known destinations to avoid runtime errors
                favorites
                  .map(id => destinations.find(x => x.id === id))
                  .filter((d): d is Destination => !!d)
                  .map(d => (
                    <li key={d.id}>{d.name} <span className="text-slate-400 text-xs">{d.country}</span></li>
                  ))
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Trips</h3>
            <ul className="space-y-2">
              {trips.map(t => (
                <li key={t.id} className="border rounded p-2">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.days.length} days</div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}

function CreateTrip({onCreate}:{onCreate:(name:string)=>void}){
  const [name, setName] = useState('')
  return (
    <form onSubmit={(e)=>{e.preventDefault(); if(name.trim()) {onCreate(name.trim()); setName('')}}} className="flex gap-2">
      <input aria-label="trip-name" value={name} onChange={e=>setName(e.target.value)} className="flex-1 border rounded px-2 py-1" placeholder="Trip name" />
      <button className="bg-sky-500 text-white px-3 py-1 rounded">Create</button>
    </form>
  )
}
