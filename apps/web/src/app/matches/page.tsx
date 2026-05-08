'use client';
import { useState } from 'react';

const MOCK_MATCHES = [
  { name: 'Union Rescue Mission', type: 'Shelter + Services', score: 94, dist: '0.4mi', available: true, beds: 8, tags: ['Housing', 'Meals', 'Case Mgmt', 'Free'], color: '#22c55e', reasons: ['Within 0.4mi', 'Matches housing need', 'Has open capacity', 'Free program'] },
  { name: 'PATH Homeless Services', type: 'Housing Navigation', score: 88, dist: '0.9mi', available: true, beds: null, tags: ['Housing', 'Employment', 'Free'], color: '#38bdf8', reasons: ['Matches housing need', 'Matches employment need', 'Short waitlist'] },
  { name: 'Exodus Recovery Center', type: 'Mental Health + Recovery', score: 82, dist: '1.2mi', available: true, beds: null, tags: ['Mental Health', 'Recovery', 'Sliding Scale'], color: '#a855f7', reasons: ['Matches mental health need', 'Matches recovery need', 'Has open capacity'] },
  { name: 'Volunteers of America', type: 'Veteran Services', score: 79, dist: '2.1mi', available: true, beds: 3, tags: ['Veterans', 'Housing', 'Free'], color: '#6366f1', reasons: ['Veteran-specific program', 'Has open capacity', 'Free program'] },
  { name: 'St. Joseph Center', type: 'Comprehensive Services', score: 71, dist: '2.4mi', available: false, beds: null, tags: ['Food', 'Counseling', 'Sliding Scale'], color: '#f59e0b', reasons: ['Matches food need', 'Short waitlist'] },
  { name: 'LA County Mental Health', type: 'Psychiatric Services', score: 65, dist: '3.1mi', available: true, beds: null, tags: ['Psychiatric', 'Mental Health', 'Free'], color: '#ef4444', reasons: ['Matches mental health need', 'Free program'] },
];

export default function MatchesPage() {
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [filterAvailable, setFilterAvailable] = useState(false);

  const results = filterAvailable ? MOCK_MATCHES.filter(m => m.available) : MOCK_MATCHES;

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <a href="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>← Dashboard</a>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#38bdf8' }}>Matched Resources</h1>
            <p style={{ color: '#64748b', margin: '0.25rem 0 0' }}>For John D. · Critical · Housing + Mental Health</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={() => setFilterAvailable(!filterAvailable)}
              style={{ padding: '0.4rem 0.9rem', borderRadius: 999, border: `1px solid ${filterAvailable ? '#22c55e' : '#1e293b'}`, background: filterAvailable ? '#22c55e22' : 'transparent', color: filterAvailable ? '#22c55e' : '#64748b', cursor: 'pointer', fontSize: '0.8rem' }}>
              {filterAvailable ? '✓ Available Only' : 'Show Available Only'}
            </button>
            <button onClick={() => setView(view === 'list' ? 'grid' : 'list')}
              style={{ padding: '0.4rem 0.75rem', background: '#1e293b', border: 'none', borderRadius: 6, color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}>
              {view === 'list' ? '⊞ Grid' : '☰ List'}
            </button>
          </div>
        </div>

        {/* Match Summary Bar */}
        <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: '1.5rem', border: '1px solid #1e293b', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>Total Matches</span><div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1.4rem' }}>{results.length}</div></div>
          <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>High Confidence</span><div style={{ color: '#22c55e', fontWeight: 800, fontSize: '1.4rem' }}>{results.filter(m => m.score >= 80).length}</div></div>
          <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>Beds Available</span><div style={{ color: '#a855f7', fontWeight: 800, fontSize: '1.4rem' }}>{results.filter(m => m.beds && m.beds > 0).reduce((sum, m) => sum + (m.beds || 0), 0)}</div></div>
          <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>Closest</span><div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.4rem' }}>0.4mi</div></div>
        </div>

        {/* Results */}
        <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr' }}>
          {results.map((match) => (
            <div key={match.name} style={{ background: '#0f172a', border: `1px solid ${match.color}33`, borderRadius: 12, padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              {/* Score Badge */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: match.score >= 80 ? '#22c55e' : match.score >= 65 ? '#f59e0b' : '#64748b', color: '#020617', borderRadius: 999, padding: '0.2rem 0.6rem', fontWeight: 800, fontSize: '0.85rem' }}>
                {match.score}% match
              </div>

              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem', paddingRight: '80px' }}>{match.name}</div>
              <div style={{ color: match.color, fontSize: '0.8rem', marginBottom: '0.5rem' }}>{match.type} · {match.dist}</div>

              {/* Match Reasons */}
              <div style={{ marginBottom: '0.75rem' }}>
                {match.reasons.map(r => (
                  <div key={r} style={{ color: '#64748b', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: '#22c55e' }}>✓</span> {r}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {match.tags.map(t => (
                  <span key={t} style={{ padding: '0.15rem 0.5rem', background: '#1e293b', borderRadius: 999, fontSize: '0.72rem', color: '#94a3b8' }}>{t}</span>
                ))}
              </div>

              {/* Action Row */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {match.beds !== null && (
                  <span style={{ color: match.beds > 0 ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: '0.85rem', flex: 1 }}>
                    {match.beds > 0 ? `${match.beds} beds open` : 'Full'}
                  </span>
                )}
                {!match.available && match.beds === null && <span style={{ color: '#f59e0b', fontSize: '0.8rem', flex: 1 }}>Waitlist</span>}
                <button style={{ padding: '0.4rem 0.85rem', background: '#1e293b', border: 'none', borderRadius: 6, color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}>Message</button>
                <button style={{ padding: '0.4rem 0.85rem', background: match.color, color: '#020617', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                  {match.beds !== null && match.beds > 0 ? 'Reserve Bed' : 'Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
