# vivo.co — Project Instructions for LLM

> Use this document as the source of truth for understanding the vivo platform. It describes the mission, architecture, conventions, and constraints so any AI agent can work effectively without re-discovering the codebase.

---

## 1. Mission

**vivo.co** is a personal health monitoring platform that connects AI-driven health data analysis with continuous oversight from a chosen doctor. Built for the Lithuanian market with full English localization, it serves patients, doctors, and administrators through role-based dashboards.

The platform is **not** a diagnostic tool — AI provides insights and trend analysis, while a real physician remains responsible for medical decisions. Clear medical disclaimers are mandatory wherever health advice is surfaced.

---

## 2. Brand & Design

- **Name:** vivo (lowercase, no "MyHealthPilot" references anywhere)
- **Domain:** vivo.co
- **Logo:** A circular icon with a heart + medical pulse/EKG line. The image contains no text — the wordmark is not part of the logo. Managed via `src/components/Logo.jsx`.
- **Palette:** White, light blue, soft green. Calm, safe, clinically responsible — avoid futuristic styling.
- **Typography:** System sans-serif (ui-sans-serif, system-ui). Token-based via `src/index.css` → `tailwind.config.js`.
- **Tone:** Professional, trustworthy, calm. Medical disclaimers where appropriate.

---

## 3. Languages & Routing

The app is bilingual with two complete route trees:

| Language | Base path | Example route |
|----------|-----------|--------------|
| Lithuanian (default) | `/` | `/pacientas`, `/gydytojas`, `/admin` |
| English | `/en` | `/en/patient`, `/en/doctor`, `/en/admin` |

### Conventions
- Every page has a Lithuanian version and an English mirror component (e.g., `src/pages/patient/Overview.jsx` → `src/pages/en/patient/Overview.jsx`).
- English layouts live in `src/components/en/` (e.g., `PatientLayoutEn`, `DoctorLayoutEn`, `AdminLayoutEn`).
- English demo data lives in `src/lib/demoDataEn.js`; Lithuanian demo data in `src/lib/demoData.js`.
- Auth pages (`Login`, `Register`, `ForgotPassword`, `ResetPassword`) are shared for both languages except where English-specific versions exist under `src/pages/en/`.
- All user-facing text must be in the correct language for the route tree it belongs to.
- `/pmf` is the admin PMF dashboard (single instance, not localized).

---

## 4. User Roles

### Patient (`/pacientas` or `/en/patient`)
- Dashboard overview with vitals, alerts, and recent history
- AI Health Assistant (chat-based insights, not diagnostics)
- Health Profile (conditions, allergies, chronic issues)
- Measurements (blood pressure, weight, glucose trends)
- Lab Results
- Medications
- Doctor Marketplace (browse/select a monitoring doctor)
- Messages (secure messaging with their doctor)
- Integrations (health devices — OMRON, Apple Health, etc.)
- Subscription (plan management, Stripe-simulated checkout)

### Doctor (`/gydytojas` or `/en/doctor`)
- Overview (patient panel, alerts)
- Patient list
- Reviews, alerts, messages, appointments, plans, revenue, profile, settings (mostly placeholders)

### Admin (`/admin` or `/en/admin`)
- Overview
- Doctors, patients, subscriptions, payments, security, integrations, content, settings (mostly placeholders)

---

## 5. Architecture

### Stack
- **Frontend:** React + Vite + Tailwind CSS
- **UI Components:** shadcn/ui (in `src/components/ui/`)
- **Icons:** lucide-react only
- **State/Data:** Base44 SDK (`@/api/base44Client`) + TanStack React Query
- **Charts:** recharts
- **Auth:** Base44 platform auth (email/password, Google OAuth, OTP verification)
- **Backend:** Base44 BaaS (entities, functions, integrations)

### Key Files
| File | Purpose |
|------|---------|
| `src/App.jsx` | Router — all routes, auth guards, layout wrappers |
| `src/api/base44Client.js` | Pre-initialized Base44 SDK client |
| `src/components/ProtectedRoute.jsx` | Auth guard for protected routes |
| `src/components/PatientLayout.jsx` | Patient sidebar + header shell |
| `src/components/DoctorLayout.jsx` | Doctor sidebar + header shell |
| `src/components/AdminLayout.jsx` | Admin sidebar + header shell |
| `src/components/Logo.jsx` | Centralized logo component |
| `src/components/ScrollToTop.jsx` | Scroll restoration on route change |
| `src/lib/demoData.js` | Lithuanian demo patient/doctor data |
| `src/lib/demoDataEn.js` | English demo patient/doctor data |
| `src/lib/AuthContext.jsx` | Auth provider + loading/error states |
| `src/lib/pmfTracking.js` | PMF visit + registration tracking |
| `src/index.css` | Design tokens (colors, fonts, radius) |
| `tailwind.config.js` | Token → Tailwind class mapping |

### Route Structure (src/App.jsx)
```
/                    → Landing (LT)
/login, /register, /forgot-password, /reset-password
/pmf                 → PMF Dashboard (protected)
/pacientas/*         → Patient routes (protected, PatientLayout)
/gydytojas/*         → Doctor routes (protected, DoctorLayout)
/admin/*             → Admin routes (protected, AdminLayout)
/en                  → Landing (EN)
/en/login, /en/register
/en/patient/*        → Patient routes EN (protected, PatientLayoutEn)
/en/doctor/*         → Doctor routes EN (protected, DoctorLayoutEn)
/en/admin/*          → Admin routes EN (protected, AdminLayoutEn)
*                    → PageNotFound
```

---

## 6. Demo Data

The app uses realistic demo data to showcase the platform:

- **Patient (LT):** Jonas Petrauskas (Lithuanian) — full health profile, measurements, lab results, medications
- **Patient (EN):** John Barter (English) — same structure, translated content
- **Doctor:** Dr. Aistė Kazlauskienė (LT) / Dr. Aistė Kazlauskienė (EN)
- Data files: `src/lib/demoData.js` (LT), `src/lib/demoDataEn.js` (EN)

When editing demo content, update both files to keep them in sync.

---

## 7. PMF (Product-Market Fit) System

Located at `/pmf` — an admin-only dashboard tracking visitor → signup → survey conversion.

### Entities
- **PmfVisit** — daily visit/pageview counts (keyed by `day` string)
- **PmfLead** — email signups with UTM params, referrer, country, registrationType
- **PmfQual** — qualification survey responses (useCase, needWhen, companySite, demoInterest)
- **PmfSettings** — singleton config (adsSpend30d, adClicks30d)

### Key Metrics
- **Fly/Die Score:** `round(100 × (0.6 × clamp(signupRate/0.08) + 0.4 × clamp(surveyRate/0.35)))`
- **QPV (Qualified Per Visit):** surveyed / visitors
- **FLY:** QPV > 1.5% | **ITERATE:** 0.5%–1.5% | **DIE:** < 0.5%

### Tracking
- `trackVisit()` in `src/lib/pmfTracking.js` — called on page load, deduplicated by day via localStorage
- `trackRegistration(email, type)` — called after registration, captures UTM + referrer

### Components
- `src/pages/PmfDashboard.jsx` — main dashboard
- `src/components/pmf/FlyDieBadge.jsx` — FLY (green) / ITERATE (yellow) / DIE (red) badge
- `src/components/pmf/MetricCard.jsx` — metric card with icon

---

## 8. Authentication

- Platform-managed (tokens, sessions, email verification)
- Standard flow: register → OTP → verifyOtp → setToken → hard redirect
- Login: email/password + Google OAuth
- Auth pages: `src/pages/Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`, `ResetPassword.jsx`
- English auth pages: `src/pages/en/Login.jsx`, `Register.jsx`
- Protected routes use `ProtectedRoute` with `<Outlet />` layout pattern
- Hard redirects (`window.location.href`) after auth actions — never `navigate()`

---

## 9. Coding Conventions

- **Imports:** Use `@/` alias (e.g., `@/components/ui/button`, `@/lib/utils`). Never use relative `src/` paths.
- **Components:** Default exports, named same as file. Max ~50 lines per component; split into focused files.
- **Icons:** lucide-react only. If an icon name collides with a component name, alias it (e.g., `Home as HomeIcon`).
- **Images:** Content images (media.base44.com / static.wixstatic.com URLs) use `<Image>` from `@/components/ui/image`, never plain `<img>`.
- **Styling:** Tailwind classes as literal strings. Use design tokens (`bg-primary`, `font-body`) not hardcoded values. No dynamic class names.
- **State:** Base44 SDK for entity CRUD. React Query for query caching/refetching.
- **Errors:** Let errors bubble up (no try/catch) unless it's a user-facing form/auth flow.
- **Realtime:** Entity subscriptions available via `base44.entities.EntityName.subscribe(callback)`.

### Entity SDK
```js
import { base44 } from '@/api/base44Client';
base44.entities.EntityName.list(sort, limit)
base44.entities.EntityName.filter(query, sort, limit)
base44.entities.EntityName.create(data)
base44.entities.EntityName.update(id, data)
base44.entities.EntityName.delete(id)
```

### Auth SDK
```js
base44.auth.me()              // current user
base44.auth.isAuthenticated() // Promise<boolean>
base44.auth.logout()
base44.auth.updateMe(data)    // persist extra user data
```

---

## 10. Payments

- Subscription checkout is currently **simulated** (no live payment provider)
- Subscription page: `src/pages/patient/Subscription.jsx` (LT), `src/pages/en/patient/Subscription.jsx` (EN)
- Available providers in this region: Wix Payments (Base44 Payments) and Stripe
- To enable real payments, use `suggest_payments_installation` with the appropriate provider

---

## 11. Do's and Don'ts

### Do
- Keep both language versions in sync when adding/changing features
- Use the centralized `Logo` component everywhere
- Add clear medical disclaimers where AI health advice is shown
- Follow the calm, clinical design language
- Use design tokens, not hardcoded colors

### Don't
- Don't reference "MyHealthPilot" — the brand is "vivo"
- Don't make the logo image include text (icon only)
- Don't use the AI assistant as a diagnostic tool
- Don't add new npm packages without explicit request
- Don't use `require()` or `module.exports` — this is an ESM/Vite project
- Don't import `cn` from `@/utils` — it comes from `@/lib/utils