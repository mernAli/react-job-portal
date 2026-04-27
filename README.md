# ZECPATH — Job Portal Frontend

A production-grade job portal web application built with React, Vite, and Tailwind CSS during a 39-day frontend internship. ZECPATH connects candidates and employers through a feature-rich platform with role-based dashboards, a full ATS with interview scheduling, admin panel, payment flows, real-time notifications, Redux state management, smart API caching, and interactive analytics dashboards.

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

| Category       | Technology                          |
|----------------|-------------------------------------|
| Framework      | React 18 + Vite                     |
| Styling        | Tailwind CSS                        |
| Routing        | React Router v6                     |
| HTTP Client    | Axios                               |
| State          | Redux Toolkit + React Context API   |
| Caching        | Custom in-memory cache (useCache)   |
| Charts         | Recharts                            |
| Auth           | JWT + localStorage                  |
| Deployment     | Vercel                              |

---

## ✨ Features

### 🔐 Authentication System
- JWT-based login and registration with role selection
- Role-based access control: **Candidate**, **Employer**, **Admin**
- Session persistence across page refreshes
- Auto logout after 30 minutes of inactivity
- Token expiry validation before every API call
- Secure token storage with expiry timestamp
- Protected routes with clean 403 unauthorized page

### 👤 Candidate Features
- Browse and search jobs with advanced multi-criteria filters
- Debounced keyword search + URL-synced filter state
- Apply for jobs with optimistic UI — instant feedback, reverts on failure
- Track and manage applications with status indicators
- Optimistic withdraw — application disappears instantly, reverts on failure
- Candidate dashboard with stats and recommended jobs
- Resume upload with drag & drop and progress bar
- Profile image upload with live preview
- Full profile editor — experience, education, skills CRUD

### 🏢 Employer Features
- Post jobs with 3-step multi-step form
- Manage job listings — edit, close, view applicants
- Full ATS — shortlist, reject, and schedule interviews
- **Interview Scheduler** — calendar view, slot selection, 3-step booking flow, status management
- Employer dashboard with stats, activity feed, and mini trend chart
- Full hiring analytics page — application trend, hiring funnel, candidate pipeline
- Pricing plans with monthly/yearly billing toggle

### 🤖 AI Insights & Smart Hiring (NEW)

An AI-powered insights system designed to enhance decision-making for both candidates and employers through structured data visualization and intelligent recommendations.

#### 👤 Candidate AI Insights
- AI profile score with visual indicator (score ring)
- Skill-level breakdown using progress bars
- Interview progress tracking
- AI-generated personalized remarks for improvement
- Dedicated insights dashboard with clean visual hierarchy

#### 🏢 Employer AI Insights
- Candidate ranking system based on AI scores
- Visual score cards for quick evaluation
- AI-driven hiring recommendations (shortlist, interview, reject)
- Top candidates preview directly on dashboard
- Dedicated employer insights panel for smarter hiring decisions

#### 🔗 Dashboard Integration
- Candidate dashboard includes AI score preview with quick access
- Employer dashboard includes top candidate insights preview
- Seamless navigation to full AI insights pages

#### 🧠 AI Service Layer
- Centralized `aiService.js` for generating insights data
- Structured mock AI responses (backend-ready)
- Supports candidate scoring, interview analytics, and employer recommendations

### 🛡️ Admin Features
- Admin dashboard with 8 real-time platform metrics
- User management — search, filter, suspend, activate, delete
- Job management — search, filter, activate, close, flag
- Analytics page with sparkline charts and distribution bars
- Cross-role access to all dashboards

### 🔔 Notification System
- Event-driven notification context — any component can fire notifications
- Bell icon with live unread count badge in topbar
- Notification dropdown showing last 5 notifications
- Mark as read / mark all as read
- Auto-generated from user actions (apply, status change, payment, schedule)
- Full notification history page

### 💳 Payment & Monetization
- Role-specific pricing pages for candidates and employers
- Monthly / yearly billing toggle with 20% yearly discount
- Checkout form with card validation and auto-formatting
- Four payment states: idle → loading → success / error
- Test card simulation — success card and decline card
- Payment success page with full receipt and unlocked features list

### 🎨 Theme System
- Three themes: **Light**, **Dark**, **Darker**
- All components use CSS theme variables — zero hardcoded colors
- Theme persists across sessions via localStorage

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
│   ├── AuthProvider.jsx
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
        ├── AIInsights.jsx
│   │   ├── CandidatePricing.jsx
│   │   ├── MyApplications.jsx
│   │   └── Profile.jsx
│   ├── employer/
│   │   ├── Applications.jsx
│   │   ├── EmployerAnalytics.jsx
│   │   ├── EmployerDashboard.jsx
        ├── AIInsights.jsx
│   │   ├── EmployerPricing.jsx
│   │   ├── InterviewScheduler.jsx
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
    ├── aiService.js
│   ├── JobService.js
│   ├── paymentService.js
│   ├── scheduleService.js
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

### Redux Toolkit Store
Global state is managed through three dedicated slices. `AuthProvider` acts as the bridge — it dispatches thunks and reads from Redux via `useSelector`, while exposing the same `useAuth()` interface to all components. Zero breaking changes across the codebase.

```
store/
├── authSlice.js    — user, token, authLoading, authError + async thunks
├── profileSlice.js — candidate profile data and upload states
├── uiSlice.js      — global loading overlay and page title
├── index.js        — configureStore
└── hooks.js        — typed selectors
```

### API Caching Strategy
A custom `useCache` hook provides in-memory response caching using a module-level `Map` with configurable TTL. `Jobs.jsx` and `BrowseJobs.jsx` share the same cache key so navigating between them never triggers a duplicate request within 60 seconds.

```javascript
const { getCache, setCache, isFresh, invalidate } = useCache(60000);

if (!forceRefresh && isFresh("browse-jobs")) {
  setJobs(getCache("browse-jobs"));
  return;
}
```

### Auto-Refresh Pattern
`useAutoRefresh` runs a callback on a configurable interval. It checks `document.visibilityState` before each tick — pausing when the browser tab is hidden to avoid wasted requests.

```javascript
useAutoRefresh(() => loadJobs(true), 60000);
```

### Interview Scheduling Architecture
The scheduler is built without any external calendar library. A pure JavaScript `Date`-based calendar generates a 7-column grid of date cells, each annotated as available, booked, past, weekend, or selected. A 3-step modal manages the booking flow — Select Date → Choose Slot & Details → Confirm — with form state persisted across steps and full optimistic UI on status changes.

### Charts & Analytics
Recharts powers all data visualizations, lazy-loaded so the chart library never adds to the main bundle. Three chart types are used: `LineChart` for application trends, a horizontal `BarChart` for the hiring funnel with per-stage `Cell` color overrides, and a grouped `BarChart` for pipeline comparison. All chart data flows through the service layer.

### Service Layer Pattern
All API calls go through dedicated service files — never directly from components. Every function is backend-ready with the real API call commented in:

```javascript
export const fetchJobs = async () => {
  // const response = await api.get("/jobs");
  // return response.data;
  return new Promise((resolve) => { ... });
};
```

### Optimistic UI Pattern
All mutations update the UI before the API responds and revert automatically on failure:

```javascript
setApplications(prev => prev.filter(app => app.id !== applicationId));
await withdrawApplication(applicationId);
// On failure: setApplications(originalApplications)
```

### Centralized Permission System
All role logic lives in one file:

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
| `useCallback` | BrowseJobs handlers, JobCard handlers, interview status updates |
| `useMemo` | sortedJobs, filteredJobs, activeFilters, paginatedItems |
| Lazy loading | All route-level pages via `React.lazy()` |
| Code splitting | Automatic via Vite + lazy routes |
| Debouncing | Search inputs (400ms delay) |
| Static data outside components | FilterPanel options, StatCard color map, calendar constants |
| Redux selectors | Prevent unnecessary re-renders |
| In-memory caching | Job listings cached 60s — zero re-fetch on navigation |
| Background refresh | Silent auto-refetch every 60s — no loading spinner |
| Tab visibility check | Auto-refresh pauses when tab is hidden |
| Chart lazy loading | Recharts loads only on analytics page visit |

---

## 🔒 Security Features

| Feature | Implementation |
|---------|----------------|
| Route protection | `PrivateRoute` + `RoleRoute` |
| Role enforcement | Employer routes blocked from candidates and vice versa |
| Token expiry | Checked before every API call |
| Session timeout | 30 min inactivity auto-logout |
| 401 handling | `session:expired` CustomEvent → toast → redirect |
| 403 handling | `session:forbidden` CustomEvent → toast |
| Unauthorized page | Clean 403 UI showing user's role and email |
| Auth data cleanup | All keys cleared on logout including `tokenExpiry` |

---

## 🔗 API Integration

**External API:** [Arbeitnow Job Board API](https://www.arbeitnow.com/api/job-board-api)

All internal features use simulated service functions that match real backend patterns. Switching to a real backend requires uncommenting 2 lines per service function.

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
| 38    | Charts & analytics — Recharts integration           |
| 39    | Interview scheduling module                         |
| 40    | AI insightsDashboard—score visualization,smart hiring panels 

---

---

## 🤖 AI Feature Highlight

ZECPATH now includes an AI-driven insights layer that transforms user and application data into meaningful visual feedback.

- Candidates receive actionable insights on profile strength and interview readiness
- Employers get intelligent candidate rankings and hiring suggestions
- Designed with a focus on **clarity, visual hierarchy, and decision support**

This feature simulates real-world AI integration while maintaining a scalable frontend architecture ready for backend AI services.

---

## 👨‍💻 Developer

**Ali Aman** — Frontend Developer (React.js)
- Location: Feroke, Kozhikode
- Internship: ZECPATH Frontend (Days 7–39)

---
