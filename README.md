# ZECPATH — Job Portal Frontend

A production-grade job portal web application built with React, Vite, and Tailwind CSS during a 48-day frontend internship. ZECPATH connects candidates and employers through a feature-rich platform with role-based dashboards, a full ATS with interview scheduling, admin panel, payment flows, real-time notifications, WebSocket-powered live UI, Redux state management, smart API caching, interactive analytics dashboards, a fully functional AI video interview interface with compliance monitoring, a recruiter review dashboard with video playback, a sandboxed client-side machine testing simulator with automated code evaluations, hardware-accelerated cinematic UI transitions, and an integrated mouse-free keyboard navigation engine conforming to modern accessibility requirements.

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

| Category       | Technology                                                         |
|----------------|--------------------------------------------------------------------|
| Framework      | React 18 + Vite                                                    |
| Styling        | Tailwind CSS                                                       |
| Routing        | React Router v6                                                    |
| HTTP Client    | Axios                                                              |
| State          | Redux Toolkit + React Context API                                  |
| Caching        | Custom in-memory cache (useCache)                                 |
| Charts         | Recharts                                                           |
| Auth           | JWT + localStorage                                                 |
| Real-time      | WebSocket (MockWebSocket / WS-ready)                               |
| Media          | WebRTC (getUserMedia API)                                          |
| Accessibility  | WAI-ARIA Standard Compliance (WCAG AA)                             |
| Deployment     | Vercel                                                             |

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
- Candidate dashboard with stats, recommended jobs, and live activity feed
- Resume upload with drag & drop and progress bar
- Profile image upload with live preview
- Full profile editor — experience, education, skills CRUD
- **Interview schedule chip** on application cards — date, time and platform shown inline
- **Interview Details Modal** — full job info, schedule, notes, meeting link, and Join button
- **Video Interview Interface** — full 4-screen AI interview flow (Day 42)
- **Machine Test Framework** — Live sandboxed client-side environment evaluation (Day 45)
- **Premium Fluid Motion Design** — Hardware-accelerated transitions and organic interaction feedback (Day 47)
- **Inclusive Workspace Traversal** — Native keyboard routing alongside responsive semantic focus controls (Day 48)

### 🏢 Employer Features
- Post jobs with 3-step multi-step form
- Manage job listings — edit, close, view applicants
- Full ATS — shortlist, reject, and schedule interviews
- **Interview Scheduler** — calendar view, slot selection, 3-step booking flow, status management
- Employer dashboard with stats, live activity feed, and mini trend chart
- Full hiring analytics page — application trend, hiring funnel, candidate pipeline
- Pricing plans with monthly/yearly billing toggle
- **Recruiter Review Dashboard** — video playback, AI scores, dimension bars, integrity flags, Hire/Hold/Reject decisions (Day 44)

### ♿ Inclusive Accessibility Overhaul (Day 48)
An accessibility sweep executed across global platform views to fulfill modern compliance architecture benchmarks (WCAG AA).
- **Sequential Focus Engine:** Embedded native `tabIndex` rings and `focus-visible` handlers across active elements like `JobCard.jsx` and `FilterPanel.jsx` to support zero-mouse layout traversal.
- **WAI-ARIA Semantic Anchors:** Mapped explicit structural properties (`role="checkbox"`, `aria-checked`, `aria-live="polite"`, `role="search"`) to guarantee real-time layout changes are cleanly broadcasted by screen readers.
- **Skip-to-Content Vector:** Injected an ultra-low-profile `<SkipLink />` routing component into `AppLayout.jsx`, enabling sequential keyboard users to bypass global tracking layouts natively.

### 🎨 Fluid Workspace Engine & UX Polish (Day 47)
A performance-tuned layout overhaul designed to eliminate rigid component behaviors and deliver premium, high-fidelity interface responses.
- **Cinematic Page Transitions:** Implements a custom hook that intercepts workspace mounts, leveraging a micro-elastic curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) to glide pages vertically with an organic bounce-settle deceleration.
- **Contextual Empty States:** Features a reusable, theme-aware `<EmptyState />` component equipped with interactive action buttons and a glowing, pulsing tracking radar (`animate-ping`) to cleanly process zero-result parameters.
- **Tactile Responses:** Deploys magnetic elevations (`hover:-translate-y-1 hover:shadow-xl`) over job cards and physics-based compression mechanics (`active:scale-95`) across prominent buttons.

### 💻 Machine Test Framework (Day 45)
An isolated, native client-side assessment terminal designed to safely evaluate script challenges on the frontend.
- **Compilation Sandbox:** Custom text area control featuring responsive line numbering gutters, layout counters, and independent code input captures.
- **Dynamic JS Interpreter Engine:** Evaluates submissions safely using sandboxed runtime wrappers (`new Function`), computing algorithmic accuracy, performance timers, and logical variables in real time.
- **Anti-Cheat Monitoring:** Implements the `visibilitychange` API to monitor tab manipulations, incrementing background safety status flags and auto-submitting current inputs if conditions expire.

### 🎬 Recruiter Review Dashboard (Day 44)
A dedicated employer-side page for reviewing completed AI video interviews, evaluating candidates, and making hiring decisions — all in one place.
- **Candidate Review Cards:** Displays summary strip metrics, AI verdicts, dimension bars, and integrity badges with custom filtering and sorting profiles.
- **Review Modal Viewport:** Features a native `<video>` playback hub with timestamp anchors, structured AI dimension metric sheets, and optimistic local state action captures (Hire/Hold/Reject).
- **Integrity Tracker:** Monitors strict user discipline variables (tab switching and camera-off triggers) directly inside the reviewer console.

### 🎥 Video Interview Interface (Day 42–43)
A fully functional, 5-screen automated interview workspace using the WebRTC `getUserMedia` API without relying on third-party libraries. Includes device access verifications, instructional checkpoints with strict SVG read timers, live status HUD overlays mapping background violations, and an isolated application list modal bridge.

### 🤖 AI Insights & Smart Hiring
- AI profile score with visual indicator (score ring)
- Skill-level breakdown using progress bars
- Interview progress tracking
- AI-generated personalized remarks for improvement
- Candidate ranking system based on AI scores
- AI-driven hiring recommendations (shortlist, interview, reject)

### 📡 Real-Time UI — WebSocket System
- Custom `MockWebSocket` class mirroring the browser `WebSocket` API
- Live activity feed across all three dashboards (Candidate, Employer, Admin)
- Bell icon unread count updates in real time
- Admin Platform Pulse panel with system status monitoring
- One-line swap from mock to production WebSocket

### 🛡️ Admin Features
- Admin dashboard with 8 real-time platform metrics
- User management — search, filter, suspend, activate, delete
- Job management — search, filter, activate, close, flag
- Analytics page with sparkline charts and distribution bars
- Live platform pulse panel with WebSocket monitoring

### 🔔 Notification System
- Event-driven notification context
- Bell icon with live unread count badge
- Mark as read / mark all as read
- WebSocket-powered live notifications

### 💳 Payment & Monetization
- Role-specific pricing pages for candidates and employers
- Monthly / yearly billing toggle with 20% yearly discount
- Checkout form with card validation and auto-formatting
- Test card simulation — success and decline cards

### 🎨 Theme System
- Three themes: **Light**, **Dark**, **Darker**
- All components use Tailwind theme tokens — zero hardcoded colours
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
│   │   ├── StatCard.jsx
│   │   └── LiveActivityFeed.jsx
│   ├── Jobs/
│   │   ├── JobCard.jsx         ← UPDATED (Day 48 Keyboard Focus Routing & ARIA Labels)
│   │   ├── FilterPanel.jsx     ← UPDATED (Day 48 Custom Checkbox Input Overhaul)
│   │   └── MultiStepForm.jsx
│   ├── ui/
│   │   ├── PageWrapper.jsx

│   │   ├── EmptyState.jsx

│   │   └── SkipLink.jsx        ← NEW (Day 48 Layout Focus Anchor Primitive)
│   └── ErrorBoundary.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── AuthProvider.jsx
│   ├── NotificationContext.jsx
│   ├── ThemeContext.jsx
│   ├── WebSocketContext.jsx
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
│   ├── AppLayout.jsx           ← UPDATED (Day 48 Skip Navigation Injection)
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
│   │   ├── AIInsights.jsx
│   │   ├── CandidatePricing.jsx
│   │   ├── MyApplications.jsx
│   │   ├── Profile.jsx
│   │   ├── MachineTest.jsx

│   │   └── VideoInterview.jsx
│   ├── employer/
│   │   ├── Applications.jsx
│   │   ├── EmployerAnalytics.jsx
│   │   ├── EmployerDashboard.jsx
│   │   ├── AIInsights.jsx
│   │   ├── EmployerPricing.jsx
│   │   ├── InterviewScheduler.jsx
│   │   ├── MyJobs.jsx
│   │   ├── PostJob.jsx
│   │   └── RecruiterReview.jsx
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
│   ├── aiService.js
│   ├── JobService.js
│   ├── mockWebSocket.js
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

## 🏗️ Architectural Decisions

### WAI-ARIA Standard Compliance & Keyboard Engines (Day 48)
To bridge the gap between traditional pointer interactions and assist vectors, the filter and card systems utilize a standard dual-stage event handler strategy:

```text
Interactive Node Element [tabIndex="0"] [role="checkbox"]
├── focus-visible outline mapping activates solely via keyboard events
└── onKeyDown Capturer Intercepts Space/Enter Triggers
    ├── Step 1: Execute e.preventDefault() to arrest layout scrolling
    ├── Step 2: Stop event propagation to keep parents pristine
    └── Step 3: Call internal click handlers to dispatch state mutations
```

## Fluid Workspace Transitions & UX Polish (Day 47)
To ensure layout structural integrity during complex view renders, the animations utilize a centralized Web Animations API tracking pattern inside a single-point ref hook. Global structures like navigation components (Sidebar.jsx) have been completely decoupled from subview refs. This isolates entry animations to the core workspace canvas, leaving primary navigational layouts stationary.

## Machine Test Architecture (Day 45)
The code test interface operates as an isolated execution matrix. Algorithmic blocks are safely captured using controlled text scopes, wrapped with runtime telemetry monitoring, and compiled through sandboxed evaluation blocks (new Function). Strict compliance event hooks process visibilitychange states asynchronously, passing data signatures back to local optimization sheets without interrupting state hydration.

## ⚡ Performance & Optimization Techniques

| Technique                     | Applied To                                                                 |
|-------------------------------|----------------------------------------------------------------------------|
| **Hardware Acceleration**     | `usePageTransition` — uses `will-change: transform, opacity` to force GPU rendering layers |
| **Animation Loop Throttling** | Entry transitions use double nested `requestAnimationFrame` bounds to eliminate initial style flashes |
| **Redundant Focus Blocking**  | Injected `tabIndex={-1}` on nested accessible structural checkbox nodes to prevent double-tab navigation traps |
| **React.memo**                | `StatCard`, `JobCard`, `FilterPanel`, `Checkbox`, `EmptyState`             |
| **useCallback**               | `BrowseJobs` mutation triggers, filter handlers, modal confirmations       |
| **useMemo**                   | `sortedJobs`, `filteredJobs`, `activeFilters`, `paginatedItems`            |
| **Lazy Loading**              | Route-level layouts managed cleanly via `React.lazy()` partitions          |
| **Debouncing**                | Main filter inputs throttled using a clean 400ms delay block               |


## 🔒 Security Features

| Feature                        | Implementation                                                                 |
|--------------------------------|--------------------------------------------------------------------------------|
| **Tab Visibility Discipline**  | Monitors window blur states via `visibilitychange` to trigger violation counts  |
| **Workspace Compilation Sandbox** | Evaluates candidate code in isolated JavaScript wrapper blocks to block local environment pollution |
| **Route Protection**           | Strict hierarchical verification using nested `PrivateRoute` and `RoleRoute` components |
| **Token Validity**             | Active expiration timestamp assessments prior to every network query           |


## 🚀 Getting Started
# Clone the repository
git clone [https://github.com/your-username/zecpath-frontend.git](https://github.com/your-username/zecpath-frontend.git)
cd zecpath-frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE_URL=[https://www.arbeitnow.com/api](https://www.arbeitnow.com/api)" > .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview


## 📅 Development Timeline

| Days   | Focus Area                                                                 |
|--------|-----------------------------------------------------------------------------|
| **7–10**  | React hooks, API integration, component basics                           |
| **11–12** | Tailwind CSS, responsive layouts, landing page                           |
| **13–16** | Authentication, protected routes, sessions                               |
| **17**    | Role-based dashboard system                                              |
| **18–19** | Job module, multi-step forms, candidate profile                          |
| **20–23** | Polish, Axios integration, API service layer                             |
| **24–25** | Dashboards, ATS system                                                   |
| **26–27** | Advanced search & filters, pagination                                    |
| **28–29** | Notifications system, payment flows                                      |
| **30–31** | File uploads, multi-role dashboard                                       |
| **32–33** | Admin panel, performance optimization                                    |
| **34–35** | Security & stability, production readiness                               |
| **36**    | Redux Toolkit — global state management                                  |
| **37**    | API caching, optimistic UI, auto-refresh                                 |
| **38**    | Charts & analytics — Recharts integration                                |
| **39**    | Interview scheduling module                                              |
| **40**    | AI Insights Dashboard — score visualization, smart hiring panels         |
| **41**    | Real-time UI — WebSocket system, live activity feed, live notifications  |
| **42**    | Video Interview Interface — permission flow, waiting room, live interview|
| **43**    | Interview Instructions & Compliance — rules checklist, read timer, alerts|
| **44**    | Recruiter Review Dashboard — video playback UI, AI score breakdown, flags|
| **45**    | Machine Test Framework — code editor sandbox, anti-cheat tracker         |
| **47**    | Fluid Workspace Overhaul — spring transitions, layout decoupling, empty UI|
| **48**    | Accessibility & WCAG Core — Skip navigation links, focus states, ARIA maps|
