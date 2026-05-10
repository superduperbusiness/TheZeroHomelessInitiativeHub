'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <Link href="/" style={{ fontWeight: 800, color: '#38bdf8', textDecoration: 'none', marginBottom: '2rem', fontSize: '1.2rem' }}>🏡 zerofoundationusa.org</Link>

      <div style={{ width: '100%', maxWidth: 420, background: '#0f172a', borderRadius: 16, border: '1px solid #1e293b', overflow: 'hidden' }}>
        <div style={{ display: 'flex' }}>
          {(['signin', 'signup'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, padding: '1rem', background: tab === t ? '#38bdf820' : 'transparent', border: 'none', borderBottom: `2px solid ${tab === t ? '#38bdf8' : '#1e293b'}`, color: tab === t ? '#38bdf8' : '#64748b', fontWeight: tab === t ? 700 : 400, cursor: 'pointer', fontSize: '0.95rem' }}>
              {t === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.5rem' }}>
          {tab === 'signup' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.88rem' }}>I am a...</label>
              <select value={role} onChange={e => setRole(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb' }}>
                <option value="client">Person Seeking Help (Client)</option>
                <option value="case_manager">Case Manager</option>
                <option value="shelter_provider">Shelter Provider</option>
                <option value="nonprofit">Nonprofit / Service Org</option>
                <option value="healthcare">Healthcare Provider</option>
                <option value="grant_giver">Funder / Grant Provider</option>
                <option value="other">Other Organization</option>
              </select>
            </div>
          )}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.88rem' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              style={{ width: '100%', padding: '0.7rem', background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.88rem' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: '100%', padding: '0.7rem', background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
          </div>
          <button style={{ width: '100%', padding: '0.85rem', background: '#38bdf8', border: 'none', borderRadius: 8, color: '#020617', fontWeight: 800, cursor: 'pointer', fontSize: '1rem' }}>
            {tab === 'signin' ? 'Sign In →' : 'Create Account →'}
          </button>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/register/client" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>
              Need a full registration form? → <span style={{ color: '#38bdf8' }}>Register here</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
