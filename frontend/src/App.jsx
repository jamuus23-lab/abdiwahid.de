import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

export default function App() {
  const [query, setQuery] = useState('Amsterdam Centraal')
  const [stations, setStations] = useState([])
  const [departures, setDepartures] = useState([])
  const [loading, setLoading] = useState(false)

  async function search() {
    setLoading(true)
    setDepartures([])
    try {
      const res = await fetch(`${API_BASE}/api/transport/station?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      setStations(data || [])
    } catch (err) {
      console.error(err)
      setStations([])
    } finally {
      setLoading(false)
    }
  }

  async function loadDepartures(stopId) {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/transport/departures?stopId=${encodeURIComponent(stopId)}&duration=30`)
      const data = await res.json()
      setDepartures(data || [])
    } catch (err) {
      console.error(err)
      setDepartures([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>abdiwahid transit (starter)</h1>
      <div className="controls">
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={search} disabled={loading}>Search stations</button>
      </div>

      <section>
        <h2>Stations</h2>
        {stations.length === 0 && <p>No stations. Try a search.</p>}
        <ul>
          {stations.map((s) => (
            <li key={s.id}>
              <strong>{s.name}</strong> {s.id && <em>({s.id})</em>}<br />
              <button onClick={() => loadDepartures(s.id)}>Show departures</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Departures</h2>
        {departures.length === 0 && <p>No departures loaded.</p>}
        <ul>
          {departures.map((d, i) => (
            <li key={i}>
              <strong>{d.line?.product || d.line?.name || d.name || d.category}</strong>
              {' '}to {d.direction || d.destination || d.stop?.name}<br />
              planned: {d.when || d.plannedWhen || 'n/a'}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
