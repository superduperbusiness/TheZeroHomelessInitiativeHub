'use client';
import { useState } from 'react';

const PROVIDER_TYPES = [
  { value: 'shelter_provider', label: '🏠 Shelter / Emergency Housing', color: '#22c55e' },
  { value: 'case_manager', label: '👤 Case Manager', color: '#a855f7' },
  { value: 'nonprofit', label: '🤝 Nonprofit Organization', color: '#38bdf8' },
  { value: 'church', label: '⛪ Church / Faith Community', color: '#f59e0b' },
  { value: 'mental_health_program', label: '🧠 Mental Health Program', color: '#6366f1' },
  { value: 'substance_abuse_inpatient', label: '💊 Substance Abuse - Inpatient', color: '#ef4444' },
  { value: 'substance_abuse_outpatient', label: '💊 Substance Abuse - Outpatient', color: '#f97316' },
  { value: 'substance_abuse_livein', label: '🏡 Substance Abuse - Live-In', color: '#84cc16' },
  { value: 'healthcare', label: '⚕️ Healthcare / Clinic', color: '#06b6d4' },
  { value: 'hospital', label: '🏥 Hospital', color: '#dc2626' },
  { value: 'psychiatric_provider', label: '🧬 Psychiatric Provider', color: '#7c3aed' },
  { value: 'mental_health_counselor', label: '💬 Mental Health Counselor', color: '#2563eb' },
  { value: 'therapist', label: '🛋️ Therapist', color: '#9333ea' },
  { value: 'food_bank', label: '🍽️ Food Bank', color: '#ca8a04' },
  { value: 'supportive_housing', label: '🏘️ Supportive Housing', color: '#16a34a' },
  { value: 'housing_authority', label: '🏛️ Housing Authority', color: '#0891b2' },
  { value: 'apartment_manager', label: '🔑 Apartment Manager', color: '#64748b' },
  { value: 'street_team', label: '🚶 Street Outreach Team', color: '#f59e0b' },
  { value: 'crisis_team', label: '🚨 Crisis Response Team', color: '#ef4444' },
  { value: 'grant_giver', label: '💰 Grant / Funding Source', color: '#eab308' },
  { value: 'foundation', label: '🏆 Foundation', color: '#a855f7' },
  { value: 'corporation', label: '🏢 Corporation / Business', color: '#64748b' },
  { value: 'local_business', label: '🏪 Local Business', color: '#22c55e' },
  { value: 'state_agency', label: '🏛️ State Agency', color: '#3b82f6' },
  { value: 'federal_agency', label: '🇺🇸 Federal Agency / Department', color: '#1d4ed8' },
  { value: 'educational_program', label: '📚 Educational Program', color: '#8b5cf6' },
  { value: 'emergency_help', label: '🆘 Emergency Help Services', color: '#ef4444' },
  { value: 'assisted_living', label: '🧓 Assisted Living', color: '#06b6d4' },
  { value: 'ownership_program', label: '🏠 Homeownership Program', color: '#16a34a' },
  { value: 'hud_resource', label: '🏗️ HUD Resource Team', color: '#0369a1' },
  { value: 'donation_resource', label: '🎁 Donation Resource', color: '#d97706' },
  { value: 'religious_org', label: '✝️ Religious Organization', color: '#92400e' },
  { value: 'other', label: '➕ Other Service Provider', color: '#475569' },
];

const STEPS = ['Type', 'Organization', 'Services', 'Location', 'Programs', 'Review'];

export default function ProviderRegistrationPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    providerType: '',
    orgName: '', contactName: '', email: '', phone: '', website: '',
    description: '', taxId: '', licenseNumber: '', certifications: '',
    languages: [] as string[],
    address: '', city: '', state: 'CA', zip: '',
    serviceRadius: '10',
    programs: [{ name: '', description: '', cost: 'free', capacity: '', tags: '' }],
    // Shelter specific
    totalBeds: '', availableBeds: '', reservableBeds: '',
    lgbtqFriendly: false, petFriendly: false, sobrietyRequired: false, veteranBeds: '', familyBeds: '',
    intakeHours: '',
    // Grant specific
    grantAmount: '', grantDeadline: '', eligibility: '',
    // Hours
    monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '',
    consent: false,
  });

  const update = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));
  const selected = PROVIDER_TYPES.find(p => p.value === form.providerType);
  const isShelter = form.providerType === 'shelter_provider';
  const isGrant = form.providerType === 'grant_giver' || form.providerType === 'foundation';

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>← Home</a>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '1rem 0 0.25rem', color: '#a855f7' }}>Provider Registration</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Register your organization to connect with clients and the Zero Hub network.</p>

        {/* Progress */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {STEPS.map((s, i) => (
            <div key={s} onClick={() => i < step && setStep(i)}
              style={{ flex: 1, minWidth: 70, padding: '0.4rem', textAlign: 'center', borderRadius: 8,
                background: i === step ? (selected?.color || '#a855f7') : i < step ? '#22c55e22' : '#0f172a',
                color: i === step ? '#020617' : i < step ? '#22c55e' : '#475569',
                fontWeight: i === step ? 700 : 400, fontSize: '0.78rem',
                cursor: i < step ? 'pointer' : 'default' }}>
              {i < step ? '✓ ' : ''}{s}
            </div>
          ))}
        </div>

        {/* Step 0: Type Selection */}
        {step === 0 && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>What type of organization are you?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
              {PROVIDER_TYPES.map((pt) => (
                <div key={pt.value} onClick={() => update('providerType', pt.value)}
                  style={{ padding: '0.75rem 1rem', borderRadius: 8, cursor: 'pointer',
                    background: form.providerType === pt.value ? `${pt.color}22` : '#0f172a',
                    border: `1px solid ${form.providerType === pt.value ? pt.color : '#1e293b'}`,
                    color: form.providerType === pt.value ? pt.color : '#94a3b8',
                    fontSize: '0.85rem', fontWeight: form.providerType === pt.value ? 700 : 400 }}>
                  {pt.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Organization Info */}
        {step === 1 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {selected && <div style={{ padding: '0.6rem 1rem', background: `${selected.color}22`, border: `1px solid ${selected.color}`, borderRadius: 8, color: selected.color, fontSize: '0.9rem' }}>{selected.label}</div>}
            {[
              { label: 'Organization Name *', key: 'orgName', type: 'text', placeholder: 'Full legal name' },
              { label: 'Primary Contact Name *', key: 'contactName', type: 'text', placeholder: 'First Last' },
              { label: 'Email *', key: 'email', type: 'email', placeholder: 'contact@org.org' },
              { label: 'Phone *', key: 'phone', type: 'tel', placeholder: '(555) 555-5555' },
              { label: 'Website', key: 'website', type: 'url', placeholder: 'https://yourorg.org' },
              { label: 'Tax ID / EIN', key: 'taxId', type: 'text', placeholder: 'XX-XXXXXXX' },
              { label: 'License / Certification Number', key: 'licenseNumber', type: 'text', placeholder: 'If applicable' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{f.label}</label>
                <input type={f.type} value={(form as Record<string, unknown>)[f.key] as string}
                  onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Organization Description</label>
              <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={4}
                placeholder="Describe your mission and services..."
                style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Languages Served</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['English', 'Spanish', 'Vietnamese', 'Chinese', 'Korean', 'Tagalog', 'Armenian', 'Farsi', 'Other'].map(lang => (
                  <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer',
                    padding: '0.3rem 0.7rem', borderRadius: 999, fontSize: '0.8rem',
                    background: form.languages.includes(lang) ? '#a855f722' : '#0f172a',
                    border: `1px solid ${form.languages.includes(lang) ? '#a855f7' : '#1e293b'}`,
                    color: form.languages.includes(lang) ? '#a855f7' : '#64748b' }}>
                    <input type="checkbox" checked={form.languages.includes(lang)}
                      onChange={e => update('languages', e.target.checked ? [...form.languages, lang] : form.languages.filter(l => l !== lang))}
                      style={{ display: 'none' }} />
                    {lang}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Services */}
        {step === 2 && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Shelter-specific fields */}
            {isShelter && (
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1.25rem', border: '1px solid #22c55e33' }}>
                <h3 style={{ color: '#22c55e', marginBottom: '1rem', fontWeight: 700 }}>🏠 Shelter Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  {[['Total Beds', 'totalBeds'], ['Available Tonight', 'availableBeds'], ['Reservable Beds', 'reservableBeds'], ['Veteran Beds', 'veteranBeds'], ['Family Beds', 'familyBeds']].map(([label, key]) => (
                    <div key={key}>
                      <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{label}</label>
                      <input type="number" value={(form as Record<string, unknown>)[key] as string} onChange={e => update(key, e.target.value)}
                        style={{ width: '100%', padding: '0.6rem', background: '#020617', border: '1px solid #1e293b', borderRadius: 6, color: '#e5e7eb', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', marginBottom: '0.4rem' }}>Intake Hours</label>
                  <input value={form.intakeHours} onChange={e => update('intakeHours', e.target.value)} placeholder="e.g. 6pm - 10pm daily"
                    style={{ width: '100%', padding: '0.6rem', background: '#020617', border: '1px solid #1e293b', borderRadius: 6, color: '#e5e7eb', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {[['lgbtqFriendly', 'LGBTQ+ Friendly'], ['petFriendly', 'Pet Friendly'], ['sobrietyRequired', 'Sobriety Required']].map(([key, label]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#94a3b8', fontSize: '0.9rem' }}>
                      <input type="checkbox" checked={(form as Record<string, unknown>)[key] as boolean} onChange={e => update(key, e.target.checked)} />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Grant-specific fields */}
            {isGrant && (
              <div style={{ background: '#0f172a', borderRadius: 10, padding: '1.25rem', border: '1px solid #eab30833' }}>
                <h3 style={{ color: '#eab308', marginBottom: '1rem', fontWeight: 700 }}>💰 Funding Details</h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {[['Typical Grant Amount', 'grantAmount', '$10,000 - $50,000'], ['Application Deadline', 'grantDeadline', 'MM/DD/YYYY'], ['Eligibility Requirements', 'eligibility', 'Who can apply?']].map(([label, key, ph]) => (
                    <div key={key}>
                      <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{label}</label>
                      <input value={(form as Record<string, unknown>)[key] as string} onChange={e => update(key, e.target.value)} placeholder={ph}
                        style={{ width: '100%', padding: '0.6rem', background: '#020617', border: '1px solid #1e293b', borderRadius: 6, color: '#e5e7eb', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hours of Operation */}
            <div style={{ background: '#0f172a', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e293b' }}>
              <h3 style={{ color: '#94a3b8', marginBottom: '1rem', fontWeight: 700 }}>🕐 Hours of Operation</h3>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: 90, color: '#64748b', fontSize: '0.85rem', textTransform: 'capitalize' }}>{day}</span>
                    <input value={(form as Record<string, unknown>)[day] as string} onChange={e => update(day, e.target.value)}
                      placeholder="e.g. 9am - 5pm or Closed"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', background: '#020617', border: '1px solid #1e293b', borderRadius: 6, color: '#e5e7eb', fontSize: '0.85rem' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Street Address *', key: 'address', placeholder: '123 Main St' },
              { label: 'City *', key: 'city', placeholder: 'Los Angeles' },
              { label: 'ZIP Code *', key: 'zip', placeholder: '90001' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{f.label}</label>
                <input value={(form as Record<string, unknown>)[f.key] as string} onChange={e => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Service Radius (miles)</label>
              <input type="range" min="1" max="100" value={form.serviceRadius} onChange={e => update('serviceRadius', e.target.value)}
                style={{ width: '100%', accentColor: selected?.color || '#a855f7' }} />
              <div style={{ textAlign: 'center', color: selected?.color || '#a855f7', fontWeight: 700 }}>{form.serviceRadius} miles</div>
            </div>
            <div style={{ background: '#0f172a', borderRadius: 10, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1e293b', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '2rem' }}>📍</div>
              <div style={{ color: '#475569', fontSize: '0.85rem' }}>Map preview loads with Google Maps API key</div>
            </div>
          </div>
        )}

        {/* Step 4: Programs */}
        {step === 4 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#94a3b8', fontWeight: 700, margin: 0 }}>Programs & Services Offered</h3>
              <button onClick={() => update('programs', [...form.programs, { name: '', description: '', cost: 'free', capacity: '', tags: '' }])}
                style={{ padding: '0.4rem 0.8rem', background: selected?.color || '#a855f7', color: '#020617', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                + Add Program
              </button>
            </div>
            {form.programs.map((prog, i) => (
              <div key={i} style={{ background: '#0f172a', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem' }}>Program {i + 1}</span>
                  {form.programs.length > 1 && (
                    <button onClick={() => update('programs', form.programs.filter((_, j) => j !== i))}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
                  )}
                </div>
                {[['Program Name', 'name', 'e.g. Emergency Shelter Beds'], ['Description', 'description', 'What does this program offer?'], ['Capacity', 'capacity', 'e.g. 25'], ['Tags (comma-separated)', 'tags', 'e.g. housing, free, families']].map(([label, key, ph]) => (
                  <div key={key} style={{ marginBottom: '0.6rem' }}>
                    <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{label}</label>
                    <input value={(prog as Record<string, string>)[key]} onChange={e => {
                      const updated = [...form.programs];
                      (updated[i] as Record<string, string>)[key] = e.target.value;
                      update('programs', updated);
                    }} placeholder={ph}
                      style={{ width: '100%', padding: '0.6rem', background: '#020617', border: '1px solid #1e293b', borderRadius: 6, color: '#e5e7eb', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Cost</label>
                  <select value={prog.cost} onChange={e => { const updated = [...form.programs]; updated[i].cost = e.target.value; update('programs', updated); }}
                    style={{ width: '100%', padding: '0.6rem', background: '#020617', border: '1px solid #1e293b', borderRadius: 6, color: '#e5e7eb' }}>
                    <option value="free">Free</option>
                    <option value="sliding_scale">Sliding Scale</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e293b' }}>
            <h3 style={{ color: selected?.color || '#a855f7', marginBottom: '1rem' }}>Review Your Registration</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {[
                ['Type', selected?.label],
                ['Organization', form.orgName],
                ['Contact', form.contactName],
                ['Email', form.email],
                ['Phone', form.phone],
                ['Location', `${form.city}, CA ${form.zip}`],
                ['Programs', `${form.programs.filter(p => p.name).length} listed`],
                ...(isShelter ? [['Total Beds', form.totalBeds], ['Available Tonight', form.availableBeds]] : []),
              ].map(([k, v]) => (
                <div key={k as string} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                  <span style={{ color: '#64748b', minWidth: 140 }}>{k}:</span>
                  <span style={{ color: '#e5e7eb' }}>{(v as string) || '—'}</span>
                </div>
              ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.consent} onChange={e => update('consent', e.target.checked)} style={{ marginTop: 3 }} />
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                I certify that the information provided is accurate. I agree to The Zero Hub's provider terms of service and privacy policy. My organization's information will be visible to clients searching for services.
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
            <button onClick={() => setStep(step + 1)} disabled={step === 0 && !form.providerType}
              style={{ padding: '0.75rem 1.5rem', background: (step === 0 && !form.providerType) ? '#1e293b' : (selected?.color || '#a855f7'), border: 'none', borderRadius: 8, color: (step === 0 && !form.providerType) ? '#334155' : '#020617', fontWeight: 700, cursor: (step === 0 && !form.providerType) ? 'not-allowed' : 'pointer' }}>
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
