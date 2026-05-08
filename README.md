# 🏡 The Zero Homeless Initiative Hub

California's unified platform connecting people experiencing homelessness with every resource, service, and support they need — in real time.

**Built by The Zero Foundation · Redwood City, CA**

---

## 🚀 Quick Start

```bash
cd apps/web
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture

```
TheZeroHomelessInitiativeHub/
├── apps/
│   └── web/                  # Next.js 14 app (TypeScript)
│       └── src/
│           ├── app/          # App Router pages
│           ├── components/   # Shared UI components
│           ├── lib/          # Firebase, matchmaking, SMS, live data
│           └── types/        # TypeScript types (30+ profile types)
├── .github/workflows/        # CI/CD → Firebase Hosting
└── README.md
```

---

## 👤 User Types Supported

| Category | Types |
|---|---|
| Clients | Homeless individuals & families |
| Case Workers | Licensed case managers, street teams, crisis teams |
| Housing | Shelters, supportive housing, housing authorities, apartment managers |
| Healthcare | Hospitals, clinics, mental health, psychiatric, substance abuse |
| Nonprofits | Nonprofits, foundations, churches, religious orgs |
| Government | Federal agencies (HUD, SAMHSA), state agencies, housing authorities |
| Funding | Grant givers, foundations, HUD programs, ownership programs |
| Services | Food banks, emergency help, legal aid, education, job training |
| Business | Corporations, local businesses, donation resources |

---

## ✨ Features

- **Matchmaking Engine** — AI-powered scoring matching clients to providers by needs, location, availability, and eligibility
- **GPS Search** — "Near Me Now" + city/ZIP search with interactive map
- **Shelter Bed Tracker** — Live bed counts with real-time reservation system
- **Case Management** — Full intake, notes, applications, and document tracking
- **SMS Chat Relay** — In-app messaging that relays to registered cell phones via Twilio
- **Live Data Feeds** — HUD, 211 LA, CA HHS, SAMHSA, Grants.gov (real-time)
- **Multi-Role Dashboards** — Custom dashboards for every user type
- **Advanced Registration Forms** — Step-by-step customizable intake for all 30+ profile types

---

## 🔧 Environment Variables

See `apps/web/.env.example` for all required keys:
- Firebase (auth, database, storage)
- Google Maps API (GPS search)
- Twilio (SMS relay)
- AWS S3 (document storage)

---

## 🚢 Deployment

### Firebase Hosting (auto-deploy on push to main)
GitHub Actions workflow at `.github/workflows/firebase-deploy.yml`

Required GitHub Secrets:
- `FIREBASE_SERVICE_ACCOUNT`
- `NEXT_PUBLIC_FB_API_KEY`
- `NEXT_PUBLIC_FB_AUTH_DOMAIN`
- `NEXT_PUBLIC_FB_PROJECT_ID`

### AWS (documents)
Configure S3 bucket `zero-hub-documents` in `us-west-2` with appropriate IAM role.

---

## 📋 Roadmap

- [ ] Google Maps integration (live map view)
- [ ] HMIS data sync
- [ ] Mobile app (React Native)
- [ ] Offline mode for field workers
- [ ] AI triage assistant
- [ ] Multi-language support (Spanish, Vietnamese, Chinese)

---

*© 2026 The Zero Foundation. Built with purpose.*
