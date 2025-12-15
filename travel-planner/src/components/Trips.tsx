import { useState } from 'react';

interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  itinerary: string[];
}

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [newTrip, setNewTrip] = useState({ name: '', destination: '', startDate: '', endDate: '' });

  const addTrip = () => {
    if (newTrip.name && newTrip.destination) {
      setTrips([...trips, { ...newTrip, id: Date.now(), itinerary: [] }]);
      setNewTrip({ name: '', destination: '', startDate: '', endDate: '' });
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>My Trips</h2>
      <form onSubmit={(e) => { e.preventDefault(); addTrip(); }}>
        <input
          type="text"
          placeholder="Trip Name"
          value={newTrip.name}
          onChange={e => setNewTrip({ ...newTrip, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={newTrip.destination}
          onChange={e => setNewTrip({ ...newTrip, destination: e.target.value })}
          required
        />
        <input
          type="date"
          value={newTrip.startDate}
          onChange={e => setNewTrip({ ...newTrip, startDate: e.target.value })}
        />
        <input
          type="date"
          value={newTrip.endDate}
          onChange={e => setNewTrip({ ...newTrip, endDate: e.target.value })}
        />
        <button type="submit" className="btn btn-primary">Add Trip</button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        {trips.map(trip => (
          <div key={trip.id} className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>{trip.name}</h3>
            <p>Destination: {trip.destination}</p>
            <p>Dates: {trip.startDate} to {trip.endDate}</p>
            <h4 style={{ fontWeight: 'semibold', marginTop: '0.5rem' }}>Itinerary:</h4>
            <ul style={{ listStyle: 'disc', paddingLeft: '1rem' }}>
              {trip.itinerary.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
            {/* Add edit itinerary functionality later */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;