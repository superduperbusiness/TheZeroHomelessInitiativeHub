'use client';
import { useState } from 'react';

const PROVIDER_TYPES = [
  { value: 'shelter_provider', label: '🏠 Shelter Provider', desc: 'Emergency, transitional, or permanent shelter' },
  { value: 'case_manager', label: '👤 Case Manager', desc: 'Individual licensed case managers' },
  { value: 'nonprofit', label: '🤝 Nonprofit Organization', desc: '501(c)(3) service organizations' },
  { value: 'church', label: '⛪ Church / Faith Community', desc: 'Faith-based service providers' },
  { value: 'religious_org', label: '🕌 Religious Organization', desc: 'All faiths and denominations' },
  { value: 'mental_health_program', label: '🧠 Mental Health Program', desc: 'Counseling, therapy, psychiatric services' },
  { value: 'mental_health_counselor', label: '💭 Mental Health Counselor', desc: 'Individual licensed counselors & therapists' },
  { value: 'psychiatric_provider', label: '💊 Psychiatric Provider', desc: 'Psychiatrists, psychiatric NPs' },
  { value: 'substance_abuse_inpatient', label: '🏥 Substance Abuse – Inpatient', desc: 'Residential inpatient treatment programs' },
  { value: 'substance_abuse_outpatient', label: '🏢 Substance Abuse – Outpatient', desc: 'IOP, OP treatment programs' },
  { value: 'substance_abuse_livein', label: '🏡 Substance Abuse – Live-In', desc: 'Sober living, live-in recovery homes' },
  { value: 'supportive_housing', label: '🏘️ Supportive Housing', desc: 'Permanent supportive housing providers' },
  { value: 'housing_agency', label: '🏛️ Housing Agency', desc: 'Government and nonprofit housing agencies' },
  { value: 'housing_authority', label: '📋 Housing Authority', desc: 'Public housing authorities (Section 8, HUD)' },
  { value: 'apartment_manager', label: '🔑 Apartment Manager', desc: 'Property managers offering affordable units' },
  { value: 'homeowner', label: '🏠 Homeowner', desc: 'Homeowners offering rooms or ADUs' },
  { value: 'ownership_program', label: '📜 Homeownership Program', desc: 'First-time buyer & ownership assistance' },
  { value: 'hud_resource', label: '🇺🇸 HUD Resource Team', desc: 'HUD-approved housing counseling agencies' },
  { value: 'street_team', label: '🚶 Street Outreach Team', desc: 'Mobile outreach teams serving unsheltered' },
  { value: 'crisis_team', label: '🚨 Crisis Response Team', desc: 'Mobile crisis intervention teams' },
  { value: 'emergency_help', label: '🆘 Emergency Help Provider', desc: 'Emergency assistance & crisis services' },
  { value: 'hospital', label: '🏥 Hospital', desc: 'Acute care hospitals & health systems' },
  { value: 'healthcare', label: '⚕️ Healthcare Provider', desc: 'Clinics, FQHCs, community health centers' },
  { value: 'therapist', label: '🛋️ Therapist', desc: 'Licensed therapists in private or group practice' },
  { value: 'food_bank', label: '🍽️ Food Bank / Pantry', desc: 'Food distribution and meal programs' },
  { value: 'educational_program', label: '📚 Educational Program', desc: 'GED, literacy, vocational training' },
  { value: 'assisted_living', label: '👴 Assisted Living', desc: 'Assisted living & long-term care programs' },
  { value: 'local_business', label: '🏪 Local Business', desc: 'Businesses offering jobs, donations, or space' },
  { value: 'corporation', label: '🏢 Corporation', desc: 'Corporate social responsibility programs' },
  { value: 'foundation', label: '💎 Foundation', desc: 'Private and community foundations' },
  { value: 'grant_giver', label: '💰 Grant Provider', desc: 'Funders offering grants to organizations' },
  { value: 'funding_resource', label: '📊 Funding Resource', desc: 'Financial assistance & benefits navigation' },
  { value: 'donation_resource', label: '🎁 Donation Resource', desc: 'Goods, clothing, furniture donations' },
  { value: 'state_agency', label: '🏛️ State Agency', desc: 'California state government programs' },
  { value: 'federal_agency', label: '🇺🇸 Federal Agency / Program', desc: 'Federal departments and programs' },
  { value: 'service_provider', label: '🛠️ Service Provider', desc: 'General human services organizations' },
  { value: 'other', label: '➕ Other', desc: 'Other resource or service type' },
];

const STEPS = ['Organization Type', 'Basic Info', 'Location', 'Programs & Services', 'Capacity & Hours', 'Contact & Review'];

export default function ProviderRegistrationPage() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [form, setForm] = useState({
    orgName: '', contactName: '', email: '', phone: '', website: '',
    ein: '', licenseNumber: '', established: '',
    address: '', city: '', state: 'CA', zip: '', county: '',
    bio: '', mission: '', languages: [] as string[],
    programs: [{ name: '', description: '', eligibility: '', capacity: '', cost: 'free', tags: '' }],
    totalBeds: '', availableBeds: '', reservableBeds: '',
    emergencyBeds: '', familyBeds: '', veteranBeds: '',
    lgbtqFriendly: false, petFriendly: false, sobrietyRequired: false,
    intakeHours: '', emergencyContact: '', fax: '',
    acceptsReferrals: true, applicationRequired: false,
    fundingSources: '', certifications: '',
    consent: false,
  });

  const update = (key: string, val: unknown) => setForm(f => ({ ...f, [key]: val }));
  const isShelter = selectedType === 'shelter_provider';
  const hasPrograms = !['apartment_manager', 'homeowner', 'local_business', 'corporation'].includes(selectedType);

  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>← zerofoundationusa.org</a>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '1rem 0 0.25rem', color: '#a855f7' }}>Provider Registration</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Join the Zero Hub network and connect with clients who need your services.</p>

        {/* Steps */}
        <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, minWidth: 70, padding: '0.4rem', textAlign: 'center', borderRadius: 8, background: i === step ? '#a855f7' : i < step ? '#22c55e22' : '#0f172a', color: i === step ? '#fff' : i < step ? '#22c55e' : '#475569', fontWeight: i === step ? 700 : 400, fontSize: '0.72rem' }}>
              {i < step ? '✓ ' : ''}{s}
            </div>
          ))}
        </div>

        {/* Step 0: Type Selection */}
        {step === 0 && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Select the type that best describes your organization:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.6rem', maxHeight: 480, overflowY: 'auto', paddingRight: '0.5rem' }}>
              {PROVIDER_TYPES.map((t) => (
                <label key={t.value} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', background: selectedType === t.value ? '#a855f720' : '#0f172a', border: `1px solid ${selectedType === t.value ? '#a855f7' : '#1e293b'}`, borderRadius: 8, padding: '0.75rem' }}>
                  <input type="radio" name="providerType" value={t.value} checked={selectedType === t.value} onChange={() => setSelectedType(t.value)} style={{ marginTop: 3 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.label}</div>
                    <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{t.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Organization / Program Name *', key: 'orgName', placeholder: 'Zero Hope Shelter' },
              { label: 'Primary Contact Name *', key: 'contactName', placeholder: 'Jane Smith' },
              { label: 'Email Address *', key: 'email', placeholder: 'admin@yourorg.org' },
              { label: 'Phone Number *', key: 'phone', placeholder: '(555) 555-5555' },
              { label: 'Website', key: 'website', placeholder: 'https://yourorg.org' },
              { label: 'EIN / Tax ID', key: 'ein', placeholder: '12-3456789' },
              { label: 'License / Certification Number', key: 'licenseNumber', placeholder: 'If applicable' },
              { label: 'Year Established', key: 'established', placeholder: '2010' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.88rem' }}>{f.label}</label>
                <input value={(form as Record<string, unknown>)[f.key] as string} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '0.7rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Mission Statement</label>
              <textarea value={form.mission} onChange={e => update('mission', e.target.value)} rows={3} placeholder="Briefly describe your mission..."
                style={{ width: '100%', padding: '0.7rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Street Address *', key: 'address', placeholder: '123 Main St' },
              { label: 'City *', key: 'city', placeholder: 'Los Angeles' },
              { label: 'ZIP Code *', key: 'zip', placeholder: '90001' },
              { label: 'County', key: 'county', placeholder: 'Los Angeles County' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.88rem' }}>{f.label}</label>
                <input value={(form as Record<string, unknown>)[f.key] as string} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '0.7rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.88rem' }}>Languages Supported</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['English', 'Spanish', 'Vietnamese', 'Mandarin', 'Korean', 'Armenian', 'Tagalog', 'Arabic', 'Russian', 'ASL'].map(lang => (
                  <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', background: form.languages.includes(lang) ? '#a855f720' : '#0f172a', border: `1px solid ${form.languages.includes(lang) ? '#a855f7' : '#1e293b'}`, borderRadius: 6, padding: '0.3rem 0.7rem', fontSize: '0.85rem' }}>
                    <input type="checkbox" checked={form.languages.includes(lang)} onChange={e => update('languages', e.target.checked ? [...form.languages, lang] : form.languages.filter(l => l !== lang))} />
                    {lang}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Programs */}
        {step === 3 && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {hasPrograms && form.programs.map((prog, i) => (
              <div key={i} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#a855f7', fontSize: '1rem' }}>Program {i + 1}</h3>
                  {i > 0 && <button onClick={() => update('programs', form.programs.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>Remove</button>}
                </div>
                {[
                  { label: 'Program Name', key: 'name', placeholder: 'Emergency Shelter Program' },
                  { label: 'Description', key: 'description', placeholder: 'Brief description of this program' },
                  { label: 'Eligibility Requirements', key: 'eligibility', placeholder: 'Adults 18+, low income...' },
                  { label: 'Capacity (# people)', key: 'capacity', placeholder: '50' },
                  { label: 'Tags (comma separated)', key: 'tags', placeholder: 'shelter, men, meals, free' },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: '0.75rem' }}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.85rem' }}>{f.label}</label>
                    <input value={prog[f.key as keyof typeof prog] as string} onChange={e => {
                      const progs = [...form.programs];
                      progs[i] = { ...progs[i], [f.key]: e.target.value };
                      update('programs', progs);
                    }} placeholder={f.placeholder}
                      style={{ width: '100%', padding: '0.6rem', background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 6, color: '#e5e7eb', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Cost</label>
                  <select value={prog.cost} onChange={e => { const progs = [...form.programs]; progs[i] = { ...progs[i], cost: e.target.value }; update('programs', progs); }}
                    style={{ padding: '0.6rem', background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 6, color: '#e5e7eb' }}>
                    <option value="free">Free</option>
                    <option value="sliding_scale">Sliding Scale</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
            ))}
            {hasPrograms && (
              <button onClick={() => update('programs', [...form.programs, { name: '', description: '', eligibility: '', capacity: '', cost: 'free', tags: '' }])}
                style={{ padding: '0.75rem', background: '#1e293b', border: '1px dashed #334155', borderRadius: 8, color: '#94a3b8', cursor: 'pointer', width: '100%' }}>
                + Add Another Program
              </button>
            )}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Funding Sources</label>
              <input value={form.fundingSources} onChange={e => update('fundingSources', e.target.value)} placeholder="HUD, CDBG, Title IV, Private donations..."
                style={{ width: '100%', padding: '0.7rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
            </div>
          </div>
        )}

        {/* Step 4: Capacity & Hours */}
        {step === 4 && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {isShelter && (
              <>
                <p style={{ color: '#94a3b8', margin: 0 }}>Shelter Bed Information</p>
                {[
                  { label: 'Total Beds', key: 'totalBeds' },
                  { label: 'Available Beds Tonight', key: 'availableBeds' },
                  { label: 'Reservable Beds', key: 'reservableBeds' },
                  { label: 'Emergency Beds', key: 'emergencyBeds' },
                  { label: 'Family Beds', key: 'familyBeds' },
                  { label: 'Veteran Beds', key: 'veteranBeds' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.88rem' }}>{f.label}</label>
                    <input type="number" value={(form as Record<string, unknown>)[f.key] as string} onChange={e => update(f.key, e.target.value)} placeholder="0"
                      style={{ width: '100%', padding: '0.7rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  {[['lgbtqFriendly', '🏳️‍🌈 LGBTQ+ Friendly'], ['petFriendly', '🐾 Pet Friendly'], ['sobrietyRequired', '🚫 Sobriety Required']].map(([key, label]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, padding: '0.75rem', fontSize: '0.82rem' }}>
                      <input type="checkbox" checked={(form as Record<string, unknown>)[key] as boolean} onChange={e => update(key, e.target.checked)} />
                      {label}
                    </label>
                  ))}
                </div>
              </>
            )}
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.88rem' }}>Intake / Service Hours</label>
              <input value={form.intakeHours} onChange={e => update('intakeHours', e.target.value)} placeholder="Mon-Fri 8am-5pm, Sat 9am-1pm"
                style={{ width: '100%', padding: '0.7rem', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, color: '#e5e7eb', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.acceptsReferrals} onChange={e => update('acceptsReferrals', e.target.checked)} />
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Accepts Referrals</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.applicationRequired} onChange={e => update('applicationRequired', e.target.checked)} />
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Application Required</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div style={{ background: '#0f172a', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e293b' }}>
            <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>Review & Submit</h3>
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {[
                ['Type', PROVIDER_TYPES.find(t => t.value === selectedType)?.label || selectedType],
                ['Organization', form.orgName],
                ['Contact', form.contactName],
                ['Email', form.email],
                ['Phone', form.phone],
                ['Location', `${form.address}, ${form.city}, ${form.state} ${form.zip}`],
                ['Programs', `${form.programs.length} program(s) listed`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                  <span style={{ color: '#64748b', minWidth: 120 }}>{k}:</span>
                  <span style={{ color: '#e5e7eb' }}>{v || '—'}</span>
                </div>
              ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.consent} onChange={e => update('consent', e.target.checked)} style={{ marginTop: 3 }} />
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                I certify that the information provided is accurate and that my organization is authorized to offer the listed services. I agree to The Zero Foundation's terms of service and data sharing policy for the Zero Homeless Initiative Hub.
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
            <button onClick={() => setStep(step + 1)} disabled={step === 0 && !selectedType}
              style={{ padding: '0.75rem 1.5rem', background: (step === 0 && !selectedType) ? '#1e293b' : '#a855f7', border: 'none', borderRadius: 8, color: (step === 0 && !selectedType) ? '#334155' : '#fff', fontWeight: 700, cursor: (step === 0 && !selectedType) ? 'not-allowed' : 'pointer' }}>
              Next →
            </button>
          ) : (
            <button disabled={!form.consent}
              style={{ padding: '0.75rem 1.5rem', background: form.consent ? '#22c55e' : '#1e293b', border: 'none', borderRadius: 8, color: form.consent ? '#020617' : '#334155', fontWeight: 700, cursor: form.consent ? 'pointer' : 'not-allowed' }}>
              Submit for Review ✓
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
