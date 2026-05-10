'use client';
import { useState } from 'react';

const MOCK_MATCHES = [
  {
    id: '1', name: 'PATH Homes LA', type: 'Supportive Housing', score: 94, dist: '0.4mi',
    tags: ['Housing', 'Case Mgmt', 'Mental Health', 'Free'], beds: 3, status: 'open',
    reasons: ['Within 0.4km', 'Matches: housing, mental health', 'Has open capacity', 'Free program'],
    color: '#22c55e', phone: '(213) 555-0101', hours: 'Mon–Fri 8am–5pm',
  },
  {
    id: '2', name: 'St. Joseph Center', type: 'Nonprofit Services', score: 87, dist: '0.8mi',
    tags: ['Food', 'Counseling', 'Employment', 'Free'], beds: null, status: 'open',
    reasons: ['Within 0.8km', 'Matches: food, employment', 'Has open capacity', 'Free program'],
    color: '#38bdf8', phone: '(310) 555-0202', hours: 'Mon–Sat 9am–6pm',
  },
  {
    id: '3', name: 'Didi Hirsch Mental Health', type: 'Mental Health Program', score: 82, dist: '1.1mi',
    tags: ['Mental Health', 'Crisis', 'Sliding Scale'], beds: null, status: 'open',
    reasons: ['Matches: mental health', 'Crisis services available', 'Sliding scale cost'],
    color: '#a855f7', phone: '(800) 555-0303', hours: '24/7',
  },
  {
    id: '4', name: 'Union Rescue Mission', type: 'Shelter', score: 79, dist: '1.4mi',
    tags: ['Men', 'Meals', 'Shelter', 'Free'], beds: 8, status: 'open',
    reasons: ['Matches: housing, food', '8 beds available', 'Free program'],
    color: '#f59e0b', phone: '(213) 555-0404', hours: 'Daily 6pm–8am',
  },
  {
    id: '5', name: 'Exodus Recovery', type: 'Substance Abuse – Outpatient', score: 71, dist: '2.0mi',
    tags: ['Substance Abuse', 'Mental Health', 'Sliding Scale'], beds: null, status: 'waitlist',
    reasons: ['Matches: substance abuse', 'Short waitlist (6 people)', 'Dual diagnosis capable'],
    color: '#ef4444', phone: '(323) 555-0505', hours: 'Mon–Fri 7am–9pm',
  },
  {
    id: '6', name: 'Volunteers of America', type: 'Veteran Services', score: 68, dist: '2.3mi',
    tags: ['Veterans', 'Housing', 'Employment', 'Free'], beds: 4, status: 'open',
    reasons: ['Veteran-specific program', '4 beds available', 'Free program'],
    color: '#6366f1', phone: '(213) 555-0606', hours: 'Mon–Fri 8am–5pm',
  },
];

type Match = typeof MOCK_MATCHES[0];

export default function MatchesPage() {
  const [selected, setSelected] = useState<Match | null>(null);
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Housing', 'Mental Health', 'Substance Abuse', 'Food', 'Veterans', 'Crisis'];
  const filtered = filter === 'All' ? MOCK_MATCHES : MOCK_MATCHES.filter(m => m.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

  function handleApply(id: string) {
    setApplied(prev => new Set(Array.from(prev).concat(id)));
  }

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>← Dashboard</a>
        <span style={{ fontWeight: 800, color: '#22c55e' }}>🤝 My Matches</span>
        <span style={{ background: '#22c55e20', color: '#22c55e', padding: '0.2rem 0.6rem', borderRadius: 999, fontSize: '0.75rem' }}>{MOCK_MATCHES.length} matches found</span>
      </nav>

      <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
        {/* Match List */}
        <div style={{ flex: selected ? '0 0 420px' : 1, overflowY: 'auto', padding: '1.5rem', borderRight: selected ? '1px solid #1e293b' : 'none' }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '0.35rem 0.8rem', borderRadius: 999, border: `1px solid ${filter === f ? '#22c55e' : '#1e293b'}`, background: filter === f ? '#22c55e20' : 'transparent', color: filter === f ? '#22c55e' : '#64748b', cursor: 'pointer', fontSize: '0.82rem' }}>
                {f}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {filtered.map(m => (
              <div key={m.id} onClick={() => setSelected(m === selected ? null : m)}
                style={{ background: '#0f172a', border: `2px solid ${selected?.id === m.id ? m.color : m.color + '33'}`, borderRadius: 12, padding: '1.25rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{m.name}</div>
                    <div style={{ color: m.color, fontSize: '0.8rem' }}>{m.type} · 📍 {m.dist}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: m.score >= 80 ? '#22c55e' : m.score >= 60 ? '#f59e0b' : '#94a3b8' }}>{m.score}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>match score</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {m.tags.map(t => (
                    <span key={t} style={{ padding: '0.15rem 0.5rem', background: '#1e293b', borderRadius: 999, fontSize: '0.72rem', color: '#94a3b8' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: m.status === 'open' ? '#22c55e' : '#f59e0b' }}>
                    {m.status === 'open' ? '● Open' : '⏳ Waitlist'}
                    {m.beds !== null && ` · ${m.beds} beds`}
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); handleApply(m.id); }}
                    style={{ padding: '0.35rem 0.9rem', background: applied.has(m.id) ? '#22c55e20' : m.color, border: applied.has(m.id) ? `1px solid #22c55e` : 'none', borderRadius: 8, color: applied.has(m.id) ? '#22c55e' : '#020617', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>
                    {applied.has(m.id) ? '✓ Applied' : m.beds !== null ? 'Reserve Bed' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '1rem', fontSize: '0.9rem' }}>← Back to list</button>
            <div style={{ background: '#0f172a', borderRadius: 14, border: `2px solid ${selected.color}`, padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ margin: '0 0 0.25rem', color: selected.color }}>{selected.name}</h2>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>{selected.type}</p>
                </div>
                <div style={{ textAlign: 'center', background: '#020617', borderRadius: 10, padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22c55e' }}>{selected.score}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>match score</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  ['📍 Distance', selected.dist],
                  ['📞 Phone', selected.phone],
                  ['🕒 Hours', selected.hours],
                  ['🛏️ Beds', selected.beds !== null ? `${selected.beds} available` : 'N/A'],
                  ['💰 Cost', selected.tags.includes('Free') ? 'Free' : 'Sliding Scale'],
                  ['📊 Status', selected.status === 'open' ? '✅ Open' : '⏳ Waitlist'],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: '#0a0f1e', borderRadius: 8, padding: '0.75rem' }}>
                    <div style={{ color: '#64748b', fontSize: '0.78rem', marginBottom: '0.2rem' }}>{k}</div>
                    <div style={{ color: '#e5e7eb', fontSize: '0.9rem', fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.88rem' }}>Why this match?</h4>
                {selected.reasons.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ color: '#22c55e' }}>✓</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{r}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => handleApply(selected.id)}
                  style={{ flex: 1, padding: '0.75rem', background: applied.has(selected.id) ? '#22c55e20' : selected.color, border: applied.has(selected.id) ? '1px solid #22c55e' : 'none', borderRadius: 8, color: applied.has(selected.id) ? '#22c55e' : '#020617', fontWeight: 700, cursor: 'pointer' }}>
                  {applied.has(selected.id) ? '✓ Applied / Reserved' : selected.beds !== null ? '🛏️ Reserve a Bed' : '🤝 Connect / Apply'}
                </button>
                <a href="/messages" style={{ padding: '0.75rem 1rem', background: '#1e293b', borderRadius: 8, color: '#94a3b8', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center' }}>💬 Message</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
