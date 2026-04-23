# ZECPATH — Job Portal Frontend

A production-grade job portal web application built with React, Vite, and Tailwind CSS during a 37-day frontend internship. ZECPATH connects candidates and employers through a feature-rich platform with role-based dashboards, ATS, admin panel, payment flows, real-time notifications, scalable Redux state management, and smart API caching with optimistic UI updates.

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
- Employer dashboard with stats and activity feed
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
│   ├── useAutoRefresh.js       ← NEW (Day 37)
│   ├── useCache.js             ← NEW (Day 37)
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
│   │   ├── BrowseJobs.jsx      ← UPDATED (Day 37)
│   │   ├── CandidateDashboard.jsx
│   │   ├── CandidatePricing.jsx
│   │   ├── MyApplications.jsx  ← UPDATED (Day 37)
│   │   └── Profile.jsx
│   ├── employer/
│   │   ├── Applications.jsx
│   │   ├── EmployerDashboard.jsx
│   │   ├── EmployerPricing.jsx
│   │   ├── MyJobs.jsx
│   │   └── PostJob.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── JobDetails.jsx
│   ├── Jobs.jsx                ← UPDATED (Day 37)
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
│   ├── dashboardService.js
│   ├── JobService.js           ← UPDATED (Day 37)
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

### API Caching Strategy (Day 37)
A custom `useCache` hook provides in-memory response caching using a module-level `Map`. Cache entries have a configurable TTL (default 60 seconds). The hook exposes `isFresh()`, `getCache()`, `setCache()`, and `invalidate()` — giving components full control over when to serve cached data and when to fetch fresh:

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

`Jobs.jsx` and `BrowseJobs.jsx` share the same cache key (`"browse-jobs"`), so navigating between the two pages never triggers a duplicate network request within the TTL window.

### Auto-Refresh Pattern (Day 37)
`useAutoRefresh` runs a callback on a configurable interval. It only fires when the browser tab is visible, preventing wasted background requests:

```javascript
// Silently refetch every 60 seconds — no loading spinner shown
useAutoRefresh(() => loadJobs(true), 60000);
```

### Optimistic UI Pattern
All state-changing actions update the UI immediately and revert on failure:

```javascript
// Remove immediately
setApplications(prev => prev.filter(app => app.id !== applicationId));
await withdrawApplication(applicationId);
// On failure: restore original list
setApplications(originalApplications);
```

### Redux Toolkit Store (Day 36)
Global state is managed through a structured Redux store with three dedicated slices:

```
store/
├── authSlice.js    — user, token, authLoading, authError + login/register/logout thunks
├── profileSlice.js — candidate profile data, upload states
├── uiSlice.js      — global loading, page title
├── index.js        — configureStore combining all slices
└── hooks.js        — typed selectors (selectUser, selectAuthLoading, etc.)
```

### Service Layer Pattern
All API calls go through dedicated service files — never directly from components. Each service function is backend-ready with real API calls commented out:

```javascript
export const fetchJobs = async () => {
  // Real backend: uncomment below
  // const response = await api.get("/jobs");
  // return response.data;

  return new Promise((resolve) => { ... });
};
```

### Centralized Permission System
All role-based logic lives in `utils/permissions.js`:

```javascript
export const getPermissions = (user) => ({
  canPostJob:     ["employer", "admin"].includes(user?.role),
  canBrowseJobs:  ["candidate", "admin"].includes(user?.role),
  canViewATS:     ["employer", "admin"].includes(user?.role),
  canManageUsers: user?.role === "admin",
});
```

### Event-Driven Notifications
The notification system uses React Context as an event bus. Any component can call `addNotification()` — the bell, dropdown, and notifications page all read from the same source:

```javascript
const { addNotification } = useNotifications();
addNotification(NOTIF_TYPES.JOB_APPLIED, "Applied!", "You applied for React Developer.");
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

---

## ✅ Day 36 — State Management Architecture

### Objective
Introduce scalable global state management using Redux Toolkit to replace scattered `useState` across components.

### What Was Implemented

**Store Structure:**
- `authSlice` — manages user, token, authLoading, authError with async thunks for login, register, and session restore
- `profileSlice` — manages candidate profile data and upload states
- `uiSlice` — manages global loading overlay and page title
- `store/hooks.js` — typed selectors for clean component access

**Key Decisions:**
- `AuthProvider` kept as bridge layer — dispatches to Redux, exposes same `useAuth()` interface
- All existing components work unchanged — zero breaking changes
- ThemeContext and NotificationContext kept in React Context
- Gradual migration path — components can adopt Redux selectors progressively

**Files Created:**
```
src/store/
├── authSlice.js    ← login, register, restoreSession, logout thunks
├── profileSlice.js ← profile data + upload state
├── uiSlice.js      ← global loading, page title
├── index.js        ← configureStore
└── hooks.js        ← typed selectors
```

**Files Modified:**
```
src/main.jsx                 ← Redux Provider added
src/context/AuthProvider.jsx ← now dispatches to Redux
```

### Concepts Learned
- Redux Toolkit slice architecture
- `createAsyncThunk` for async operations
- `extraReducers` with builder pattern
- Typed selectors for memoized state access
- Gradual migration strategy — Context → Redux without breaking changes

---

## ✅ Day 37 — API Caching & Optimistic UI

### Objective
Improve UX performance with smart data handling — eliminate redundant network requests, make UI actions feel instant, and keep data fresh automatically in the background.

### What Was Implemented

**`useCache` hook** (`src/hooks/useCache.js`)
- Module-level `Map` stores API responses with a timestamp
- Configurable TTL — default 60 seconds
- `isFresh(key)` — true if entry exists and is within TTL
- `getCache(key)` — returns cached data instantly
- `setCache(key, data)` — stores data with current timestamp
- `invalidate(key)` — removes a specific entry (called after mutations)
- `invalidateAll()` — clears everything (used on logout)

**`useAutoRefresh` hook** (`src/hooks/useAutoRefresh.js`)
- Runs a callback on a configurable interval using `setInterval`
- Checks `document.visibilityState` before each tick — pauses when tab is hidden
- Callback stored in a `useRef` so changing it never restarts the interval
- Full cleanup on component unmount

**Pages updated:**
- `BrowseJobs.jsx` — cache check on load, silent background refresh, manual refresh button with last-updated timestamp
- `Jobs.jsx` — same caching and auto-refresh pattern, shared cache key with `BrowseJobs`
- `MyApplications.jsx` — connected to real service (was hardcoded), optimistic withdraw with full revert on failure

**Service updated:**
- `JobService.js` — added `fetchMyApplications()` and `withdrawApplication()` — both backend-ready

### Caching Behaviour

| Scenario | Result |
|----------|--------|
| First visit to Jobs or BrowseJobs | Fetch from API → store in cache |
| Navigate between Jobs ↔ BrowseJobs within 60s | Serve from cache instantly — no spinner |
| 60 seconds elapse | Silent background refetch — no spinner shown |
| Click Refresh button | Invalidate cache → force fresh fetch → show toast |
| Apply for a job | Optimistic update → revert on API failure |
| Withdraw application | Optimistic remove → revert on API failure |

### Files Created
```
src/hooks/
├── useCache.js        ← in-memory cache with TTL and invalidation
└── useAutoRefresh.js  ← interval-based background refresh with tab visibility check
```

### Files Modified
```
src/services/JobService.js              ← fetchMyApplications + withdrawApplication added
src/pages/Jobs.jsx                      ← caching + auto-refresh added
src/pages/candidate/BrowseJobs.jsx      ← caching + auto-refresh added
src/pages/candidate/MyApplications.jsx  ← connected to service + optimistic withdraw
```

### Concepts Learned
- In-memory caching with TTL and selective invalidation
- Background refetching without blocking the UI
- Tab visibility API to pause unnecessary background work
- Optimistic UI with full rollback on failure
- Shared cache keys across pages to prevent duplicate requests
- Cache invalidation strategy after mutations

---

## 👨‍💻 Developer

**Ali Aman** — Frontend Developer Intern
- Role: Developer
- Location: Feroke, Kozhikode
- Internship: ZECPATH Frontend (Days 7–37)

---
