import React from 'react'
import { Destination } from '../data/destinations'

export default function DestinationCard({ dest, onToggleFavorite, favorite }: { dest: Destination, onToggleFavorite: (d:Destination)=>void, favorite?: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{dest.name}</h3>
        <p className="text-sm text-slate-600">{dest.country}</p>
        <p className="mt-2 text-slate-700 text-sm">{dest.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={()=>onToggleFavorite(dest)} className={`px-3 py-1 rounded ${favorite? 'bg-rose-500 text-white' : 'bg-slate-100'}`}>
            {favorite ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
