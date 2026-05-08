'use client';
import { useState } from 'react';

const STEPS = ['Personal Info', 'Housing Status', 'Needs Assessment', 'Documents', 'Review'];

export default function ClientRegistrationPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: '', dob: '', gender: '', phone: '', email: '',
    address: '', city: '', zip: '',
    housingStatus: '', veteranStatus: false, disabilityStatus: false,
    needs: { housing: false, food: false, mentalHealth: false, substanceAbuse: false, medicalCare: false, employment: false, legalAid: false, education: false },
    priorityLevel: 'medium', notes: '', hmisId: '',
    emergencyName: '', emergencyPhone: '', emergencyRelation: '',
    consent: false,
  });

  const update = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>← Home</a>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '1rem 0 0.5rem', color: '#38bdf8' }}>Client Registration</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Register to find housing, services, and support near you.</p>

        {/* Step Progress */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, minWidth: 80, padding: '0.5rem', textAlign: 'center', borderRadius: 8, background: i === step ? '#38bdf8' : i < step ? '#22c55e22' : '#0f172a', color: i === step ? '#020617' : i < step ? '#22c55e' : '#475569', fontWeight: i === step ? 700 : 400, fontSize: '0.8rem' }}>
              {i < step ? '✓ ' : ''}{s}
            </div>
          ))}
        </div>

        {/* Step 0: Personal Info */}
        {step === 0 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Full Name *', key: 'fullName', type: 'text', placeholder: 'First Last' },
              { label: 'Date of Birth', key: 'dob', type: 'date', placeholder: '' },
              { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '(555) 555-5555' },
              { label: 'Email Address', key: 'email', type: 'email', placeholder: 'email@example.com' },
              { label: 'Current Address or Area', key: 'address', type: 'text', placeholder: 'Street, or "Unknown"' },
              { label: 'City', key: 'city', type: 'text', placeholder: 'Los Angeles' },
              { label: 'ZIP Code', key: 'zip', type: 'text', placeholder: '90001' },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{field.label}</label>
                <input type={field.type} value={(form as Record<string, unknown>)[field.key] as string} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', fontSize: '0.95rem', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.veteranStatus} onChange={(e) => update('veteranStatus', e.target.checked)} />
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>U.S. Veteran</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.disabilityStatus} onChange={(e) => update('disabilityStatus', e.target.checked)} />
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Disability</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 1: Housing Status */}
        {step === 1 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Current Housing Situation *</label>
            {['unsheltered', 'sheltered', 'transitional', 'doubled_up', 'at_risk', 'housed'].map((s) => (
              <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: form.housingStatus === s ? '#38bdf820' : '#0f172a', border: `1px solid ${form.housingStatus === s ? '#38bdf8' : '#1e293b'}`, borderRadius: 8, padding: '0.75rem 1rem' }}>
                <input type="radio" name="housingStatus" value={s} checked={form.housingStatus === s} onChange={(e) => update('housingStatus', e.target.value)} />
                <span style={{ color: '#e5e7eb', textTransform: 'capitalize' }}>{s.replace('_', ' ')}</span>
              </label>
            ))}
          </div>
        )}

        {/* Step 2: Needs */}
        {step === 2 && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Select all that apply:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {Object.keys(form.needs).map((need) => (
                <label key={need} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: (form.needs as Record<string, boolean>)[need] ? '#38bdf820' : '#0f172a', border: `1px solid ${(form.needs as Record<string, boolean>)[need] ? '#38bdf8' : '#1e293b'}`, borderRadius: 8, padding: '0.75rem' }}>
                  <input type="checkbox" checked={(form.needs as Record<string, boolean>)[need]} onChange={(e) => update('needs', { ...form.needs, [need]: e.target.checked })} />
                  <span style={{ color: '#e5e7eb', textTransform: 'capitalize', fontSize: '0.9rem' }}>{need.replace(/([A-Z])/g, ' $1')}</span>
                </label>
              ))}
            </div>
            <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>Priority Level</label>
            <select value={form.priorityLevel} onChange={(e) => update('priorityLevel', e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', marginBottom: '1rem' }}>
              <option value="critical">🚨 Critical</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>Additional Notes</label>
            <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={4}
              placeholder="Any additional context or urgent needs..."
              style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#94a3b8' }}>Upload any available documents (optional — we will help you get them if needed):</p>
            {['Government ID', 'Social Security Card', 'Birth Certificate', 'Medical Records', 'VA Documents', 'Income Verification'].map((doc) => (
              <div key={doc} style={{ background: '#0f172a', border: '1px dashed #1e293b', borderRadius: 8, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{doc}</span>
                <button style={{ padding: '0.4rem 0.8rem', background: '#1e293b', border: 'none', borderRadius: 6, color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}>Upload</button>
              </div>
            ))}
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>HMIS ID (if known)</label>
              <input value={form.hmisId} onChange={(e) => update('hmisId', e.target.value)} placeholder="HMIS-XXXXX"
                style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e293b' }}>
            <h3 style={{ marginBottom: '1rem', color: '#38bdf8' }}>Review Your Information</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {[['Name', form.fullName], ['Phone', form.phone], ['Email', form.email], ['City/ZIP', `${form.city} ${form.zip}`], ['Housing Status', form.housingStatus], ['Priority', form.priorityLevel]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                  <span style={{ color: '#64748b', minWidth: 120 }}>{k}:</span>
                  <span style={{ color: '#e5e7eb' }}>{v || '—'}</span>
                </div>
              ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} style={{ marginTop: 3 }} />
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                I consent to The Zero Homeless Initiative Hub storing my information to connect me with services and resources. My data is kept private and shared only with my case manager and matched providers.
              </span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            style={{ padding: '0.75rem 1.5rem', background: step === 0 ? '#0f172a' : '#1e293b', border: 'none', borderRadius: 8, color: step === 0 ? '#334155' : '#e5e7eb', cursor: step === 0 ? 'not-allowed' : 'pointer', fontWeight: 600 }}>
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(step + 1)}
              style={{ padding: '0.75rem 1.5rem', background: '#38bdf8', border: 'none', borderRadius: 8, color: '#020617', fontWeight: 700, cursor: 'pointer' }}>
              Next →
            </button>
          ) : (
            <button disabled={!form.consent}
              style={{ padding: '0.75rem 1.5rem', background: form.consent ? '#22c55e' : '#1e293b', border: 'none', borderRadius: 8, color: form.consent ? '#020617' : '#334155', fontWeight: 700, cursor: form.consent ? 'pointer' : 'not-allowed' }}>
              Submit Registration ✓
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
