'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: 800, color: '#38bdf8', textDecoration: 'none' }}>🏡 zerofoundationusa.org</Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['About', '/about'], ['Search', '/search'], ['Register', '/register/client'], ['Sign In', '/login']].map(([l, h]) => (
            <Link key={l} href={h} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>{l}</Link>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏡</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(135deg, #38bdf8, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            The Zero Foundation
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            We believe homelessness is solvable. Our mission is to connect every person experiencing homelessness with the resources, support, and community they need to thrive.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            { icon: '🎯', title: 'Our Mission', text: 'End homelessness in California by building the most comprehensive, accessible, and real-time resource network ever created.' },
            { icon: '👁️', title: 'Our Vision', text: 'A California where every person has a safe, stable place to call home — and the community support to stay there.' },
            { icon: '💡', title: 'Our Approach', text: 'Technology + compassion. We connect people to existing resources faster and more effectively through intelligent matchmaking and real-time data.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 14, padding: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{card.icon}</div>
              <h3 style={{ color: '#38bdf8', marginBottom: '0.75rem' }}>{card.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, margin: 0 }}>{card.text}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 14, padding: '2.5rem', marginBottom: '3rem' }}>
          <h2 style={{ color: '#a855f7', marginBottom: '1.5rem' }}>What We've Built</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Profile Types', value: '38+', desc: 'Every type of provider and client' },
              { label: 'Live Data Sources', value: '5+', desc: 'HUD, 211, SAMHSA, Grants.gov, CA HHS' },
              { label: 'Match Factors', value: '12+', desc: 'Location, needs, capacity, eligibility' },
              { label: 'Service Categories', value: '20+', desc: 'Housing, health, food, jobs & more' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>{s.value}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{s.label}</div>
                <div style={{ color: '#64748b', fontSize: '0.82rem' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Ready to Join?</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Whether you need help, provide services, or want to support the mission — there's a place for you.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register/client" style={{ padding: '0.75rem 1.5rem', background: '#38bdf8', color: '#020617', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>I Need Help</Link>
            <Link href="/register/provider" style={{ padding: '0.75rem 1.5rem', background: '#a855f7', color: '#fff', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>I Provide Services</Link>
            <Link href="/search" style={{ padding: '0.75rem 1.5rem', border: '1px solid #1e293b', color: '#94a3b8', borderRadius: 999, fontWeight: 600, textDecoration: 'none' }}>Search Resources</Link>
          </div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#334155', borderTop: '1px solid #0f172a', fontSize: '0.85rem' }}>
        © 2026 The Zero Foundation · zerofoundationusa.org · Redwood City, CA
      </footer>
    </main>
  );
}
