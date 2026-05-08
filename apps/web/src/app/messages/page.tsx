'use client';
import { useState } from 'react';

const MOCK_THREADS = [
  { id: '1', name: 'Maria S. (Client)', avatar: 'M', last: 'Thank you for the referral!', time: '2m ago', unread: 2, online: true },
  { id: '2', name: 'PATH Housing Navigator', avatar: 'P', last: 'We have an opening next week', time: '1h ago', unread: 0, online: true },
  { id: '3', name: 'Union Rescue Mission', avatar: 'U', last: 'Bed confirmed for tonight', time: '3h ago', unread: 1, online: false },
  { id: '4', name: 'Dr. Kim - Mental Health', avatar: 'K', last: "I'll follow up on John's intake", time: '1d ago', unread: 0, online: false },
];

const MOCK_MESSAGES = [
  { from: 'them', text: 'Hi Nathan, just wanted to follow up on John D.', time: '10:01 AM' },
  { from: 'me', text: "Hey! Yes he's been connected to PATH. Waiting on intake appointment.", time: '10:05 AM' },
  { from: 'them', text: 'Great, we have a slot open Thursday at 2pm. Should I send him a text?', time: '10:07 AM' },
  { from: 'me', text: "Yes please — his cell is on file. SMS relay will deliver it.", time: '10:09 AM' },
  { from: 'them', text: 'Thank you for the referral!', time: '10:11 AM' },
];

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState(MOCK_THREADS[0]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  function sendMessage() {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'me', text: input, time: 'Now' }]);
    setInput('');
  }

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>← Dashboard</a>
        <span style={{ fontWeight: 800, color: '#38bdf8' }}>💬 Messages</span>
        <span style={{ background: '#ef444420', color: '#ef4444', padding: '0.2rem 0.6rem', borderRadius: 999, fontSize: '0.75rem' }}>3 unread</span>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 65px)' }}>
        {/* Thread List */}
        <div style={{ width: 280, borderRight: '1px solid #1e293b', overflowY: 'auto', background: '#0a0f1e' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #1e293b' }}>
            <input placeholder="Search messages..." style={{ width: '100%', padding: '0.5rem 0.75rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', fontSize: '0.85rem', boxSizing: 'border-box' }} />
          </div>
          {MOCK_THREADS.map((t) => (
            <div key={t.id} onClick={() => setActiveThread(t)}
              style={{ padding: '1rem', cursor: 'pointer', borderBottom: '1px solid #1e293b', background: activeThread.id === t.id ? '#0f172a' : 'transparent', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#38bdf820', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{t.avatar}</div>
                {t.online && <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#22c55e', border: '2px solid #0a0f1e' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</span>
                  <span style={{ color: '#475569', fontSize: '0.75rem' }}>{t.time}</span>
                </div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.last}</div>
              </div>
              {t.unread > 0 && <div style={{ background: '#38bdf8', color: '#020617', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{t.unread}</div>}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#38bdf820', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{activeThread.avatar}</div>
            <div>
              <div style={{ fontWeight: 700 }}>{activeThread.name}</div>
              <div style={{ color: '#22c55e', fontSize: '0.75rem' }}>{activeThread.online ? '● Online' : 'Offline'}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <button style={{ padding: '0.4rem 0.75rem', background: '#1e293b', border: 'none', borderRadius: 6, color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}>📱 SMS</button>
              <button style={{ padding: '0.4rem 0.75rem', background: '#1e293b', border: 'none', borderRadius: 6, color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}>📋 Profile</button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '65%', background: m.from === 'me' ? '#38bdf8' : '#1e293b', color: m.from === 'me' ? '#020617' : '#e5e7eb', borderRadius: 12, padding: '0.6rem 1rem', fontSize: '0.9rem' }}>
                  <div>{m.text}</div>
                  <div style={{ fontSize: '0.7rem', color: m.from === 'me' ? '#02061799' : '#475569', marginTop: '0.25rem', textAlign: 'right' }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #1e293b', display: 'flex', gap: '0.5rem' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message... (also sends SMS to registered phone)"
              style={{ flex: 1, padding: '0.75rem 1rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', fontSize: '0.9rem' }}
            />
            <button onClick={sendMessage} style={{ padding: '0.75rem 1.25rem', background: '#38bdf8', color: '#020617', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      </div>
    </main>
  );
}
