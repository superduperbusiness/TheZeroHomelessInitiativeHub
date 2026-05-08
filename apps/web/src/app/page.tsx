'use client';
import Link from 'next/link';

const ROLE_CARDS = [
  { label: 'I Need Help', href: '/register/client', color: '#38bdf8', icon: '🙏', desc: 'Find housing, food, services & support near you' },
  { label: 'Case Manager', href: '/register/case_manager', color: '#a855f7', icon: '👤', desc: 'Register, manage clients & connect resources' },
  { label: 'Shelter / Housing', href: '/register/shelter_provider', color: '#22c55e', icon: '🏠', desc: 'List beds, manage reservations & availability' },
  { label: 'Service Provider', href: '/register/service_provider', color: '#f59e0b', icon: '🤝', desc: 'Nonprofits, churches, agencies & more' },
  { label: 'Healthcare', href: '/register/healthcare', color: '#ef4444', icon: '⚕️', desc: 'Clinics, hospitals, mental health & recovery' },
  { label: 'Funding & Grants', href: '/register/grant_giver', color: '#6366f1', icon: '💰', desc: 'Foundations, HUD, federal & state programs' },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <section style={{ padding: '4rem 2rem 2rem', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏡</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(135deg, #38bdf8, #a855f7, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          The Zero Homeless Initiative Hub
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: 560, margin: '0 auto 2rem' }}>
          California's unified platform connecting people experiencing homelessness with every resource, service, and support they need — in real time.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Link href="/search" style={{ padding: '0.75rem 1.5rem', borderRadius: 999, background: '#38bdf8', color: '#020617', fontWeight: 700, textDecoration: 'none' }}>
            🗺️ Find Resources Near Me
          </Link>
          <Link href="/dashboard" style={{ padding: '0.75rem 1.5rem', borderRadius: 999, border: '1px solid #a855f7', color: '#a855f7', textDecoration: 'none', fontWeight: 700 }}>
            Dashboard →
          </Link>
        </div>
        <Link href="/login" style={{ color: '#64748b', fontSize: '0.9rem' }}>Already registered? Sign in</Link>
      </section>

      {/* Role Cards */}
      <section style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '2rem', fontWeight: 600 }}>Who are you?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {ROLE_CARDS.map((card) => (
            <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#0f172a', border: `1px solid ${card.color}33`, borderRadius: 12, padding: '1.5rem', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseOver={e => (e.currentTarget.style.borderColor = card.color)}
                onMouseOut={e => (e.currentTarget.style.borderColor = `${card.color}33`)}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{card.icon}</div>
                <h3 style={{ color: card.color, marginBottom: '0.4rem', fontWeight: 700 }}>{card.label}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Stats */}
      <section style={{ padding: '2rem', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Live in California</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'People Served', value: '–', color: '#38bdf8' },
            { label: 'Active Providers', value: '–', color: '#a855f7' },
            { label: 'Open Beds Tonight', value: '–', color: '#22c55e' },
            { label: 'Programs Available', value: '–', color: '#f59e0b' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#0f172a', borderRadius: 12, padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Gallery */}
      <section style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ color: '#94a3b8', marginBottom: '1.5rem', textAlign: 'center' }}>Community in Action</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {[
            { emoji: '🏠', label: 'Transitional Housing' },
            { emoji: '🍽️', label: 'Food Banks' },
            { emoji: '🧠', label: 'Mental Health' },
            { emoji: '⛪', label: 'Faith Communities' },
            { emoji: '🚑', label: 'Crisis Response' },
            { emoji: '📚', label: 'Education Programs' },
            { emoji: '💊', label: 'Recovery Programs' },
            { emoji: '👨‍👩‍👧', label: 'Family Services' },
            { emoji: '🎖️', label: 'Veteran Support' },
            { emoji: '💼', label: 'Job Training' },
            { emoji: '🏥', label: 'Healthcare' },
            { emoji: '🤲', label: 'Volunteers' },
          ].map((item) => (
            <div key={item.label} style={{ background: '#0f172a', borderRadius: 10, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem' }}>{item.emoji}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#334155', fontSize: '0.85rem' }}>
        © 2026 The Zero Foundation · The Zero Homeless Initiative Hub · Redwood City, CA
      </footer>
    </main>
  );
}
