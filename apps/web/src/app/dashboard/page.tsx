'use client';
import Link from 'next/link';

const TABS = ['Overview', 'My Clients', 'Resources', 'Messages', 'Applications', 'Reports'];

const MOCK_CLIENTS = [
  { name: 'John D.', status: 'Critical', need: 'Housing + Mental Health', lastContact: '2h ago', matched: 3 },
  { name: 'Maria S.', status: 'High', need: 'Shelter + Food', lastContact: '1d ago', matched: 5 },
  { name: 'Robert K.', status: 'Medium', need: 'Employment + Housing', lastContact: '3d ago', matched: 2 },
  { name: 'Tanya W.', status: 'High', need: 'Recovery + Shelter', lastContact: '5h ago', matched: 4 },
];

const STATUS_COLORS: Record<string, string> = {
  Critical: '#ef4444',
  High: '#f59e0b',
  Medium: '#38bdf8',
  Low: '#22c55e',
};

export default function DashboardPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      {/* Top Nav */}
      <nav style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontWeight: 800, color: '#38bdf8', textDecoration: 'none', fontSize: '1.05rem' }}>🏡 The Zero Homeless Initiative</Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ background: '#22c55e22', color: '#22c55e', padding: '0.25rem 0.75rem', borderRadius: 999, fontSize: '0.8rem' }}>● Online</span>
          <Link href="/messages" style={{ color: '#94a3b8', textDecoration: 'none' }}>💬 Messages</Link>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>N</div>
        </div>
      </nav>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 65px)' }}>
        {/* Sidebar */}
        <aside style={{ width: 220, background: '#0a0f1e', borderRight: '1px solid #1e293b', padding: '1.5rem 1rem', flexShrink: 0 }}>
          {[
            { icon: '📊', label: 'Overview', href: '/dashboard' },
            { icon: '👥', label: 'My Clients', href: '/dashboard/clients' },
            { icon: '🗺️', label: 'Find Resources', href: '/search' },
            { icon: '💬', label: 'Messages', href: '/messages' },
            { icon: '📋', label: 'Applications', href: '/dashboard/applications' },
            { icon: '📄', label: 'Reports', href: '/dashboard/reports' },
            { icon: '⚙️', label: 'Settings', href: '/settings' },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', borderRadius: 8, color: '#94a3b8', textDecoration: 'none', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <h1 style={{ fontWeight: 800, marginBottom: '0.25rem' }}>Good morning, Nathan 👋</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Here's what's happening with your clients today.</p>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'Active Clients', value: '24', color: '#38bdf8', icon: '👥' },
              { label: 'Critical Cases', value: '4', color: '#ef4444', icon: '🚨' },
              { label: 'Pending Apps', value: '11', color: '#f59e0b', icon: '📋' },
              { label: 'Matches Found', value: '37', color: '#22c55e', icon: '🤝' },
              { label: 'Open Beds Nearby', value: '18', color: '#a855f7', icon: '🏠' },
            ].map((s) => (
              <div key={s.label} style={{ background: '#0f172a', borderRadius: 10, padding: '1.25rem', border: `1px solid ${s.color}22` }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{s.icon}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Client List */}
          <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontWeight: 700, margin: 0 }}>Priority Clients</h2>
              <Link href="/dashboard/clients/new" style={{ padding: '0.4rem 0.9rem', background: '#38bdf8', color: '#020617', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
                + Register Client
              </Link>
            </div>
            {MOCK_CLIENTS.map((client, i) => (
              <div key={client.name} style={{ padding: '1rem 1.5rem', borderBottom: i < MOCK_CLIENTS.length - 1 ? '1px solid #1e293b' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {client.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{client.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{client.need}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: STATUS_COLORS[client.status], fontSize: '0.8rem', fontWeight: 700 }}>● {client.status}</span>
                  <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{client.lastContact}</span>
                  <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>{client.matched} matches</span>
                  <button style={{ padding: '0.3rem 0.7rem', background: '#1e293b', border: 'none', borderRadius: 6, color: '#e5e7eb', cursor: 'pointer', fontSize: '0.8rem' }}>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
