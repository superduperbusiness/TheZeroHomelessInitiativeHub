'use client';
import { useState } from 'react';

const MOCK_RESULTS = [
  { name: 'LA Mission Shelter', type: 'Shelter', beds: 12, dist: '0.4mi', tags: ['Men', 'Meals', 'Free'], color: '#22c55e' },
  { name: 'Exodus Recovery Center', type: 'Mental Health', beds: null, dist: '0.8mi', tags: ['Mental Health', 'Substance Abuse', 'Sliding Scale'], color: '#a855f7' },
  { name: 'Union Rescue Mission', type: 'Shelter + Services', beds: 3, dist: '1.2mi', tags: ['All Genders', 'Families', 'Free'], color: '#38bdf8' },
  { name: 'PATH Homeless Services', type: 'Housing Navigation', beds: null, dist: '1.5mi', tags: ['Housing', 'Case Mgmt', 'Free'], color: '#f59e0b' },
  { name: 'St. Joseph Center', type: 'Nonprofit Services', beds: null, dist: '2.1mi', tags: ['Food', 'Counseling', 'Employment'], color: '#ef4444' },
  { name: 'Volunteers of America', type: 'Veteran Services', beds: 5, dist: '2.4mi', tags: ['Veterans', 'Housing', 'Free'], color: '#6366f1' },
];

const FILTERS = ['All', 'Shelter', 'Mental Health', 'Substance Abuse', 'Housing', 'Food', 'Veterans', 'Healthcare', 'Grants'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);

  function handleNearMe() {
    setLocating(true);
    navigator.geolocation?.getCurrentPosition(
      () => { setLocating(false); setLocated(true); },
      () => { setLocating(false); }
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>← Home</a>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '1rem 0', color: '#38bdf8' }}>Find Resources</h1>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, ZIP, or service..."
            style={{ flex: 1, minWidth: 200, padding: '0.75rem 1rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', fontSize: '1rem' }}
          />
          <button
            onClick={handleNearMe}
            style={{ padding: '0.75rem 1.25rem', background: located ? '#22c55e' : '#38bdf8', color: '#020617', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            {locating ? '📡 Locating...' : located ? '✅ Near Me' : '📍 Near Me Now'}
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '0.4rem 0.9rem', borderRadius: 999, border: `1px solid ${filter === f ? '#38bdf8' : '#1e293b'}`, background: filter === f ? '#38bdf820' : 'transparent', color: filter === f ? '#38bdf8' : '#64748b', cursor: 'pointer', fontSize: '0.85rem' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Map Placeholder */}
        <div style={{ background: '#0f172a', borderRadius: 12, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #1e293b', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🗺️</div>
          <div style={{ color: '#475569' }}>Interactive map loads with Google Maps API key</div>
          <div style={{ color: '#334155', fontSize: '0.8rem' }}>Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to enable</div>
        </div>

        {/* Results */}
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {MOCK_RESULTS.map((r) => (
            <div key={r.name} style={{ background: '#0f172a', border: `1px solid ${r.color}33`, borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{r.name}</div>
                <div style={{ color: r.color, fontSize: '0.8rem', marginBottom: '0.4rem' }}>{r.type} · {r.dist}</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {r.tags.map((t) => (
                    <span key={t} style={{ padding: '0.15rem 0.5rem', background: '#1e293b', borderRadius: 999, fontSize: '0.75rem', color: '#94a3b8' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                {r.beds !== null && (
                  <span style={{ color: r.beds > 0 ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: '0.9rem' }}>
                    {r.beds > 0 ? `${r.beds} beds open` : 'Full'}
                  </span>
                )}
                <button style={{ padding: '0.4rem 0.9rem', background: r.color, color: '#020617', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                  {r.beds !== null ? 'Reserve Bed' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
