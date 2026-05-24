# ZECPATH — Job Portal Frontend

A production-grade job portal web application built with React, Vite, and Tailwind CSS during a 42-day frontend internship. ZECPATH connects candidates and employers through a feature-rich platform with role-based dashboards, a full ATS with interview scheduling, admin panel, payment flows, real-time notifications, WebSocket-powered live UI, Redux state management, smart API caching, interactive analytics dashboards, and a fully functional AI video interview interface.

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
| Real-time      | WebSocket (MockWebSocket / WS-ready)|
| Media          | WebRTC (getUserMedia API)           |
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
- Candidate dashboard with stats, recommended jobs, and live activity feed
- Resume upload with drag & drop and progress bar
- Profile image upload with live preview
- Full profile editor — experience, education, skills CRUD
- **Interview schedule chip** on application cards — date, time and platform shown inline
- **Interview Details Modal** — full job info, schedule, notes, meeting link, and Join button
- **Video Interview Interface** — full 4-screen AI interview flow (Day 42)

### 🏢 Employer Features
- Post jobs with 3-step multi-step form
- Manage job listings — edit, close, view applicants
- Full ATS — shortlist, reject, and schedule interviews
- **Interview Scheduler** — calendar view, slot selection, 3-step booking flow, status management
- Employer dashboard with stats, live activity feed, and mini trend chart
- Full hiring analytics page — application trend, hiring funnel, candidate pipeline
- Pricing plans with monthly/yearly billing toggle

### 🎥 Video Interview Interface (Day 42)

A fully functional, 4-screen AI video interview experience built on the WebRTC `getUserMedia` API, requiring zero external libraries.

#### Screen 1 — Camera & Microphone Permission
- Requests `getUserMedia` with HD video (1280×720) and audio
- Live self-preview mirror shown immediately after grant
- Checklist rows flip ⏳ → ✅ per device as permissions are granted
- Distinct error banners for `NotAllowedError` (denied) vs device errors
- Privacy note — recording starts only when interview begins

#### Screen 2 — Waiting Room
- Reuses the live media stream from Screen 1 — no re-requesting
- Mic and camera toggles that actually enable/disable the underlying media tracks
- Live countdown timer that auto-enables the Join button at zero
- Pre-interview checklist (quiet location, close tabs, no mobile phone, etc.)
- Interview info card — job title, company, AI interviewer name, duration

#### Screen 3 — Live Interview
- Top status bar: REC badge, elapsed timer, integrity monitoring indicator
- AI interviewer tile with animated speaking ring (pulses green when speaking)
- Candidate self-view tile with camera-off overlay and muted mic badge
- Mic and camera toggles — tracks enabled/disabled in real time
- End Interview button triggers confirmation modal (same pattern as InterviewScheduler)
- Modal — "Keep going" or "End interview" with clean focus management

#### Screen 4 — Interview Complete
- Duration display with formatted elapsed time
- Confirmation message with AI analysis note
- "Back to Dashboard" button navigating to `/app/candidate-dashboard`

#### Step Indicator
- 3-step progress indicator in the page header: Permissions → Waiting Room → Interview
- Active step highlighted in blue, completed steps show a ✓ checkmark

#### Integration with My Applications
- "Interview Scheduled" application cards show an inline chip: date · time · platform
- "View Details" button opens a modal with full job info and interview schedule
- Modal includes a **🎥 Join Interview** button that navigates to the video interview page
- `fetchCandidateInterviewDetails(applicationId)` added to `JobService.js` — backend-ready

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
│   │   ├── JobCard.jsx
│   │   ├── FilterPanel.jsx
│   │   └── MultiStepForm.jsx
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
│   │   ├── AIInsights.jsx
│   │   ├── CandidatePricing.jsx
│   │   ├── MyApplications.jsx          ← UPDATED (Day 42)
│   │   ├── Profile.jsx
│   │   └── VideoInterview.jsx          ← NEW (Day 42)
│   ├── employer/
│   │   ├── Applications.jsx
│   │   ├── EmployerAnalytics.jsx
│   │   ├── EmployerDashboard.jsx
│   │   ├── AIInsights.jsx
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
│   ├── aiService.js
│   ├── JobService.js                   ← UPDATED (Day 42)
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

## 🏗️ Architecture Decisions

### Video Interview Architecture (Day 42)
The video interview flow is a single-file, 4-component state machine. The root `VideoInterview` component holds one `screen` state variable and passes the live `MediaStream` object forward through all screens so permissions are requested exactly once.

```
VideoInterview (root)
├── screen = "permission"  →  PermissionScreen   (getUserMedia, live preview)
├── screen = "waiting"     →  WaitingRoom        (countdown, mic/cam toggles)
├── screen = "interview"   →  InterviewScreen    (AI tile, self-view PiP, controls)
└── screen = "ended"       →  EndedScreen        (duration, back to dashboard)
```

Switching to a real WebRTC peer connection requires replacing the mock AI avatar tile with a remote `<video>` element — everything else (stream management, controls, modal, routing) stays identical.

### My Applications → Video Interview Integration
`fetchCandidateInterviewDetails(applicationId)` in `JobService.js` is the single data contract between the applications list and the interview flow. The `InterviewScheduleChip` component fetches and renders inline on the card with its own loading state so the parent list never blocks. The modal's "Join Interview" button calls `navigate("/app/video-interview")` — one line to swap for a dynamic route with interview ID when the backend is ready.

### Redux Toolkit Store
Global state is managed through three dedicated slices. `AuthProvider` acts as the bridge — it dispatches thunks and reads from Redux via `useSelector`, while exposing the same `useAuth()` interface to all components.

### WebSocket Architecture
Real-time communication is handled through a dedicated `WebSocketContext`. The `MockWebSocket` class mirrors the real browser `WebSocket` API exactly — one-line swap to production.

### API Caching Strategy
A custom `useCache` hook provides in-memory response caching using a module-level `Map` with configurable TTL.

### Optimistic UI Pattern
All mutations update the UI before the API responds and revert automatically on failure.

---

## ⚡ Performance Optimizations

| Technique | Applied To |
|-----------|------------|
| `React.memo` | StatCard, JobCard, FilterPanel, Checkbox |
| `useCallback` | BrowseJobs handlers, interview status updates |
| `useMemo` | sortedJobs, filteredJobs, activeFilters, paginatedItems |
| Lazy loading | All route-level pages via `React.lazy()` |
| Debouncing | Search inputs (400ms delay) |
| In-memory caching | Job listings cached 60s |
| Background refresh | Silent auto-refetch every 60s |
| Tab visibility check | Auto-refresh pauses when tab is hidden |
| Chart lazy loading | Recharts loads only on analytics page visit |
| WS interval cleanup | All intervals cleared on component unmount |
| Media stream reuse | getUserMedia called once, stream passed forward |
| InterviewScheduleChip isolation | Own loading state — never blocks list render |

---

## 🔒 Security Features

| Feature | Implementation |
|---------|----------------|
| Route protection | `PrivateRoute` + `RoleRoute` |
| Role enforcement | Employer routes blocked from candidates |
| Token expiry | Checked before every API call |
| Session timeout | 30 min inactivity auto-logout |
| 401 handling | `session:expired` CustomEvent → toast → redirect |
| 403 handling | `session:forbidden` CustomEvent → toast |
| Media cleanup | All tracks stopped on interview end |

---

## 🔗 API Integration

**External API:** [Arbeitnow Job Board API](https://www.arbeitnow.com/api/job-board-api)

All internal features use simulated service functions that match real backend patterns. Switching to a real backend requires uncommenting 2 lines per service function.

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

| Days  | Focus Area                                                                          |
|-------|-------------------------------------------------------------------------------------|
| 7–10  | React hooks, API integration, component basics                                      |
| 11–12 | Tailwind CSS, responsive layouts, landing page                                      |
| 13–16 | Authentication, protected routes, sessions                                          |
| 17    | Role-based dashboard system                                                         |
| 18–19 | Job module, multi-step forms, candidate profile                                     |
| 20–23 | Polish, Axios integration, API service layer                                        |
| 24–25 | Dashboards, ATS system                                                              |
| 26–27 | Advanced search & filters, pagination                                               |
| 28–29 | Notifications system, payment flows                                                 |
| 30–31 | File uploads, multi-role dashboard                                                  |
| 32–33 | Admin panel, performance optimization                                               |
| 34–35 | Security & stability, production readiness                                          |
| 36    | Redux Toolkit — global state management                                             |
| 37    | API caching, optimistic UI, auto-refresh                                            |
| 38    | Charts & analytics — Recharts integration                                           |
| 39    | Interview scheduling module                                                         |
| 40    | AI Insights Dashboard — score visualization, smart hiring panels                    |
| 41    | Real-time UI — WebSocket system, live activity feed, live notifications             |
| 42    | Video Interview Interface — permission flow, waiting room, live interview, My Applications integration |

---

## 🤖 AI Feature Highlight

ZECPATH includes an AI-driven insights layer and a fully autonomous AI video interview system. Candidates receive actionable insights on profile strength, and employers get intelligent candidate rankings. The video interview interface simulates a real AI HR interviewer with voice state animations, integrity monitoring, and a complete post-interview summary flow.

---

## 📡 Real-Time Feature Highlight

ZECPATH features a fully event-driven real-time layer powered by WebSockets. All three dashboards display a live activity feed, the bell icon updates in real time, and the Admin dashboard includes a dedicated Platform Pulse panel. The entire WebSocket layer is backend-ready — one line swap from mock to production.

---

## 👨‍💻 Developer

**Ali Aman** — Frontend Developer (React.js)
- Location: Feroke, Kozhikode
- Internship: ZECPATH Frontend (Days 7–42)
