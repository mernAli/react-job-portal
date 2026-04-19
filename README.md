# ZECPATH — Job Portal Frontend

A production-grade job portal web application built with React, Vite, and Tailwind CSS during a 36-day frontend internship. ZECPATH connects candidates and employers through a feature-rich platform with role-based dashboards, ATS, admin panel, payment flows, real-time notifications, and a scalable Redux state management architecture.

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
- Track applications in My Applications
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
│   │   ├── EmployerDashboard.jsx
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
│   ├── dashboardService.js
│   ├── JobService.js
│   ├── paymentService.js
│   └── uploadService.js
├── store/                      ← NEW: Redux store (Day 36)
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

`AuthProvider` acts as the bridge — it reads from Redux via `useSelector` and dispatches thunks, while exposing the same `useAuth()` interface to all existing components. Zero breaking changes across the codebase.

```javascript
// AuthProvider now dispatches to Redux instead of useState
const login = async (email, password) => {
  const result = await dispatch(loginThunk({ email, password }));
  if (loginThunk.fulfilled.match(result)) {
    return { success: true, role: result.payload.user.role };
  }
  return { success: false, message: result.payload };
};
```

### Service Layer Pattern
All API calls go through dedicated service files — never directly from components. Each service function is backend-ready with real API calls commented out:

```javascript
export const fetchJobs = async () => {
  // Real backend: uncomment below
  // const response = await api.get("/jobs");
  // return response.data;

  // Simulated response for demo
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

### Optimistic UI Pattern
All state-changing actions update the UI immediately and revert on failure:

```javascript
// Update immediately
setApplications(prev => prev.map(app =>
  app.id === id ? { ...app, status: newStatus } : app
));
// Call API
await updateApplicationStatus(id, newStatus);
// On failure: revert to old state
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

| Days  | Focus Area                                      |
|-------|-------------------------------------------------|
| 7–10  | React hooks, API integration, component basics  |
| 11–12 | Tailwind CSS, responsive layouts, landing page  |
| 13–16 | Authentication, protected routes, sessions      |
| 17    | Role-based dashboard system                     |
| 18–19 | Job module, multi-step forms, candidate profile |
| 20–23 | Polish, Axios integration, API service layer    |
| 24–25 | Dashboards, ATS system                          |
| 26–27 | Advanced search & filters, pagination           |
| 28–29 | Notifications system, payment flows             |
| 30–31 | File uploads, multi-role dashboard              |
| 32–33 | Admin panel, performance optimization           |
| 34–35 | Security & stability, production readiness      |
| 36    | Redux Toolkit — global state management         |

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
- All 36 days of existing components work unchanged — zero breaking changes
- ThemeContext and NotificationContext kept in React Context (right tool for the job)
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
src/main.jsx              ← Redux Provider added
src/context/AuthProvider.jsx ← now dispatches to Redux
```

### Concepts Learned
- Redux Toolkit slice architecture
- `createAsyncThunk` for async operations
- `extraReducers` with builder pattern
- Typed selectors for memoized state access
- Gradual migration strategy — Context → Redux without breaking changes

---

## 👨‍💻 Developer

**Ali Aman** — Frontend Developer Intern
- Role: Developer
- Location: Feroke, Kozhikode
- Internship: ZECPATH Frontend (Days 7–36)

---
