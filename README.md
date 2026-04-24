# ZECPATH — Job Portal Frontend

A production-grade job portal web application built with React, Vite, and Tailwind CSS during a 38-day frontend internship. ZECPATH connects candidates and employers through a feature-rich platform with role-based dashboards, ATS, admin panel, payment flows, real-time notifications, scalable Redux state management, smart API caching, and interactive Recharts analytics dashboards.

---

## 🚀 Live Demo

**Vercel:** [https://react-job-portal-ohsk.vercel.app/]

**Test Accounts:**
| Role      | Email                  | Password       |
|-----------|------------------------|----------------|
| Admin     | admin@zecpath.com      | any (6+ chars) |
| Employer  | employer@anything.com  | any (6+ chars) |
| Candidate | any other email        | any (6+ chars) |

---

## 🛠 Tech Stack

| Category       | Technology                        |
|----------------|-----------------------------------|
| Framework      | React 18 + Vite                   |
| Styling        | Tailwind CSS                      |
| Routing        | React Router v6                   |
| HTTP Client    | Axios                             |
| State          | Redux Toolkit + React Context API |
| Caching        | Custom in-memory cache (useCache) |
| Charts         | Recharts                          |
| Auth           | JWT + localStorage                |
| Deployment     | Vercel                            |

---

## ✨ Features

### 🔐 Authentication System
- JWT-based login and registration
- Role-based access: **Candidate**, **Employer**, **Admin**
- Session persistence across page refreshes
- Auto logout after 30 minutes of inactivity
- Token expiry validation before every API call
- Secure token storage with expiry timestamp

### 👤 Candidate Features
- Browse and search jobs with advanced filters
- Debounced keyword search + URL-synced filter state
- Apply for jobs with optimistic UI
- Track and manage applications in My Applications
- Optimistic withdraw — application removed instantly, reverts on failure
- Candidate dashboard with stats
- Resume upload with drag & drop + progress bar
- Profile image upload with live preview
- Full profile editor (experience, education, skills)

### 🏢 Employer Features
- Post jobs with multi-step form
- Manage job listings (edit, close)
- Full ATS (Application Tracking System)
- Shortlist, reject, and schedule interviews
- Employer dashboard with stats, activity feed, and mini trend chart
- Full hiring analytics page with 3 interactive Recharts charts
- Pricing plans with monthly/yearly billing

### 🛡️ Admin Features
- Admin dashboard with 8 platform metrics
- User management — search, filter, suspend, activate, delete
- Job management — search, filter, activate, close, flag
- Analytics page with sparkline charts and distribution bars
- Cross-role access to all dashboards

### 🔔 Notification System
- Event-driven notification context
- Bell icon with live unread count badge
- Notification dropdown (last 5)
- Mark as read / mark all as read
- Auto-generated notifications from user actions
- Full notification history page

### 💳 Payment & Monetization
- Role-specific pricing pages (Candidate & Employer)
- Monthly / Yearly billing toggle with 20% discount
- Checkout form with card validation and auto-formatting
- Payment state management (idle → loading → success/error)
- Test card simulation (success + decline)
- Payment success page with receipt

### 🎨 Theme System
- Three themes: **Light**, **Dark**, **Darker**
- All components use theme variables — zero hardcoded colors
- Theme persists across sessions

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   ├── BottomNav.jsx
│   │   └── StatCard.jsx
│   ├── Jobs/
│   │   ├── JobCard.jsx
│   │   ├── FilterPanel.jsx
│   │   └── MultiStepForm.jsx
│   └── ErrorBoundary.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── AuthProvider.jsx        ← dispatches to Redux store
│   ├── NotificationContext.jsx
│   ├── ThemeContext.jsx
│   └── useAuth.js
├── hooks/
│   ├── useApi.js
│   ├── useAutoRefresh.js
│   ├── useCache.js
│   ├── useDebounce.js
│   ├── useFileUpload.js
│   ├── useJobFilters.js
│   ├── usePagination.js
│   └── useSessionTimeout.js
├── layouts/
│   ├── AppLayout.jsx
│   └── AuthLayout.jsx
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminUsers.jsx
│   │   ├── AdminJobs.jsx
│   │   └── AdminAnalytics.jsx
│   ├── candidate/
│   │   ├── BrowseJobs.jsx
│   │   ├── CandidateDashboard.jsx
│   │   ├── CandidatePricing.jsx
│   │   ├── MyApplications.jsx
│   │   └── Profile.jsx
│   ├── employer/
│   │   ├── Applications.jsx
│   │   ├── EmployerAnalytics.jsx   ← NEW (Day 38)
│   │   ├── EmployerDashboard.jsx   ← UPDATED (Day 38)
│   │   ├── EmployerPricing.jsx
│   │   ├── MyJobs.jsx
│   │   └── PostJob.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── JobDetails.jsx
│   ├── Jobs.jsx
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Network.jsx
│   ├── Notification.jsx
│   ├── NotFound.jsx
│   ├── PaymentSuccess.jsx
│   ├── Register.jsx
│   └── Unauthorized.jsx
├── route/
│   ├── PrivateRoute.jsx
│   └── RoleRoute.jsx
├── services/
│   ├── adminService.js
│   ├── api.js
│   ├── authService.js
│   ├── dashboardService.js        ← UPDATED (Day 38)
│   ├── JobService.js
│   ├── paymentService.js
│   └── uploadService.js
├── store/
│   ├── authSlice.js
│   ├── profileSlice.js
│   ├── uiSlice.js
│   ├── index.js
│   └── hooks.js
├── ui/
│   ├── toast/
│   │   ├── Toast.jsx
│   │   ├── ToastContext.jsx
│   │   ├── ToastProvider.jsx
│   │   └── useToast.js
│   ├── ApiError.jsx
│   ├── Input.jsx
│   ├── Loader.jsx
│   ├── Modal.jsx
│   └── UploadProgress.jsx
└── utils/
    ├── auth.js
    ├── performance.js
    └── permissions.js
```

---

## 🏗️ Architecture Decisions

### Charts & Analytics (Day 38)
Recharts is used for all interactive data visualizations. Charts are loaded only on the analytics page via React lazy loading — zero bundle cost on other pages. All chart data comes through the service layer so switching to a real backend requires only uncommenting one line per function:

```javascript
// Application trend — Line chart
export const fetchApplicationTrend = async () => {
  // const response = await api.get("/employer/analytics/applications-trend");
  // return response.data;
  return new Promise((resolve) => { setTimeout(() => resolve([...]), 900) });
};
```

Three chart types are used: `LineChart` for trends over time, a horizontal `BarChart` for the hiring funnel with per-stage color coding, and a grouped `BarChart` for pipeline comparison across job positions.

### API Caching Strategy (Day 37)
A custom `useCache` hook provides in-memory response caching using a module-level `Map`. Cache entries have a configurable TTL (default 60 seconds):

```javascript
const { getCache, setCache, isFresh, invalidate } = useCache(60000);

const loadJobs = async (forceRefresh = false) => {
  if (!forceRefresh && isFresh("browse-jobs")) {
    setJobs(getCache("browse-jobs"));
    return;
  }
  const data = await fetchJobs();
  setCache("browse-jobs", data);
  setJobs(data);
};
```

### Auto-Refresh Pattern (Day 37)
`useAutoRefresh` runs a callback on a configurable interval, pausing when the browser tab is not visible:

```javascript
useAutoRefresh(() => loadJobs(true), 60000);
```

### Redux Toolkit Store (Day 36)
Global state managed through three slices — `authSlice`, `profileSlice`, `uiSlice`. `AuthProvider` acts as the bridge, dispatching thunks while exposing the same `useAuth()` interface so all existing components work without changes.

### Optimistic UI Pattern
All state-changing actions update the UI immediately and revert on failure:

```javascript
setApplications(prev => prev.filter(app => app.id !== applicationId));
await withdrawApplication(applicationId);
// On failure: setApplications(originalApplications)
```

### Service Layer Pattern
All API calls go through dedicated service files — never directly from components. Backend-ready with real calls commented in alongside each simulation.

### Centralized Permission System
All role checks in `utils/permissions.js`:

```javascript
export const getPermissions = (user) => ({
  canPostJob:     ["employer", "admin"].includes(user?.role),
  canBrowseJobs:  ["candidate", "admin"].includes(user?.role),
  canViewATS:     ["employer", "admin"].includes(user?.role),
  canManageUsers: user?.role === "admin",
});
```

---

## ⚡ Performance Optimizations

| Technique | Applied To |
|-----------|------------|
| `React.memo` | StatCard, JobCard, FilterPanel, Checkbox |
| `useCallback` | BrowseJobs handlers, JobCard handlers |
| `useMemo` | sortedJobs, filteredJobs, activeFilters, paginatedItems |
| Lazy loading | All route-level pages via `React.lazy()` |
| Code splitting | Automatic via Vite + lazy routes |
| Debouncing | Search inputs (400ms delay) |
| Static data outside components | FilterPanel options, StatCard color map |
| Redux selectors | Prevent unnecessary re-renders via memoized selectors |
| In-memory caching | Job listings cached for 60s — zero re-fetch on navigation |
| Background refresh | Silent auto-refetch every 60s — no loading spinner |
| Tab visibility check | Auto-refresh pauses when tab is not visible |
| Chart lazy loading | Recharts only loads on analytics page visit |

---

## 🔒 Security Features

| Feature | Implementation |
|---------|----------------|
| Route protection | `PrivateRoute` + `RoleRoute` |
| Token expiry | Checked before every API call |
| Session timeout | 30 min inactivity auto-logout |
| 401 handling | `session:expired` CustomEvent → toast → redirect |
| 403 handling | `session:forbidden` CustomEvent → toast |
| Unauthorized page | Clean 403 UI with role context |
| Auth data cleanup | All keys cleared on logout including `tokenExpiry` |

---

## 🔗 API Integration

**External API:** [Arbeitnow Job Board API](https://www.arbeitnow.com/api/job-board-api)

All other features use simulated service functions that match real backend patterns. Switching to a real backend requires uncommenting 2 lines per service function.

**Axios instance** (`services/api.js`):
- Base URL from `VITE_API_BASE_URL` environment variable
- 10 second timeout
- Auto-attach Bearer token on every request
- Token expiry check before every request
- Global 401/403 error handling via CustomEvents

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/zecpath-frontend.git
cd zecpath-frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE_URL=https://www.arbeitnow.com/api" > .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📅 Development Timeline

| Days  | Focus Area                                          |
|-------|-----------------------------------------------------|
| 7–10  | React hooks, API integration, component basics      |
| 11–12 | Tailwind CSS, responsive layouts, landing page      |
| 13–16 | Authentication, protected routes, sessions          |
| 17    | Role-based dashboard system                         |
| 18–19 | Job module, multi-step forms, candidate profile     |
| 20–23 | Polish, Axios integration, API service layer        |
| 24–25 | Dashboards, ATS system                              |
| 26–27 | Advanced search & filters, pagination               |
| 28–29 | Notifications system, payment flows                 |
| 30–31 | File uploads, multi-role dashboard                  |
| 32–33 | Admin panel, performance optimization               |
| 34–35 | Security & stability, production readiness          |
| 36    | Redux Toolkit — global state management             |
| 37    | API caching, optimistic UI, auto-refresh            |
| 38    | Charts & analytics UI — Recharts integration        |

---

## ✅ Day 36 — State Management Architecture

### Objective
Introduce scalable global state management using Redux Toolkit to replace scattered `useState` across components.

### What Was Implemented
- `authSlice` — user, token, authLoading, authError with async thunks for login, register, session restore
- `profileSlice` — candidate profile data and upload states
- `uiSlice` — global loading overlay and page title
- `store/hooks.js` — typed selectors for clean component access
- `AuthProvider` kept as bridge layer — zero breaking changes to existing components

**Files Created:** `src/store/` (authSlice, profileSlice, uiSlice, index, hooks)
**Files Modified:** `src/main.jsx`, `src/context/AuthProvider.jsx`

### Concepts Learned
Redux Toolkit slice architecture · `createAsyncThunk` · `extraReducers` builder pattern · typed selectors · gradual Context → Redux migration

---

## ✅ Day 37 — API Caching & Optimistic UI

### Objective
Improve UX performance — eliminate redundant network requests, make UI actions feel instant, keep data fresh automatically.

### What Was Implemented
- `useCache` hook — module-level Map with configurable TTL, `isFresh`, `invalidate`, `invalidateAll`
- `useAutoRefresh` hook — interval-based silent background refresh, pauses on hidden tabs
- `BrowseJobs` + `Jobs` — caching, auto-refresh, manual refresh button, shared cache key
- `MyApplications` — connected to real service, optimistic withdraw with full revert
- `JobService` — `fetchMyApplications()` and `withdrawApplication()` added

**Files Created:** `src/hooks/useCache.js`, `src/hooks/useAutoRefresh.js`
**Files Modified:** `JobService.js`, `Jobs.jsx`, `BrowseJobs.jsx`, `MyApplications.jsx`

### Concepts Learned
In-memory caching with TTL · cache invalidation after mutations · tab visibility API · optimistic UI with rollback · shared cache keys across pages

---

## ✅ Day 38 — Charts & Analytics UI

### Objective
Visualize hiring insights for employers using interactive Recharts components integrated into a dedicated analytics dashboard.

### What Was Implemented

**`EmployerAnalytics.jsx`** — New standalone analytics page at `/app/employer-analytics` with:
- **Application Trend** — `LineChart` showing applications, shortlisted, and hired per week over 8 weeks. Three lines with distinct colors allow at-a-glance comparison of funnel efficiency over time.
- **Hiring Funnel** — Horizontal `BarChart` with 6 stages (Applied → Reviewed → Shortlisted → Interview → Offer → Hired). Each bar is color-coded per stage. A conversion rate summary is displayed below.
- **Candidate Pipeline** — Grouped `BarChart` comparing applied, shortlisted, and hired counts across all active job positions side by side.
- Summary stat chips at the top — Total Applications, Hired, Conversion Rate, Avg. Time to Hire — all derived from chart data.

**`EmployerDashboard.jsx`** — Mini `LineChart` added between stat cards and the applications table. Shows the 8-week application trend at a glance with a "Full Analytics →" button linking to the dedicated page.

**`dashboardService.js`** — Three new backend-ready functions:
- `fetchApplicationTrend()` — weekly applications, shortlists, hires
- `fetchHiringFunnel()` — candidate counts per recruitment stage
- `fetchCandidatePipeline()` — applied/shortlisted/hired per job position

### Chart Design Decisions
- `ResponsiveContainer` wraps every chart — fully responsive on all screen sizes
- Recharts `Tooltip` styled with consistent `borderRadius` and `fontSize`
- Funnel bars use individual `Cell` components for per-bar color control
- X-axis labels on the pipeline chart are angled at -25° to prevent overlap on mobile
- All chart data flows through the service layer — backend-ready with two-line swap

### Files Created
```
src/pages/employer/EmployerAnalytics.jsx   ← full analytics page with 3 charts
```

### Files Modified
```
src/services/dashboardService.js    ← 3 chart data functions added
src/pages/employer/EmployerDashboard.jsx  ← mini trend chart + analytics link
App.jsx                             ← employer-analytics route registered
```

### Concepts Learned
- Recharts `LineChart`, `BarChart`, `FunnelChart` composition
- `ResponsiveContainer` for adaptive chart sizing
- `Cell` component for per-bar color overrides
- Deriving summary metrics from raw chart data
- Lazy-loading chart pages to keep main bundle size small
- Integrating chart libraries with existing theme and service layer

---

## 👨‍💻 Developer

**Ali Aman** — Frontend Developer (React.js)
- Location: Feroke, Kozhikode
- Internship: ZECPATH Frontend (Days 7–38)

---
