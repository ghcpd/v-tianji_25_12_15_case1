import React from 'react'
import { usePlanner } from '../hooks/usePlanner'

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = usePlanner()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {favorites.length === 0 ? <p className="text-slate-600">You haven't saved any places yet.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favorites.map(f => (
            <div key={f.id} className="bg-white rounded-lg shadow p-4">
              <img src={f.image} alt={f.name} className="w-full h-36 object-cover rounded" />
              <h3 className="mt-2 font-semibold">{f.name}</h3>
              <p className="text-sm text-slate-600">{f.country}</p>
              <div className="mt-2">
                <button onClick={()=>toggleFavorite(f)} className="px-2 py-1 bg-rose-500 text-white rounded">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
