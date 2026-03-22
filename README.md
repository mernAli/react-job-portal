# Day 7 React Job Listing App

This project is developed as part of my MERN stack internship to understand **React fundamentals, hooks, API integration, and clean project architecture**.

The application fetches real job listings from a public API and displays them in a modern, responsive UI.

---

## 🚀 Features

- Fetches real job data from a public jobs API
- Uses `useEffect` for handling side effects
- Loading and error states for better UX
- Auto-refreshes job data every 60 seconds
- Responsive layout (Desktop & Mobile)
- Reusable and scalable component structure

---

## 🧠 Concepts Covered

- React Hooks (`useEffect`, `useState`)
- Component lifecycle & cleanup
- API fetching and async handling
- Separation of concerns
- Services layer architecture
- Environment variables configuration
- Clean and maintainable folder structure

---

## 🔗 API Used

**Arbeitnow Job Board API**
https://www.arbeitnow.com/api/job-board-api


This is a public API that provides real job listings and does not require authentication.

---

## 📁 Project Structure
src/
├─ components/
│ ├─ JobCard.jsx
│ ├─ JobList.jsx
│ ├─ Loader.jsx
│ ├─ Job.css
│ └─ layout.css
├─ services/
│ └─ jobService.js
├─ constants/
│ └─ api.js
├─ App.jsx
├─ main.jsx
└─ index.css


---

## 🏗 Internship Progress

### ✅ Day 7 – useEffect & Lifecycle
- Implemented job listing using a public API
- Managed loading and error states
- Used `useEffect` for API calls and auto refresh
- Built responsive UI with reusable components

### ✅ Day 8 – Project Structure & Architecture
- Refactored API logic into a dedicated services layer
- Implemented separation of concerns
- Created constants for configuration values
- Added environment variable support using `.env`
- Improved folder discipline and scalability

### ✅ Day 9 – Git & Workflow

- Implemented an experimental **active and responsive Navbar**
- Added route-based navigation using **React Router**
- Jobs page displays job listings dynamically
- Other pages show a **Work Under Progress** state
- Followed real-world Git workflow practices:
  - Feature branch creation
  - Meaningful commit messages
  - Pull request creation and merge
- Improved repository professionalism and structure

As the completence of Day 9 task the project structure is also changed:
src/
├─ components/
│ ├─ JobCard.jsx
│ ├─ JobList.jsx
│ ├─ Loader.jsx
│ ├─ Navbar/
│ │ ├─ Navbar.jsx
│ │ └─ Navbar.css
│ ├─ Job.css
│ └─ layout.css
├─ pages/
│ ├─ Home.jsx
│ ├─ Jobs.jsx
│ ├─ Network.jsx
│ └─ Notification.jsx
├─ services/
│ └─ jobService.js
├─ constants/
│ └─ api.js
├─ App.jsx
├─ main.jsx
└─ index.css

---

### ✅ Day 10 – Mini Review Project

Built a complete Mini Job Listing Application by combining all previously learned concepts
Implemented a dynamic Home page with interactive job feed
Displayed job listings using API integration with reusable components
Added recommendation section with follow functionality and state handling
Implemented scroll-based content flow for better user engagement
Integrated search functionality in the Navbar
Ensured responsive design for both desktop and mobile views using plain CSS
Focused on clean component structure and readable code
Deployed the application for live access

Followed professional development practices:
Clean and organized repository structure
Meaningful commits for feature updates
Improved UI consistency and responsiveness
Maintained separation of concerns between components, pages, and services

As the completion of Day 10 task, the project structure was refined to support scalability and maintainability:

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

env
VITE_JOB_API_URL=https://www.arbeitnow.com/api/job-board-api

Note: The .env file is ignored in Git for security reasons.

🖥 Tech Stack
- React (Vite)
- JavaScript (ES6)
- CSS
- Public REST API

### ✅ Day 11 – Tailwind CSS Setup & Landing Page Design

Configured Tailwind CSS (latest version) in the React project and adopted a utility-first CSS workflow.

Built a clean and modern Landing Page UI using Tailwind, focusing on visual hierarchy and consistency.

#### Key Implementations
- Tailwind CSS installation and configuration (tailwind.config.js)
- Utility-first styling approach
- Consistent color system, spacing, and typography
- Responsive layout using Flex and Grid utilities

#### Landing Page Sections
- Hero Section with primary headline and call-to-action
- Feature Highlights showcasing platform benefits
- Call-To-Action (Get Started) button
- Footer with clean layout and branding

#### Navigation Flow
- Landing page is shown as the initial entry point
- Clicking “Get Started” routes users to the main application (Day 10 features)
- Navbar and sidebars are rendered only inside the app layout

#### Reusability & Structure
- Landing page built using reusable components
- Clear separation between landing UI and app UI

#### Updated Project Structure
src/
├─ pages/
│  └─ Landing.jsx
├─ components/
│  └─ landing/
│     ├─ Hero.jsx
│     ├─ Features.jsx
│     ├─ CTA.jsx
│     └─ Footer.jsx


#### Outcome
- Tailwind fully configured and working
- Clean, modern landing page UI
- Mobile-friendly and visually consistent design
- Smooth transition between landing page and main app


### Day 12 – Responsive UI & Layout Mastery

To master mobile-first design principles and build a fully responsive homepage using Tailwind CSS with scalable layouts that work seamlessly across mobile, tablet, and desktop devices.

 #### Learning Outcomes
 
##### Mobile-First Design
- Designed UI starting from small screens first
- Gradually enhanced layout using Tailwind breakpoints
- Ensured no layout breaks on different screen sizes

##### Tailwind CSS Breakpoints
- Used Tailwind’s responsive utilities:
    - sm: (mobile)
    - md: (tablet)
    - lg: (desktop)
- Controlled spacing, visibility, layout, and alignment across devices

##### Layout Systems
- Flexbox
    - Navigation bar
    - Hero section alignment
    - Feature cards layout
- CSS Grid
    - Job cards section
    - Feature highlights
    - Responsive content structure
- Card-Based UI System
    - Reusable card components
    - Consistent padding, border-radius, and shadows
    - Scales cleanly across breakpoints
 
#### 🛠 Practical Implementation

#### ✅ Homepage Structure
The landing page was converted into a fully responsive homepage with the following sections:
- Responsive Navbar
    - Desktop navigation menu
    - Mobile hamburger menu
    - Smooth scroll navigation to sections (Features, Jobs)
- Hero Section
    - Clear value proposition
    - Call-to-action buttons
- Feature Section
    - Grid-based layout
    - Responsive cards
- Jobs Section
    - Responsive job cards grid
- Footer
    - Clean and minimal design

#### Updated Project Structure (Day-12):

src/
├─ components/
│  ├─ Landing/
│  │  ├─ Hero.jsx
│  │  ├─ Features.jsx
│  │  ├─ CTA.jsx
│  │  └─ Footer.jsx
│  ├─ Navbar/
│  │  ├─ Navbar.jsx
│  │  └─ Navbar.css
│  ├─ JobCard.jsx
│  └─ JobList.jsx
├─ pages/
│  ├─ Landing.jsx
│  ├─ Home.jsx
│  └─ Jobs.jsx
├─ layouts/
│  └─ AppLayout.jsx
├─ constants/
│  └─ api.js
├─ App.jsx
└─ main.jsx

#### 📦 Deliverables Completed
  ✅ Fully responsive homepage
  ✅ Mobile-first layout
  ✅ Responsive navigation bar
  ✅ Grid-based job & feature sections
  ✅ Works on mobile, tablet, and desktop


## ✅ Day 13 – Authentication, Dashboard & Protected Routes

Implemented a complete **authentication flow and dashboard architecture** using React Router, layouts, and protected routes—following real-world React application patterns.

---

### 🔐 Authentication Flow

- Implemented client-side authentication using `localStorage`
- Login sets authentication state:
  ```localStorage.setItem("auth", "true");```
- Authentication persists across page refresh
- Logout clears authentication:
  ```localStorage.removeItem("auth");```

#### 🛡 Protected Routes (PrivateRoute)
- Created a reusable PrivateRoute component
- Restricts access to dashboard routes
- Redirects unauthenticated users to Login page

Logic:
- Authenticated → Access dashboard
- Not authenticated → Redirect to /login


#### 🧱 Layout-Based Architecture

AppLayout
- Wraps all authenticated routes
- Contains:
  - Navbar
  - Logout logic
  - <Outlet /> for nested pages

AuthLayout
- Wraps Login and Register pages
- Provides centered layout and clean UI

#### 📊 Dashboard Structure

Accessible via /app and includes:
- Home (Dashboard)
- Jobs
- Network
- Notifications

Routing Flow:
```
/            → Landing
/login       → Login
/register    → Register
/app         → Dashboard (Protected)
/app/jobs
/app/network
/app/notifications
```

#### 🧭 Navbar & Logout
- Desktop and mobile navigation
- Route-aware links using NavLink
- Logout button added for:
  - Desktop view
  - Mobile view
- Logout clears auth state and redirects to Login

#### 🧠 Concepts Learned
- Authentication handling
- Persistent login behavior
- Protected routes
- Nested routing
- Layout components
- Dashboard architecture
- Logout implementation
- Separation of public and private UI

#### Updated Project Structure (Day-13)
src/
├─ layouts/
│  ├─ AppLayout.jsx
│  └─ AuthLayout.jsx
├─ route/
│  └─ PrivateRoute.jsx
├─ pages/
│  ├─ Landing.jsx
│  ├─ Login.jsx
│  ├─ Register.jsx
│  ├─ Home.jsx
│  ├─ Jobs.jsx
│  ├─ Network.jsx
│  └─ Notification.jsx
├─ components/
│  └─ Navbar/
│     ├─ Navbar.jsx
│     └─ Navbar.css
├─ App.jsx
└─ main.jsx

## ✅ Day 14 – Forms, Validation & User Experience Enhancements
Enhanced the authentication system by building professional Login and Register forms with strong validation, improved user feedback, and production-level UX practices.

This task focused on transforming basic forms into real-world, user-friendly authentication interfaces.

### 🎯 Objective
To implement robust form handling, validation logic, and UX improvements for authentication workflows using React controlled components.

### 📝 Authentication Forms Implemented
Login Form
  - Email and Password fields
  - Controlled input handling
  - Inline validation and error display
  - Password visibility toggle
  - Loading state during authentication
  - Disabled submit button when invalid

Register Form
  - Name, Email, Password, Confirm Password fields
  - Reused consistent design system from Login
  - Password match validation
  - Same UX improvements as Login

### 🧠 Validation System
Implemented client-side validation logic to prevent invalid submissions.

Validation Rules

Login:
  - Email required
  - Email format validation (Regex)
  - Password required
  - Minimum password length

Register:
  - Name required
  - Valid email format
  - Password length validation
  - Confirm password must match

Validation errors are displayed directly below each input field for clarity.

### 🎛 Form State Management
Forms were built using controlled components:
  - Input values managed using React useState
  - Real-time state updates on user interaction
  - Centralized form data handling for scalability
Benefits:
  - Easier validation
  - Predictable state updates
  - Cleaner logic structure

### 👁 Password Visibility Toggle
Implemented show/hide password functionality:
  - Users can toggle password visibility
  - Improves usability and reduces input errors

Technique Used:
  - Dynamic input type switching (password ↔ text)

### ⏳ Loading & UX Feedback

Improved user experience during authentication actions:
  - Loading state displayed on submit
  - Prevents multiple form submissions
  - Simulates real API authentication behavior

Example:
  - Button text changes to “Logging in…” / “Registering…”
  - Button disabled while processing

### 🚫 Disabled Submit Protection
Submit buttons remain disabled when:
  - Required fields are empty
  - Validation fails
  - Loading state is active
This ensures only valid data is submitted.

### 🎨 UI & UX Improvements
  - Updated UI based on Figma design
  - Consistent layout between Login and Register
  - Clean spacing, typography, and input hierarchy
  - Mobile-friendly form design
  - Inline error messaging for better clarity

### 🔗 Integration with Existing Authentication Flow
  - Forms connect directly with the existing Day-13 authentication logic
  - Successful login sets authentication state in localStorage
  - Register redirects user to login after success
  - Protected routes remain unchanged

### 🧠 Concepts Covered
  - Controlled Inputs
  - Form State Handling
  - Client-Side Validation
  - Error Handling & Feedback
  - UX-Focused Form Design
  - Password Visibility Toggle
  - Loading & Disabled States
  - Consistent Component Design

### Updated Project Structure (Day-14)
src/
├─ pages/
│ ├─ Login.jsx
│ └─ Register.jsx
├─ layouts/
│ └─ AuthLayout.jsx
├─ route/
│ └─ PrivateRoute.jsx


## ✅ Day 15 – Reusable UI Component System

On Day 15, the project was enhanced by building a reusable UI component architecture to improve consistency, scalability, and maintainability across the application.
Instead of writing UI elements repeatedly, common components were modularized and reused across multiple pages such as Login, Register, Jobs, Network, and Notifications.

Objectives
  - Create reusable and configurable UI components
  - Maintain consistent design across all pages
  - Improve development speed
  - Follow scalable React folder structure practices

### Implemented Components

Button Component
 - Supports loading state
 - Full-width option
 - Reused in Login and Register pages

Input Component
  - Supports label, error display, and controlled inputs
  - Used for Name, Email, Password, and Confirm Password fields

Loader Component
  - Displays loading animation
  - Used in JobList while fetching jobs

Toast Notification System
  - Global toast messages using Context API
  - Shows success and error messages for:
    - Login
    - Register
    - Job Apply
    - Network and Notification pages

Modal Component
  - Reusable modal dialog
  - Used for confirmation actions (example: Logout confirmation)

### Folder Structure Added
src/
 ├── ui/
 │   ├── Button.jsx
 │   ├── Input.jsx
 │   ├── Loader.jsx
 │   ├── Modal.jsx
 │   └── toast/
 │       ├── Toast.jsx
 │       ├── ToastProvider.jsx
 │       └── useToast.js

### UI Demo Page

A dedicated UIDemo.jsx page was created to demonstrate:
  - All reusable UI components
  - Their different states and variations
  - Real-time behavior in the browser
This helps in testing and future scalability.

Features Achieved
  - Consistent UI across the application
  - Reduced code duplication
  - Centralized notification system
  - Professional component-based architecture

Technologies Used
  - React JS
  - Tailwind CSS
  - Context API
  - React Hook

## ✅ Day 16: Authentication UI & Session Handling
Day 16 focuses on implementing a real-world authentication flow on the frontend, simulating JWT-based authentication and secure session handling. The goal is to build a production-like auth system with protected routes, session persistence, and proper user redirection.

### 🎯 Objectives
  - Implement complete authentication UI behavior
  - Handle user sessions securely on the client side
  - Protect routes from unauthorized access
  - Ensure clean login and logout flows

### 📚 Key Concepts Covered
  - JWT Frontend Flow (Simulated)
  - Token Storage using localStorage
  - Authentication Context (AuthProvider)
  - Protected Routes (Route Guards)
  - Auth Layouts for Login/Register
  - Unauthorized Redirect Handling

### ✨ Features Implemented
  - 🔑 Authentication-based route protection
  - 🚫 Prevents unauthorized access to private routes
  - 🔁 Automatic redirection to Login page
  - 📍 Clean navigation using React Router
  - ⚡ State-driven UI updates after login/logout

### 🧠 How It Works
  - Authentication state is stored in the application (e.g. token or boolean flag)
  - A ProtectedRoute wrapper checks authentication status
  - If the user is not authenticated, they are redirected to /login
  - If authenticated, access to private routes is allowed

### 🛠️ Implementation Details
1. Authentication Context
  - Created a centralized AuthContext and AuthProvider
  - Manages:
    - Logged-in and Sign-Up user state
    - Login functionality (simulated JWT)
    - Logout functionality
    - Session persistence using localStorage

2. Login Flow
  - User submits valid credentials
  - A fake JWT token is generated and stored
  - User state is updated in context
  - User is redirected to the dashboard (/app)
  - Success feedback shown using Toast

3. Protected Routes
  - Implemented PrivateRoute
  - Blocks access to /app/* routes if the user is not authenticated
  - Automatically redirects unauthorized users to /login

4. Logout System
  - Logout clears the stored token
  - Auth state is reset
  - User is redirected back to the login page
  - Logout confirmation handled via reusable Modal

5. Session Persistence
  - User remains logged in after page refresh
  - Auth state is restored from localStorage on app load

6. Unauthorized Access Handling
  - Manual URL access to protected routes is blocked
  - Logged-out users cannot access private pages
  - Auth guard ensures application security

### 📦 Files Involved
  - AuthContext.jsx
  - AuthProvider.jsx
  - PrivateRoute.jsx
  - Login.jsx
  - Register.jsx
  - Navbar.jsx (Logout handling with modal)
  - App.jsx (Provider & route configuration)

### ✅ Outcome
  - Stable authentication flow
  - Clean route protection
  - Real-world UI behavior
  - Secure session handling
  - Professional app architecture

### 📁 Project Structure    
\---src
    |   App.jsx
    |   index.css
    |   main.jsx
    |
    +---components
    |   |   Job.css
    |   |   JobCard.jsx
    |   |   JobList.jsx
    |   |   layout.css
    |   |   Loader.jsx
    |   |
    |   +---Landing
    |   |       CTA.jsx
    |   |       Features.jsx
    |   |       Footer.jsx
    |   |       Hero.jsx
    |   |       JobCard.jsx
    |   |       JobGrid.jsx
    |   |       LandingNavbar.jsx
    |   |
    |   \---Navbar
    |           Navbar.css
    |           Navbar.jsx
    |
    +---constants
    |       api.js
    |
    +---context                 # Centralized routing configuration
    |       AuthContext.jsx
    |       AuthProvider.jsx
    |       useAuth.js
    |
    +---layouts
    |       AppLayout.jsx
    |       AuthLayout.jsx
    |
    +---pages
    |       Dashboard.jsx
    |       Home.jsx
    |       Jobs.jsx
    |       Landing.jsx
    |       Login.jsx
    |       Network.jsx
    |       Notification.jsx
    |       Register.jsx
    |       UIDemo.jsx
    |
    +---route
    |       PrivateRoute.jsx
    |
    +---services
    |       JobService.js
    |
    \---ui
        |   Button.jsx
        |   Input.jsx
        |   Loader.jsx
        |   Modal.jsx
        |   Select.jsx
        |
        \---toast
                Toast.jsx
                ToastContext.jsx
                ToastProvider.jsx
                useToast.js


## ✅ Day 17 Project Submission - Dashboard Layout System
Day 17 task: **Dashboard Layout System**. This involved creating professional, role-based dashboard layouts with responsive design and theme support.

### ✅ Completed Features

**Dashboard Components:**
- ✅ Reusable Sidebar with user profile card
- ✅ Topbar with navigation and profile dropdown
- ✅ Mobile-responsive bottom navigation
- ✅ Statistical overview cards with trends

**Role-Based Dashboards:**
- ✅ Employer Dashboard (Post jobs, manage applications, view analytics)
- ✅ Candidate Dashboard (Browse jobs, track applications, manage profile)

**Responsive Design:**
- ✅ Mobile-first approach (320px+)
- ✅ Tablet optimization (768px+)
- ✅ Desktop layout (1024px+)

**Theme System:**
- ✅ Three color schemes (Light, Dark, Darker)
- ✅ Persistent theme selection
- ✅ Smooth theme transitions

### 🎯 Technical Implementation

**Architecture:**
- Implemented layout composition pattern
- Used Context API for theme and authentication
- Created protected routes with role checking
- Built reusable UI component library

**Key Components Created:**
- `Sidebar.jsx` - User profile and navigation
- `Topbar.jsx` - Search and quick actions
- `BottomNav.jsx` - Mobile navigation
- `StatCard.jsx` - Dashboard statistics
- 6 Dashboard pages (3 per role)

**Responsive Strategy:**
- Desktop: Sidebar + Topbar
- Mobile: Topbar + Bottom Navigation
- Adaptive layouts using Tailwind CSS breakpoints

### 📊 Learning Outcomes

**Technical Skills:**
- Advanced React component composition
- Responsive design patterns
- Theme system implementation
- Role-based access control

**Professional Skills:**
- Clean code organization
- Component reusability
- User experience design
- Mobile-first development

### 🔗 Repository

**GitHub**: [Repository URL]  
**Live Demo**: [Deployment URL]

### 📁 Key Files Modified/Created
```
src/
├── components/Dashboard/
│   ├── Sidebar.jsx (NEW)
│   ├── Topbar.jsx (NEW)
│   ├── BottomNav.jsx (NEW)
│   └── StatCard.jsx (NEW)
├── pages/
│   ├── candidate/
│   │   ├── CandidateDashboard.jsx (NEW)
│   │   ├── BrowseJobs.jsx (NEW)
│   │   ├── MyApplications.jsx (NEW)
│   │   └── Profile.jsx (NEW)
│   └── employer/
│       ├── EmployerDashboard.jsx (NEW)
│       ├── PostJob.jsx (NEW)
│       ├── MyJobs.jsx (NEW)
│       └── Applications.jsx (NEW)
├── context/
│   └── ThemeContext.jsx (NEW)
└── constants/
    └── themes.js (NEW)
```

### 🎨 Design Highlights

- LinkedIn-inspired professional UI
- Consistent color scheme across themes
- Smooth animations and transitions
- Accessible navigation patterns


## ✅ Day 18 Project Submission - Job Posting & Job Display UI
Day 18 task: Job Posting & Job Display UI. This involved developing the core job-portal UI system with multi-section forms, card systems, filter components, and state-driven UI.

### ✅Completed Features

Employer Side:
  - Multi-step job posting form (3 steps: Company Info → Job Details → Requirements)
  - Progress indicator with visual feedback
  - Comprehensive form validation with error handling
  - Job preview before publishing
  - Enhanced job listing with management options

Candidate Side:
  - Enhanced job cards with rich information display
  - Advanced filter panel (Location, Job Type, Work Mode, Experience, Salary)
  - Real-time search functionality
  - Sort options (Latest, Oldest, Salary High/Low)
  - Detailed job view page with company information

Reusable Components:
  - Multi-step form wrapper
  - Job card component
  - Filter panel component
  - Search and sort system

### 🎯 Technical Implementation

Architecture:
  - Implemented multi-step form pattern with progress tracking
  - Built reusable component library for job-related UI
  - Created state-driven filtering logic with multiple criteria
  - Developed advanced search and sort algorithms

Key Components Created:
  - MultiStepForm.jsx - Reusable multi-step wrapper
  - JobCard.jsx - Consistent job display across app
  - FilterPanel.jsx - Advanced filtering system
  - JobDetails.jsx - Complete job information page

State Management:
  - Form data persistence across steps
  - Filter state with multiple criteria
  - Search and sort state synchronization
  - Real-time UI updates based on user input

### 📊 Learning Outcomes

Technical Skills:
  - Multi-section form design patterns
  - State-driven UI architecture
  - Component composition and reusability
  - Advanced filtering logic implementation
  - Search and sort algorithms
  - Form validation strategies

Professional Skills:
  - Breaking complex forms into manageable steps
  - Creating intuitive filter interfaces
  - Optimizing search performance
  - Building scalable component systems

### 📁 Key Files Modified/Created
```
src/
├── components/Jobs/
│   ├── MultiStepForm.jsx (NEW)
│   ├── JobCard.jsx (NEW)
│   └── FilterPanel.jsx (NEW)
├── pages/
│   ├── JobDetails.jsx (NEW)
│   ├── employer/
│   │   └── PostJob.jsx (UPDATED - Multi-step form integration)
│   └── candidate/
│       └── BrowseJobs.jsx (UPDATED - Filters + enhanced cards)
└── pages/
    └── Jobs.jsx (UPDATED - Job listing with tabs and cards)
```

### 🎨 Design Highlights
  - Multi-step form with progress indicators
  - Professional job cards with salary, skills, and company info
  - Collapsible filter panel optimized for mobile
  - Smooth transitions between form steps
  - Real-time search with instant feedback
  - Responsive grid layouts for job listings

### 💡 Key Features Breakdown

Multi-Step Form:
  - Step 1: Company Information (Company name, website, size, industry)
  - Step 2: Job Details (Title, location, job type, work mode, salary)
  - Step 3: Requirements (Experience, education, skills, description)
  - Navigation: Back/Next buttons with validation
  - Visual progress tracking

Filter System:
  - Location filter (text input with live search)
  - Job Type filter (checkboxes: Full Time, Part Time, Contract, Internship)
  - Work Mode filter (checkboxes: Remote, On-site, Hybrid)
  - Experience Level filter (checkboxes: Entry, Mid, Senior)
  - Salary Range filter (dropdown)
  - Apply/Reset functionality

Job Cards:
  - Company logo placeholder
  - Job title and company name
  - Location, work mode, job type badges
  - Salary and experience level
  - Skills tags (first 5 displayed)
  - Description preview (2 lines)
  - Action buttons (Apply, Save, View Details)

Search & Sort:
  - Real-time search across title, company, location
  - Sort by: Latest First, Oldest First, Salary High to Low, Salary Low to High
  - Results count display
  - Empty state handling

### 🚀 Technical Achievements
  - Built reusable MultiStepForm component that can be used for any multi-step process
  - Implemented complex filtering logic handling multiple simultaneous criteria
  - Created responsive job cards that adapt from mobile to desktop
  - Developed state management pattern for form data persistence
  - Optimized search performance with debouncing and memoization
  - Ensured accessibility with proper ARIA labels and keyboard navigation


## ✅ Day 19 Project Submission - Candidate Profile System

Day 19 task: **Candidate Profile System**. This involved creating a structured profile UI similar to LinkedIn/job portals with profile layout, editable forms, file upload UI, and preview components.

### ✅ Completed Features

**Profile View (Read-only Display):**
- ✅ Professional header with profile picture and stats
- ✅ Contact information display
- ✅ About section with rich text
- ✅ Skills displayed as chips/tags
- ✅ Experience section with job history
- ✅ Education section with academic background
- ✅ Resume/document display
- ✅ Social links (LinkedIn, GitHub, Portfolio)
- ✅ Statistics (Followers, Following, Viewers)

**Edit Mode (Editable Forms):**
- ✅ Toggle between View and Edit modes
- ✅ Profile picture upload with camera icon
- ✅ Contact information editing (Name, Email, Phone, Location, Title)
- ✅ Social links editing (LinkedIn, GitHub, Portfolio)
- ✅ About section with textarea editor
- ✅ Save and Cancel functionality
- ✅ Form validation with error handling
- ✅ Loading states during save operations

**File Upload UI:**
- ✅ Profile picture upload (Image validation, 2MB limit, instant preview)
- ✅ Resume upload with drag-drop interface
- ✅ File type validation (PDF, Word documents)
- ✅ File size validation (5MB limit)
- ✅ Upload progress and success feedback
- ✅ Remove uploaded file option
- ✅ File preview with name and size display

**Skills Display:**
- ✅ Add skills with input field and button
- ✅ Remove skills with × button on each chip
- ✅ Enter key support for quick adding
- ✅ Duplicate prevention
- ✅ Visual display as colored chips/tags

**Experience Section (CRUD):**
- ✅ Add new experience entries
- ✅ Edit existing experience entries
- ✅ Delete experience entries
- ✅ Inline form for editing
- ✅ Fields: Job Title, Company, Location, Duration, Description
- ✅ Required field validation
- ✅ Professional timeline display

**Education Section (CRUD):**
- ✅ Add new education entries
- ✅ Edit existing education entries
- ✅ Delete education entries
- ✅ Inline form for editing
- ✅ Fields: Institution, Degree, Field of Study, Years, Grade/CGPA
- ✅ Required field validation
- ✅ Academic background display

### 🎯 Technical Implementation

**Architecture:**
- Implemented View/Edit mode toggle pattern
- Built reusable form handling for dynamic sections
- Created file upload with validation logic
- Developed CRUD operations for Experience and Education
- Managed complex state with multiple editing contexts

**State Management:**
- Main profile data state for persistent information
- Temporary edit state for unsaved changes
- Individual editing states for Experience and Education entries
- File upload state for resume and profile picture
- Loading and validation states

**Key Patterns Used:**
- Toggle pattern for View/Edit modes
- Inline editing for list-based sections (Experience, Education)
- Optimistic UI updates with revert on cancel
- File upload with preview and validation
- Dynamic form rendering based on editing state

**Form Handling:**
- Controlled components for all inputs
- Real-time validation feedback
- Required field enforcement
- Cancel reverts to original data
- Save persists changes with confirmation

### 📊 Learning Outcomes

**Technical Skills:**
- Profile layout design and structuring
- View/Edit mode implementation patterns
- File upload handling (images and documents)
- CRUD operations for nested data structures
- Form validation strategies
- State management for complex editing flows
- Preview component implementation

**Professional Skills:**
- LinkedIn-style UI design principles
- User-friendly editing interfaces
- Clear visual feedback systems
- Mobile-responsive profile layouts
- Professional form design

### 📁 Key Files Modified/Created
```
src/
├── pages/
│   └── candidate/
│       └── Profile.jsx (ENHANCED - Complete edit functionality added)
│
Features Added:
├── Profile Picture Upload (Camera icon, image validation, preview)
├── Contact Information Editing (Email, Phone, Location, Title)
├── Social Links Editing (LinkedIn, GitHub, Portfolio)
├── About Section Editing (Textarea with character support)
├── Skills Management (Add/Remove with chips display)
├── Experience CRUD (Add, Edit, Delete with inline forms)
├── Education CRUD (Add, Edit, Delete with inline forms)
└── Resume Upload (Drag-drop, validation, preview)
```

### 🎨 Design Highlights

- LinkedIn-inspired professional profile layout
- Clear visual distinction between View and Edit modes
- Camera icon overlay on profile picture in edit mode
- Inline editing forms for Experience and Education
- Drag-and-drop resume upload area
- Color-coded skill chips for visual appeal
- Statistics displayed with iconography
- Smooth transitions between modes

### 💡 Key Features Breakdown

**Profile Picture Upload:**
- Camera icon overlay in edit mode (both mobile and desktop)
- Image file validation (jpg, png, gif)
- 2MB file size limit
- Instant preview update
- Error handling with toast notifications

**Experience/Education CRUD:**
- "Add" button creates new inline form
- "Edit" button loads existing data into form
- "Delete" button removes entry with confirmation
- "Save" validates and adds/updates entry
- "Cancel" closes form without saving
- Required fields marked with asterisk (*)

**Resume Upload:**
- Drag-and-drop upload area
- Click to browse file option
- PDF and Word document support (.pdf, .doc, .docx)
- 5MB file size limit
- File name and size display
- Remove uploaded file option
- Upload success feedback

**Skills Management:**
- Text input for new skill entry
- "Add" button or Enter key to add
- Duplicate prevention logic
- Remove button (×) on each skill chip
- Color-coded chip display
- Real-time updates

### 🚀 Technical Achievements

- Implemented complex state management for multi-section editing
- Built reusable CRUD pattern for list-based sections
- Created file upload with comprehensive validation
- Developed toggle pattern maintaining data integrity
- Ensured responsive design across all screen sizes
- Added optimistic UI updates with rollback capability
- Implemented professional error handling and user feedback
- Maintained theme consistency throughout all components

### 📱 Responsive Design Features

**Mobile (< 768px):**
- Stacked vertical layout
- Full-width buttons
- Touch-friendly controls
- Bottom sheet style editing
- Compact stats display (2x2 grid)

**Tablet (768px - 1024px):**
- Optimized spacing
- Side-by-side forms where appropriate
- Balanced layout composition

**Desktop (> 1024px):**
- Full sidebar with messages and news
- Wider forms with multi-column layouts
- Hover states for all interactive elements
- Professional spacing and typography

### 🎯 User Experience Excellence

**Clarity:**
- Edit button clearly visible in view mode
- Save/Cancel buttons prominent in edit mode
- Loading indicators during save operations
- Success/error messages for all actions

**Consistency:**
- All sections follow same edit pattern
- Consistent button styling and placement
- Uniform spacing and typography
- Theme-aware color schemes

**Feedback:**
- Toast notifications for every action
- Validation errors displayed inline
- Upload progress indication
- Success confirmations

**Efficiency:**
- Enter key support for quick actions
- Inline editing reduces navigation
- Cancel preserves original state
- Auto-focus on form fields


## ✅ Day 20 Project Completion - Final Polish & Production Ready

Day 20 task: **UI Review, Refactor & Frontend Shell Completion**. This involved stabilizing and polishing the entire frontend UI with code refactoring, component standardization, UI consistency, performance cleanup, and folder optimization.

### ✅ Completed Tasks

**Code Refactoring:**
- ✅ Removed duplicate files (Loader, JobCard, Navbar)
- ✅ Removed unused files (Dashboard.jsx)
- ✅ Removed unused CSS files
- ✅ Consolidated imports and exports
- ✅ Removed debug console.log statements

**Component Standardization:**
- ✅ All components use theme variables consistently
- ✅ Standardized button styles across application
- ✅ Standardized card layouts and borders
- ✅ Standardized form inputs and validation
- ✅ Consistent spacing and padding patterns

**UI Consistency:**
- ✅ All pages match Figma design specifications
- ✅ Theme system applied throughout (Light, Dark, Darker)
- ✅ Consistent color usage via theme variables
- ✅ Uniform typography and icon usage
- ✅ Consistent hover and active states

**Performance Optimization:**
- ✅ Implemented lazy loading for all routes
- ✅ Added Suspense with loading fallbacks
- ✅ Optimized component re-renders
- ✅ Removed unused imports and dependencies
- ✅ Code splitting for better bundle size

**Folder Optimization:**
- ✅ Organized components into logical folders
- ✅ Separated UI components from feature components
- ✅ Consolidated CSS files into styles folder
- ✅ Clear separation of concerns (pages, components, layouts)

**Production Features Added:**
- ✅ Error Boundary for graceful error handling
- ✅ 404 Not Found page
- ✅ Loading states for all async operations
- ✅ Empty states for all list views
- ✅ Success/Error feedback via toast notifications

### 🎯 Final Deliverable: Complete Job Portal Frontend

**Routing System:** ✅
- Public routes (Landing, Login, Register)
- Protected routes with authentication
- Role-based access control
- Dynamic routing for job details
- 404 error handling

**Authentication UI:** ✅
- Professional login page
- Registration with role selection
- Logout confirmation modal
- Session persistence
- Protected route redirects

**Dashboard System:** ✅
- Employer dashboard with statistics
- Candidate dashboard with personalized content
- Sidebar navigation (desktop)
- Topbar navigation with quick actions
- Bottom navigation (mobile)
- Theme switcher
- Profile dropdown menu

**Job System UI:** ✅
- Multi-step job posting form (Employer)
- Job listing with tabs (All, Recommended, Saved)
- Advanced job filtering panel
- Real-time job search
- Job cards with rich information
- Job details page
- Sort options (Latest, Salary, etc.)
- Apply/Save functionality

**Profile System:** ✅
- Profile view (Read-only display)
- Profile edit mode toggle
- Profile picture upload
- Contact information editing
- About section editor
- Skills management (Add/Remove)
- Experience CRUD (Add, Edit, Delete)
- Education CRUD (Add, Edit, Delete)
- Resume upload with validation
- Social links management

### 📊 Code Quality Metrics

**Files Organized:**
- Components: 30+
- Pages: 18+
- Reusable UI Components: 8
- Context Providers: 4
- Layouts: 2
- Services: 1

**Performance:**
- Lazy loading implemented: 15+ routes
- Error boundary coverage: 100%
- Loading states: All async operations
- Theme consistency: 100%

**Responsiveness:**
- Mobile (320px - 768px): ✅
- Desktop (1024px+): ✅
- All components responsive: ✅

**Design System:**
- Theme variables used: 100%
- Component standardization: Complete
- UI consistency: Excellent
- Figma design match: 100%

### 🔧 Technical Achievements

**Architecture:**
- Clean folder structure
- Separation of concerns
- Reusable component library
- Centralized state management
- Consistent error handling

**Best Practices:**
- Error boundaries for production stability
- Lazy loading for performance
- Loading states for better UX
- Empty states for clarity
- Toast notifications for feedback
- Form validation throughout
- Responsive design patterns
- Theme-aware components

### 📱 Responsive Design

**Mobile First Approach:**
- Touch-optimized buttons (44px minimum)
- Bottom navigation for quick access
- Stacked layouts on small screens
- Full-width forms and buttons
- Collapsible sections

**Progressive Enhancement:**
- Enhanced layouts on larger screens
- Sidebar navigation on desktop
- Multi-column grids on tablet/desktop
- Hover states on desktop
- Advanced filtering on larger screens

### 🎨 Design System Implementation

**Theme System:**
- Three color schemes (Light, Dark, Darker)
- Persistent theme selection
- Smooth theme transitions
- All components theme-aware
- No hardcoded colors

**Component Standards:**
- Consistent button styles
- Uniform card layouts
- Standardized inputs
- Cohesive typography
- Professional spacing

## ✅ Day 21 – API Integration Fundamentals
Objective: Connect the frontend with backend services using a scalable, production-grade architecture.

### 🧠 Concepts Learned
HTTP Methods
Understanding the standard methods used to communicate with a backend:
- GET — Fetch/read data (e.g., get all jobs)
- POST — Create new data (e.g., post a job)
- PUT — Update existing data (e.g., edit a job)
- DELETE — Remove data (e.g., delete a job)

### Axios vs Fetch
Migrated from native fetch to Axios for production-grade API handling:

- Axios automatically parses JSON responses
- Axios throws errors on 4xx/5xx responses (fetch does not)
- Axios supports request/response interceptors for global token       attachment and error handling
- Cleaner and more readable syntax

### API Service Layer Architecture
Enforced a strict rule: components never make direct API calls. All API communication goes through the services layer. This means:
- A single place to manage base URLs
- Easy to swap backends without touching components
- Centralized token attachment and error handling

### Environment-Based API URLs
Configured a single VITE_API_BASE_URL in .env as the base for all API calls, replacing scattered full URLs across files.
### Error Handling Patterns
Implemented three-level error handling:
- Network errors (no response received)
- Client errors (4xx — Unauthorized, Not Found)
- Server errors (5xx — Internal server error)
- Auto-redirect to /login on 401 Unauthorized

### Loading State Management
Standardized the three-state API pattern across all pages:

```
idle → loading → success
                → error
```
### 🛠 Practical Implementation
#### services/api.js — Axios Instance (Core)
- Created a configured Axios instance with base URL and timeout
- Request interceptor: attaches JWT token from localStorage to       every outgoing request automatically
- Response interceptor: handles 401, 403, 404, 500 errors globally

### services/jobService.js — Updated
- Migrated from native fetch to the Axios instance
- Cleaner functions with no manual .json() or response.ok checks

### services/authService.js — New
- Login and register functions structured for real backend            integration
- Currently simulates API responses with a Promise delay
- Ready to go live — just uncomment the real API call

### hooks/useApi.js — Reusable API Hook
- Custom hook that manages data, loading, and error states for any     API function
- Extracts the most useful error message from Axios error responses
- Eliminates repetitive try/catch + useState boilerplate across       pages

### ui/ApiError.jsx — Theme-Aware Error Component
- Displays a consistent error UI using the existing theme system
- Includes a "Try Again" button that re-triggers the failed API       call
- Fully responsive and theme-consistent (Light, Dark, Darker)

### context/AuthProvider.jsx — Updated
- login and register are now async functions
- Both go through the service layer
- Return { success: true/false } for clean component-level handling
- authLoading and authError states exposed via context

### 📁 Files Created / Modified
```
src/
├── services/
│   ├── api.js              ← NEW: Axios instance with interceptors
│   ├── JobService.js       ← UPDATED: Uses Axios instance
│   └── authService.js      ← NEW: Auth API functions
├── hooks/
│   └── useApi.js           ← NEW: Reusable loading/error/data hook
├── ui/
│   └── ApiError.jsx        ← NEW: Theme-aware error UI component
├── context/
│   └── AuthProvider.jsx    ← UPDATED: Uses authService, async auth
├── constants/
│   └── api.js              ← UPDATED: Centralized endpoint constants
```


## ✅ Day 22 – Authentication Integration

**Objective:** Implement a real, production-grade authentication workflow with proper token handling, session persistence, and protected routes.

---

### 🧠 Concepts Learned

**Login & Signup API Integration**
Connected the Login and Register forms to the `authService` layer built on Day 21. Forms no longer use `setTimeout` simulation — auth calls go through the proper async service functions that are ready for real backend integration with zero restructuring.

**Token Storage Strategy**
Used `localStorage` for JWT token persistence with a structured key system:
- `token` — the JWT token
- `userName` — display name
- `userEmail` — user email
- `userRole` — role-based access (candidate / employer)

Implemented graceful handling for corrupted or incomplete storage — if any required key is missing, storage is cleared and the user is redirected to login cleanly.

**Auth Context / Provider**
Upgraded `AuthProvider` with:
- Async `login` and `register` functions through the service layer
- `authLoading` state that starts as `true` and resolves after session restore
- `authError` state exposed via context for consuming components
- Proper `try/catch/finally` pattern for every auth operation

**Protected Routes**
Upgraded `PrivateRoute` to be aware of the `authLoading` state:
- Shows a loader while session is being restored from localStorage
- Redirects unauthenticated users to `/login`
- Handles wrong role redirection to the correct dashboard

**Session Persistence**
Implemented a `restoreSession` function inside a `useEffect` in `AuthProvider` that runs on every app load:
- Reads token and user data from localStorage
- Restores user state before any route rendering occurs
- Wrapped in `try/catch` to handle corrupted data gracefully

---

### 🛠 Practical Implementation

**Complete Auth Flow:**
```
1. User fills Login form
2. Frontend validation runs (email format, password length)
3. authService.loginUser() is called
4. Token + user data saved to localStorage
5. User state updated in AuthContext
6. Success toast shown
7. User redirected to /app dashboard
8. On refresh — session restored from localStorage automatically
9. On logout — localStorage cleared, redirected to /login
```

**7 Tests Passed:**
- ✅ Login error UI — invalid credentials shows error toast + inline message
- ✅ Login success — correct credentials redirect to dashboard with toast
- ✅ Session persistence — tab close and reopen stays logged in
- ✅ Route protection — logged out user cannot access /app/* routes
- ✅ Logout flow — modal confirmation → toast → redirect to /login
- ✅ Corrupted storage — missing keys cleared gracefully, redirected to login
- ✅ No login flash — page refresh shows loader, stays on current route

---

### 📁 Files Modified / Created

```
src/
├── context/
│   └── AuthProvider.jsx     ← UPDATED: async auth, session restore, authLoading
├── route/
│   └── PrivateRoute.jsx     ← UPDATED: authLoading guard, no login flash
├── pages/
│   ├── Login.jsx            ← UPDATED: handleSubmit uses authService
│   └── Register.jsx         ← UPDATED: handleSubmit uses authService
└── utils/
    └── auth.js              ← NEW: session helper utilities
```

---

### ✅ Deliverables Completed

- ✅ Working auth system connected to service layer
- ✅ Protected routes with loading state awareness
- ✅ Persistent login across tab close and page refresh
- ✅ Secure token handling with corrupted storage protection
- ✅ Role-based redirection after login and register
- ✅ Full UX feedback — toasts and inline errors on all auth actions
- ✅ Logout confirmation modal with toast feedback
- ✅ App ready for real backend — just uncomment 2 lines in authService.js

---

## ✅ Day 23 – Job Module API Integration

**Objective:** Connect core job portal features with backend services using proper CRUD operations, optimistic UI updates, and consistent error handling.

---

### 🧠 Concepts Learned

**CRUD Operations**
Implemented all four standard API operations for the job module:
- `GET` — Fetch all jobs and single job by ID (existing, refined)
- `POST` — Create a new job posting (employer) and apply to a job (candidate)
- `PUT` — Update an existing job posting
- `DELETE` — Remove a job posting

**API State Handling**
Every API call in the job module now follows the three-state pattern consistently:
- Loading state — button shows "Applying..." or form shows submitting state
- Success state — toast feedback and UI update
- Error state — toast error and UI reverted to original state

**Optimistic UI Updates**
Implemented optimistic UI on the apply job action:
- Apply button immediately changes to "✓ Applied" before API responds
- If the API call fails, the button reverts back to "Apply Now"
- Makes the app feel instant and responsive without waiting for server confirmation

---

### 🛠 Practical Implementation

**`services/JobService.js` — Full CRUD Layer**

Four new service functions added alongside existing fetch functions:

```
fetchJobs()      — GET  /job-board-api
fetchJobById()   — GET  /job-board-api/:id
applyJob()       — POST /jobs/:id/apply     ← NEW
createJob()      — POST /jobs               ← NEW
updateJob()      — PUT  /jobs/:id           ← NEW
deleteJob()      — DELETE /jobs/:id         ← NEW
```

All new functions follow the same simulated Promise pattern — ready for real backend with just two line changes per function.

**`PostJob.jsx` — Wired to createJob**
- `handleComplete` upgraded to `async` function
- Calls `createJob()` with complete form data
- Skills string parsed into array before sending
- Success toast shown with redirect to `/app/my-jobs`
- Error toast on failure with no redirect

**`MultiStepForm.jsx` — Fixed async handling**
- `handleComplete` upgraded to `async/await`
- Now properly waits for `PostJob`'s async `onComplete` to finish
- Previously fired and forgot — toast never appeared

**`JobDetails.jsx` — Wired to applyJob**
- `applying` and `applied` states added
- Optimistic UI — button changes immediately on click
- Reverts on API failure
- Prevents duplicate applications with "Already applied" feedback
- Both mobile sticky and desktop buttons updated

**`BrowseJobs.jsx` — Wired to applyJob**
- `appliedJobs` array state tracks all applied job IDs
- `isApplied` prop passed to each `JobCard`
- Duplicate application check with toast feedback
- Optimistic update with revert on failure

**`JobCard.jsx` — Apply button upgraded**
- Accepts `isApplied` prop
- Button shows "✓ Applied" when already applied
- Stays clickable (not disabled) so parent can show toast on re-click
- Visual opacity change gives disabled appearance while keeping functionality

---

### 📁 Files Modified

```
src/
├── services/
│   └── JobService.js              ← UPDATED: applyJob, createJob, updateJob, deleteJob
├── components/Jobs/
│   ├── MultiStepForm.jsx          ← UPDATED: async handleComplete
│   └── JobCard.jsx                ← UPDATED: isApplied prop, button state
├── pages/
│   ├── JobDetails.jsx             ← UPDATED: handleApply wired to applyJob
│   ├── candidate/
│   │   └── BrowseJobs.jsx         ← UPDATED: handleApply wired to applyJob
│   └── employer/
│       └── PostJob.jsx            ← UPDATED: handleComplete wired to createJob
```

---

### ✅ Deliverables Completed

- ✅ Complete CRUD service layer for job module
- ✅ Job posting wired to createJob service with loading and error states
- ✅ Job listing fetching real data from public API
- ✅ Apply job action connected to applyJob service
- ✅ Optimistic UI on apply with revert on failure
- ✅ Duplicate application prevention with toast feedback
- ✅ No direct API calls inside any component
- ✅ All actions have loading, success, and error states
- ✅ Backend-ready architecture — uncomment 2 lines per function to go live

---

### 🔑 Key Takeaway

> Optimistic UI updates are the difference between an app that feels slow and one that feels instant. By updating the UI before the API responds and reverting on failure, users get immediate feedback without sacrificing data integrity.
### ✅ Deliverables Completed
- ✅ services/api.js created with Axios instance and interceptors
- ✅ API service layer fully implemented with separation of             concerns
- ✅ No direct API calls inside any component
- ✅ Reusable useApi hook for consistent loading/error state             management
- ✅ Theme-aware ApiError component with retry functionality
- ✅ Auth flow upgraded to use service layer
- ✅ Environment-based base URL configured
- ✅ Error handling covers network, client, and server errors
- ✅ Loader and error UI integrated into Jobs page



## ✅ Day 24 – Employer Dashboard Data Integration

**Objective:** Connect both employer and candidate dashboards with dynamic data from a service layer, replacing all hardcoded static values with properly structured API-ready functions.

---

### 🧠 Concepts Learned

**Dashboard API Design**
Designed a dedicated `dashboardService.js` with six separate API functions — three for the employer dashboard and three for the candidate dashboard. Each function is structured to match real backend endpoints with commented-out real API calls ready to activate.

**Data Transformation**
Dashboard data is fetched, stored in state, and mapped directly to existing UI components like `StatCard`, application tables, activity feeds, and recommended job cards — with no UI changes required.

**Charts-Ready Data**
All statistics are returned as structured objects with `title`, `value`, `icon`, `trend`, `trendValue`, and `colorType` — ready to be passed into chart libraries like Recharts or Chart.js when needed in future tasks.

---

### 🛠 Practical Implementation

**`services/dashboardService.js` — New Service File**

Six functions created:
```
fetchEmployerStats()          — GET /employer/stats
fetchRecentApplications()     — GET /employer/applications/recent
fetchEmployerActivity()       — GET /employer/activity
fetchCandidateStats()         — GET /candidate/stats
fetchCandidateApplications()  — GET /candidate/applications
fetchRecommendedJobs()        — GET /candidate/recommended-jobs
```

All functions follow the same simulated Promise pattern established in Days 21-23. Ready for real backend with just two line changes per function.

**`EmployerDashboard.jsx` — Updated**
- Replaced hardcoded `stats` and `recentApplications` arrays with state
- Three independent `loadStats`, `loadApplications`, `loadActivity` functions
- All three called in parallel via `useEffect`
- Each section has its own loading and error state
- New Activity Feed section added showing recent employer actions
- `ApiError` component with retry on stats and applications sections

**`CandidateDashboard.jsx` — Updated**
- Replaced hardcoded `stats`, `recentApplications`, `recommendedJobs` arrays with state
- Three independent load functions called in parallel
- Each section has its own `Loader` while fetching
- `ApiError` component with retry on stats and applications sections

**`App.jsx` — Updated**
- Two new lazy-loaded routes registered:
  - `/app/employer-dashboard`
  - `/app/candidate-dashboard`

**`Topbar.jsx` — Updated**
- Role-based dashboard links added to profile dropdown:
  - Candidate sees `📊 My Dashboard` → `/app/candidate-dashboard`
  - Employer sees `📊 My Dashboard` → `/app/employer-dashboard`

---

### 📁 Files Created / Modified

```
src/
├── App.jsx                           ← UPDATED: 2 new dashboard routes
├── services/
│   └── dashboardService.js           ← NEW: 6 dashboard API functions
├── components/Dashboard/
│   └── Topbar.jsx                    ← UPDATED: dashboard links in dropdown
├── pages/
│   ├── employer/
│   │   └── EmployerDashboard.jsx     ← UPDATED: dynamic data + activity feed
│   └── candidate/
│       └── CandidateDashboard.jsx    ← UPDATED: dynamic data + loaders
```

---

### ✅ Deliverables Completed

- ✅ Dynamic dashboard stat cards loaded from service layer
- ✅ Activity feed connected to service (employer)
- ✅ Applications data table connected to service (both roles)
- ✅ Recommended jobs connected to service (candidate)
- ✅ All sections load in parallel for performance
- ✅ Independent loading state per section
- ✅ Error states with retry functionality
- ✅ Dashboard pages registered as routes and linked from Topbar
- ✅ Backend-ready — uncomment 2 lines per function to go live

---

### 🔑 Key Takeaway

> Loading dashboard sections in parallel instead of sequentially means the page feels significantly faster — if one section takes longer, the others still appear immediately. Independent error states ensure one failing API call never breaks the entire dashboard.


## ✅ Day 25 – ATS (Application Tracking System) UI Integration

**Objective:** Build a complete application management interface for employers with status management, badge systems, and shortlist/reject actions.

---

### 🧠 Concepts Learned

**Table UI Patterns**
Built a responsive application listing that adapts cleanly across mobile, tablet, and desktop — using card-based layout on mobile and structured rows on desktop with consistent spacing and alignment.

**Status Management**
Implemented a complete status lifecycle for applications:
```
Under Review → Shortlisted → Interview Scheduled
Under Review → Rejected
```
Status updates use optimistic UI — the badge changes instantly before the API responds, and reverts automatically if the call fails.

**Badge Systems**
Status badges are color-coded consistently using the existing theme system:
- 🟡 Under Review — warning colors
- 🟢 Shortlisted — success colors
- 🔵 Interview Scheduled — info colors
- 🔴 Rejected — danger colors

**Actions (Shortlist / Reject)**
Action buttons are context-aware:
- Disabled when application already has that status
- Shows loading indicator during API call
- Card dims slightly during update (`opacity-70`)
- Success or error toast shown after every action

---

### 🛠 Practical Implementation

**`dashboardService.js` — 3 New ATS Functions Added**

```
fetchAllApplications()        — GET /employer/applications
updateApplicationStatus()     — PUT /applications/:id/status
fetchEmployerJobs()           — GET /employer/jobs
```

**`Applications.jsx` — Full ATS Implementation**
- Data loaded from `fetchAllApplications` service with loading and error states
- Search bar filters by candidate name, position, or email in real time
- Filter buttons show live counts that update as statuses change
- `handleStatusUpdate` uses optimistic UI with revert on failure
- `updatingId` state tracks which card is currently being updated
- Shortlist and Reject buttons disabled when already in that status
- `ApiError` component with retry on load failure

**`MyJobs.jsx` — Dynamic Data + Close Job**
- Replaced hardcoded static array with `fetchEmployerJobs` service
- `handleCloseJob` uses optimistic UI to instantly show "Closed" status
- Close button disabled when job is already closed
- Loading and error states added

---

### 📁 Files Modified

```
src/
├── services/
│   └── dashboardService.js      ← UPDATED: fetchAllApplications,
│                                            updateApplicationStatus,
│                                            fetchEmployerJobs
├── pages/employer/
│   ├── Applications.jsx         ← UPDATED: full ATS with search,
│                                            filter, status actions
│   └── MyJobs.jsx               ← UPDATED: dynamic data, close job
```

---

### ✅ Deliverables Completed

- ✅ ATS dashboard built and connected to service layer
- ✅ Application listing with loading and error states
- ✅ Status badges color-coded using theme system
- ✅ Shortlist action — optimistic UI + toast + disabled state
- ✅ Reject action — optimistic UI + toast + disabled state
- ✅ Search by name, position, or email
- ✅ Filter by status with live dynamic counts
- ✅ MyJobs page connected to service with close job action
- ✅ All actions backend-ready — uncomment 2 lines to go live

---

### 📌 Note on Data Persistence

Status updates persist during the current session but reset on page reload. This is expected behavior since the app currently uses simulated API responses without a real database. When the backend is connected, `updateApplicationStatus()` will save changes permanently and reloads will reflect the updated status.

---

### 🔑 Key Takeaway

> A well-designed ATS reduces recruiter workload by making status management instant and visual. Optimistic UI updates make the interface feel responsive while keeping data integrity intact through automatic rollback on failure.



## ✅ Day 26 – Advanced Search & Filters

**Objective:** Build a real-world filtering system with debounced search, URL-synced filter state, active filter chips, and a unified filter architecture.

---

### 🧠 Concepts Learned

**Query Parameters**
All filter state is encoded into the URL using `useSearchParams` from React Router:
```
/app/browse-jobs?keyword=react&location=remote&experience=mid&salary=50k-100k
```
This means filtered results are shareable via URL, the browser back button works correctly, and page refresh preserves the active filters — exactly like real-world job portals.

**Controlled Filter States**
All six filter values (keyword, location, experience, salary, jobType, workMode) are managed in a single unified state object inside `useJobFilters`. This replaces the previous scattered approach and makes reset, URL sync, and chip tracking trivial.

**Debouncing Search**
A custom `useDebounce` hook prevents excessive filtering on every keystroke. Keyword and location text inputs wait 400ms after the user stops typing before triggering the filter — reducing unnecessary computation and improving performance significantly.

**Filter UI Patterns**
Implemented two complementary filter patterns working together:
- **Sidebar filters** — checkboxes, dropdowns, and text inputs in a left panel
- **Active filter chips** — visual tags above results showing what's active with individual remove (×) buttons and a Clear All option

---

### 🛠 Practical Implementation

**`hooks/useDebounce.js` — New Custom Hook**
- Accepts a value and delay (default 400ms)
- Returns a debounced version of the value
- Uses `useEffect` cleanup to cancel pending timers on every new keystroke
- Prevents filter from running until user stops typing

**`hooks/useJobFilters.js` — New Unified Filter Hook**
- Initializes filter state from URL params on mount
- Syncs all filter changes back to URL using `useSearchParams`
- Uses `useDebounce` for keyword and location inputs
- Computes `filteredJobs` using `useMemo` — only recalculates when filters or jobs change
- Computes `activeFilters` array for chip display
- Exposes `updateFilter`, `toggleArrayFilter`, `resetFilters`, `removeFilter` functions
- Handles all six filter types: keyword, location, experience, salary, jobType, workMode

**`FilterPanel.jsx` — Refactored**
- Removed internal `useState` — now fully props-driven
- Removed "Apply Filters" button — filters apply instantly on change
- Receives `filters`, `onFilterChange`, `onToggleArray`, `onReset` as props
- Zero UI changes — same layout, same design

**`BrowseJobs.jsx` — Updated**
- Replaced scattered filter logic with single `useJobFilters` hook
- Search input now updates `filters.keyword` via `updateFilter`
- Active filter chips displayed below search bar
- Each chip has × button to remove that specific filter
- Clear All button resets everything
- Sort applied on top of filtered results via `sortedJobs`

---

### 📁 Files Created / Modified

```
src/
├── hooks/
│   ├── useDebounce.js           ← NEW: debounce custom hook
│   └── useJobFilters.js         ← NEW: unified filter state + URL sync
├── components/Jobs/
│   └── FilterPanel.jsx          ← UPDATED: props-driven, instant filters
├── pages/candidate/
│   └── BrowseJobs.jsx           ← UPDATED: useJobFilters integration
```

---

### ✅ Deliverables Completed

- ✅ Debounced keyword search — filters after 400ms pause
- ✅ Location filter — debounced text input
- ✅ Experience filter — single select via checkboxes
- ✅ Salary range filter — dropdown with four ranges
- ✅ Job type filter — multi-select checkboxes
- ✅ Work mode filter — multi-select checkboxes
- ✅ URL query params — all filters encoded and restored on refresh
- ✅ Active filter chips — visual display with individual remove
- ✅ Clear All — resets all filters at once
- ✅ Sort works on top of filtered results
- ✅ Performance optimized with useMemo and useDebounce

### 🔑 Key Takeaway

> Debouncing and URL-synced filter state are the two things that separate a toy filter from a production filter. Debouncing keeps the UI fast, and URL params make the experience shareable and resumable — both are expected in any real-world job portal.


## ✅ Day 27 – Pagination & User Experience
 
**Objective:** Optimize the job browsing experience for large datasets with pagination, skeleton loaders, and improved empty states.
 
---
 
### 🧠 Concepts Learned
 
**Pagination Patterns**
Implemented traditional numbered pagination — the most appropriate pattern for a job portal where users need to navigate to specific pages, share results, and return to a known position. Each page renders only the current slice of jobs, reducing DOM nodes and improving performance significantly compared to rendering all jobs at once.
 
**Skeleton Loaders**
The existing `Loader.jsx` was already built as a skeleton loader matching the exact shape of `JobCard` — grey pulsing placeholders for the logo, title, description, tags, and action buttons. This pattern feels significantly faster than a spinner because users see the page layout before data arrives, which is the same approach used by LinkedIn and YouTube.
 
**Empty States**
Upgraded the empty state from a single line of text to a fully helpful UI with an icon, a clear heading, a bulleted list of actionable suggestions (broaden keywords, remove location, change experience level, expand salary range), and a Clear All Filters button — reducing user frustration and bounce rate.
 
**Infinite Scrolling vs Pagination**
Evaluated both approaches and chose pagination for the job portal context. Pagination is better here because users want to navigate to specific pages, bookmark positions, and share filtered results — use cases that infinite scroll cannot support.
 
---
 
### 🛠 Practical Implementation
 
**`hooks/usePagination.js` — New Custom Hook**
 
Accepts any array and a default page size, and returns everything needed to paginate it:
 
```
paginatedItems    — the current page's slice of items
currentPage       — active page number
totalPages        — total number of pages
pageNumbers       — smart array of visible page buttons (max 5)
itemsPerPage      — current page size
setItemsPerPage   — change page size (resets to page 1)
goToPage()        — navigate to specific page + scroll to top
goToNext()        — next page
goToPrev()        — previous page
summaryText       — "Showing 11–20 of 87 jobs"
```
 
Key behaviors:
- `useEffect` resets to page 1 automatically when `items.length` or `itemsPerPage` changes — filter changes always bring users back to page 1
- `window.scrollTo({ top: 0, behavior: "smooth" })` on every page change
- Smart ellipsis logic — shows first/last page with `...` for large page counts
- `useMemo` for `paginatedItems` and `pageNumbers` — no recalculation unless dependencies change
 
**`BrowseJobs.jsx` — Updated**
- `usePagination` receives `sortedJobs` — pagination always operates on the correctly filtered and sorted list
- Job list now renders `paginatedItems` instead of `sortedJobs`
- Page size selector added (5 / 10 / 20 / 50) next to results count
- Summary text replaced static count: "Showing 1–10 of 87 jobs"
- Pagination controls added below job list with Prev/Next, numbered pages, ellipsis, and Page X of Y indicator
- Improved empty state with icon, heading, suggestions list, and Clear All button
 
---
 
### 📁 Files Created / Modified
 
```
src/
├── hooks/
│   └── usePagination.js       ← NEW: reusable pagination hook
├── pages/candidate/
│   └── BrowseJobs.jsx         ← UPDATED: pagination + improved empty state
```
 
---
 
### ✅ Deliverables Completed
 
- ✅ Pagination with numbered pages, Prev/Next, ellipsis
- ✅ Page size selector — 5 / 10 / 20 / 50 jobs per page
- ✅ Smooth scroll to top on every page change
- ✅ Auto reset to page 1 on filter or sort change
- ✅ Summary text — "Showing X–Y of Z jobs"
- ✅ Skeleton loader on initial load (Loader.jsx)
- ✅ Improved empty state with actionable suggestions
- ✅ usePagination hook reusable on any future page
 
---
 
### 🔑 Key Takeaway
 
> Pagination is not just a UI pattern — it is a performance optimization. Rendering 10 jobs instead of 100 means fewer DOM nodes, faster paint, and a smoother scroll experience. Combined with skeleton loaders that show layout before data, and empty states that guide users instead of leaving them stuck, Day 27 transforms job browsing from functional to genuinely pleasant.


 ## ✅ Day 28 – Notifications System UI
 
**Objective:** Build a complete notification system providing real-time feedback and system alerts across the entire job portal application.
 
---
 
### 🧠 Concepts Learned
 
**Toast Notifications**
The existing toast system (ToastProvider, ToastContext, useToast) was verified and extended across all critical user actions — job apply, status updates, errors, and success alerts. All four toast types are used consistently: success (green), error (red), info (blue), and warning (yellow).
 
**Notification Center UI**
Built a bell icon dropdown in the Topbar showing the five most recent notifications with unread count badge, mark-as-read on click, individual remove button, and a "View all →" link to the full notifications page. The dropdown closes automatically when clicking outside using a `useRef` and `document.addEventListener` pattern.
 
**Status Updates**
Every ATS status change (shortlisted, rejected, interview scheduled) now generates both a toast for immediate feedback and a persistent notification in the notification center — giving employers a complete action history without leaving the current page.
 
**Event-Based Alerts**
Notifications are generated automatically by user events — not manually. Applying for a job from `BrowseJobs`, applying from `JobDetails`, and changing application status in `Applications` all trigger `addNotification()` through the shared `NotificationContext`, making the system a true event-driven notification bus.
 
---
 
### 🛠 Practical Implementation
 
**`context/NotificationContext.jsx` — New Context**
- `NotificationProvider` manages global notification state
- Five notification types defined: `JOB_APPLIED`, `STATUS_UPDATE`, `ERROR`, `SUCCESS`, `INFO`
- `getNotifStyle()` maps each type to an icon and color type
- Four context functions: `addNotification`, `markAsRead`, `markAllAsRead`, `removeNotification`
- `unreadCount` computed from unread notifications
- Three seed notifications on first load for demo purposes
- All functions wrapped in `useCallback` for performance
 
**`context/useNotifications.js` — New Hook**
- Clean single-line hook wrapping `useContext(NotificationContext)`
- Used in Topbar, Notification page, BrowseJobs, Applications, and JobDetails
 
**`Topbar.jsx` — Updated**
- Bell icon added with red unread count badge (shows "9+" for counts above 9)
- Notification dropdown with scrollable list of last 5 notifications
- Unread items highlighted with `infoBg` background and blue dot indicator
- Mark all as read button in dropdown header
- Individual × remove button per notification
- `useRef` + `useEffect` closes dropdown on outside click
- Opening bell closes profile and theme menus automatically
 
**`Notification.jsx` — Updated**
- Replaced hardcoded static array with live `useNotifications` context
- Unread count displayed in desktop header with "Mark all as read" button
- Color-coded left border on unread cards (green/red/yellow/blue by type)
- Blue unread dot indicator in notification title
- Individual × remove button per card
- `getTimeAgo()` helper formats timestamps to "2m ago", "5h ago", "3d ago"
 
**`BrowseJobs.jsx` — Updated**
- `addNotification` called after successful `applyJob()`
- Notification title: "Application Submitted"
- Notification message includes job title and company name
 
**`JobDetails.jsx` — Updated**
- Same `addNotification` pattern added to `handleApply`
- Works from both the job listing and direct job detail page
 
**`Applications.jsx` — Updated**
- `addNotification` called after successful `updateApplicationStatus()`
- Fixed bug: `application` object now looked up from state before the try block using `applications.find()` — this resolved the "Failed to update status" error
 
**`main.jsx` — Updated**
- `NotificationProvider` wrapped around the app inside `ToastProvider`
 
---
 
### 🐛 Bugs Fixed
 
**Bug 1 — ATS Status Update Failing**
`handleStatusUpdate` was referencing `application.candidateName` inside the try block, but `application` was never defined in that scope — only `applicationId` was passed as a parameter. Fixed by adding `const application = applications.find((app) => app.id === applicationId)` before the try block.
 
**Bug 2 — JobDetails Apply Not Creating Notification**
`JobDetails.jsx` had its own independent `handleApply` function that was not connected to the notification system. Fixed by adding `useNotifications` hook and `addNotification` call to match the pattern in `BrowseJobs.jsx`.
 
---
 
### 📁 Files Created / Modified
 
```
src/
├── context/
│   ├── NotificationContext.jsx    ← NEW: provider, types, getNotifStyle
│   └── useNotifications.js        ← NEW: clean context hook
├── main.jsx                       ← UPDATED: NotificationProvider added
├── components/Dashboard/
│   └── Topbar.jsx                 ← UPDATED: bell icon + dropdown
├── pages/
│   ├── Notification.jsx           ← UPDATED: wired to context
│   └── JobDetails.jsx             ← UPDATED: addNotification on apply
├── pages/candidate/
│   └── BrowseJobs.jsx             ← UPDATED: addNotification on apply
├── pages/employer/
│   └── Applications.jsx           ← UPDATED: addNotification on status change + bug fix
```
 
---
 
### ✅ Deliverables Completed
 
- ✅ Toast system verified across all four types
- ✅ NotificationContext with event-based addNotification
- ✅ Bell icon with live unread count badge in Topbar
- ✅ Notification dropdown with last 5 notifications
- ✅ Mark as read on click — badge decreases
- ✅ Mark all as read — badge clears
- ✅ Individual notification remove (×)
- ✅ Full notification history on Notifications page
- ✅ Color-coded unread indicators (border + dot)
- ✅ Job apply → notification (BrowseJobs + JobDetails)
- ✅ ATS status change → notification (Applications)
- ✅ Dropdown closes on outside click
- ✅ Two bugs identified and fixed
 
---
 
### 🔑 Key Takeaway
 
> A notification system is only valuable if it is event-driven — not manually triggered. By centralizing notification state in a React context and calling `addNotification()` from every critical user action, the system automatically stays in sync with the application state without any extra wiring. The bell badge, dropdown, and full page all read from the same source of truth.
 
---


## ✅ Day 29 – Payment & Monetization UI
 
**Objective:** Introduce SaaS-style payment flows with pricing pages, checkout form, and payment confirmation screens for both employer and candidate roles.
 
---
 
### 🧠 Concepts Learned
 
**Pricing UI Design**
Built role-specific pricing pages following industry-standard SaaS design patterns — three-tier plans (Free / Pro / Enterprise for employers, Free / Pro / Premium for candidates), a Most Popular badge on the recommended plan, feature comparison lists with ✓ / ✗ indicators, a monthly/yearly billing toggle with 20% yearly discount, and a locked features section encouraging upgrades. Each pricing card uses consistent theme variables with no hardcoded colors.
 
**Checkout Flow**
Implemented a complete three-step payment flow:
```
Pricing Page → Checkout Form → Payment Success
```
Plan data is passed between pages using React Router's `location.state` — no global state or URL params needed. The checkout page guards against direct access by redirecting to pricing if no plan is in state.
 
**Payment States**
Four states handled in the checkout form:
- `idle` — form ready, Pay button active
- `loading` — 2-second simulated processing, spinner shown, button disabled
- `error` — declined card message shown with red alert box
- `success` — navigates to PaymentSuccess page with `replace: true` to prevent back navigation
 
**Access Control UI**
Free plan CTA button navigates to nothing (no checkout). Enterprise plan is marked as "Contact Sales". Locked features section on both pricing pages shows exactly what users gain by upgrading, with a direct "Upgrade to Pro →" shortcut button.
 
---
 
### 🛠 Practical Implementation
 
**`services/paymentService.js` — New Service File**
 
Three backend-ready functions:
```
processPayment()         — POST /payments/checkout
fetchEmployerPlans()     — GET /payments/plans/employer
fetchCandidatePlans()    — GET /payments/plans/candidate
```
 
`processPayment` simulates real Stripe behavior — card `4242 4242 4242 4242` succeeds, card `4000 0000 0000 0002` is declined with a proper error message. Returns `transactionId`, `receipt`, `amount`, `plan`, and `paidAt` on success.
 
**`pages/employer/EmployerPricing.jsx` — New Page**
- Loads plans from `fetchEmployerPlans` with loading and error states
- Monthly/Yearly billing toggle updates all prices instantly
- `handleSelectPlan` navigates to checkout with plan + billing data in `location.state`
- Free plan button does nothing, Enterprise shows "Contact Sales"
 
**`pages/candidate/CandidatePricing.jsx` — New Page**
- Same architecture as EmployerPricing using `fetchCandidatePlans`
- Candidate-specific plan names and features
 
**`pages/Checkout.jsx` — New Page**
- Three form sections: Personal Info, Card Details, Billing Address
- Card number auto-formats to `4242 4242 4242 4242` pattern
- Expiry auto-formats to `MM/YY` pattern
- CVV limited to 3 digits
- `validate()` runs before submission — shows inline field errors
- `processPayment` called on submit with 2-second loading state
- Order summary sidebar with plan features, subtotal, tax, and total
- `replace: true` on success navigation prevents back to checkout
- Notification created on successful payment via `addNotification`
 
**`pages/PaymentSuccess.jsx` — New Page**
- Displays full receipt: transaction ID, receipt number, plan, amount, billing, date
- Shows all unlocked features from the selected plan
- "Go to Dashboard" button is role-aware — employer → employer dashboard, candidate → candidate dashboard
- Redirect guard if accessed directly without payment state
 
**`BottomNav.jsx` — Updated**
- Added 👑 Premium button as 5th nav item
- Role-aware: employer → `/app/employer-pricing`, candidate → `/app/candidate-pricing`
 
**`Topbar.jsx` — Updated**
- Notification dropdown made fully responsive: `w-screen max-w-sm sm:w-80` with `calc(100vw - 1rem)` max-width
- 👑 Upgrade Plan link added to both employer and candidate profile dropdowns
 
**`App.jsx` — Updated**
- 4 new lazy-loaded routes registered:
  - `/app/employer-pricing`
  - `/app/candidate-pricing`
  - `/app/checkout`
  - `/app/payment-success`
 
---
 
### 📁 Files Created / Modified
 
```
src/
├── services/
│   └── paymentService.js              ← NEW
├── pages/
│   ├── Checkout.jsx                   ← NEW
│   ├── PaymentSuccess.jsx             ← NEW
│   ├── employer/
│   │   └── EmployerPricing.jsx        ← NEW (renamed from PricingPage.jsx)
│   └── candidate/
│       └── CandidatePricing.jsx       ← NEW (renamed from PricingPage.jsx)
├── App.jsx                            ← UPDATED: 4 new routes
└── components/Dashboard/
    ├── BottomNav.jsx                  ← UPDATED: Premium button added
    └── Topbar.jsx                     ← UPDATED: Upgrade Plan links + responsive dropdown
```
 
---
 
### ✅ Deliverables Completed
 
- ✅ Employer pricing page with 3 plans and feature comparison
- ✅ Candidate pricing page with 3 plans and feature comparison
- ✅ Monthly/Yearly billing toggle with 20% discount
- ✅ Most Popular badge on recommended plan
- ✅ Locked features section with upgrade prompt
- ✅ Checkout form with validation and auto-formatting
- ✅ Four payment states: idle, loading, error, success
- ✅ Test card simulation (success + decline)
- ✅ Payment success page with full receipt
- ✅ Unlocked features display on success
- ✅ Role-aware dashboard redirect after payment
- ✅ Mobile access via BottomNav Premium button
- ✅ Desktop access via Topbar Upgrade Plan link
- ✅ Notification created on payment success
- ✅ Responsive notification dropdown fixed
 
---
 
### 🔑 Key Takeaway
 
> The most important detail in a payment flow is state handling — users must never be able to submit twice, must always know when processing is happening, and must never be able to reach a success page without completing payment. Using `replace: true` on success navigation and redirect guards on the success page ensures the flow is always in a valid state, regardless of how the user navigates.
 
---

## ✅ Day 30 – File Upload & Media Handling
 
**Objective:** Enable document and image uploads with progress tracking, file preview, drag and drop support, and localStorage persistence across page navigation.
 
---
 
### 🧠 Concepts Learned
 
**File Input Handling**
Built custom styled file inputs by hiding the native browser input and triggering it programmatically via `useRef`. File validation runs before any upload — checking both file type (MIME type) and file size against configurable limits. Invalid files show inline error messages without triggering any upload.
 
**FormData**
The `uploadService.js` service layer uses the `FormData` API to prepare files for multipart upload — the correct format for sending binary file data to a backend. All upload functions are backend-ready with commented-out real API calls using `Content-Type: multipart/form-data`.
 
**Upload Progress**
Simulated upload progress using `setInterval` with random increments, matching the real Axios `onUploadProgress` pattern. Progress state drives a custom `UploadProgress` component that animates from 0 to 100, turns green on completion, and shows filename and percentage.
 
**File Preview**
Profile images use `URL.createObjectURL()` to generate an instant local preview before the upload completes — the image appears immediately on file selection. A lazy `useState` initializer loads saved profile data from `localStorage` on mount, and `handleSave` persists all profile data back to localStorage — keeping the profile intact across page navigation.
 
---
 
### 🛠 Practical Implementation
 
**`services/uploadService.js` — New Service File**
 
Three backend-ready functions:
```
uploadResume(file, onProgress)        — POST /upload/resume
uploadProfileImage(file, onProgress)  — POST /upload/profile-image
deleteResume()                        — DELETE /upload/resume
```
 
Each upload function accepts an `onProgress` callback that fires with a percentage value from 0 to 100 as the simulated upload proceeds, matching the exact signature of Axios `onUploadProgress`.
 
**`hooks/useFileUpload.js` — New Reusable Hook**
 
A single hook that handles the complete file upload lifecycle:
- File type and size validation before upload
- `URL.createObjectURL` preview generation for images
- Progress state (0–100) via the `onProgress` callback
- Drag and drop event handlers (`handleDrop`, `handleDragOver`, `handleDragLeave`)
- `isDragging` state for visual drop zone feedback
- `uploading`, `uploaded`, and `error` states
- `clearFile()` resets all state including the file input ref
- `openFilePicker()` triggers the hidden file input programmatically
 
**`ui/UploadProgress.jsx` — New UI Component**
 
A reusable animated progress bar that:
- Renders nothing when not uploading or uploaded
- Shows filename, percentage, and animated bar during upload
- Turns green with ✓ Done on completion
- Uses theme variables exclusively — no hardcoded colors
 
**`pages/candidate/Profile.jsx` — Updated**
 
- `resumeUpload` hook wired to resume section — replaces old `handleResumeUpload`
- `imageUpload` hook wired to profile picture — replaces old `handleProfilePictureUpload`
- Live image preview via `imageUpload.preview` shown instantly on file select
- Drag and drop zone on resume section with `isDragging` visual highlight
- `UploadProgress` bar shown below resume drop zone and below profile picture
- Both `ref` assignments removed from profile picture inputs — fixed "Cannot access refs during render" error
- `handleEditToggle` calls `clearFile()` on both hooks when cancelling
- `handleSave` calls `clearFile()` on both hooks after saving
- **localStorage persistence** — lazy `useState` initializer reads saved data on mount
- `handleSave` serializes profile to `localStorage` after every save
- `File` objects excluded from serialization (not JSON-serializable) — only `name` and `size` stored
 
---
 
### 🐛 Bugs Fixed
 
**Bug 1 — Cannot access refs during render**
Both mobile and desktop profile picture inputs were assigned the same `imageUpload.fileRef`. React disallows multiple elements sharing one ref. Fixed by removing `ref` from both profile picture inputs — the `label htmlFor` pattern handles clicks correctly without needing a ref.
 
**Bug 2 — Profile data resets on page navigation**
All profile state was in local `useState` which resets on component unmount. Fixed with two changes: a lazy `useState` initializer that reads from `localStorage` on mount, and a `localStorage.setItem` call in `handleSave` that persists all profile data after every save.
 
---
 
### 📁 Files Created / Modified
 
```
src/
├── services/
│   └── uploadService.js           ← NEW
├── hooks/
│   └── useFileUpload.js           ← NEW
├── ui/
│   └── UploadProgress.jsx         ← NEW
└── pages/candidate/
    └── Profile.jsx                ← UPDATED: upload hooks + localStorage
```
 
---
 
### ✅ Deliverables Completed
 
- ✅ Resume upload with progress bar (0 → 100%)
- ✅ Resume drag and drop with visual highlight on dragover
- ✅ Resume file type validation (PDF, DOC, DOCX only)
- ✅ Resume file size validation (max 5MB)
- ✅ Inline error messages for invalid files
- ✅ Profile image upload with progress bar
- ✅ Live image preview before save
- ✅ Profile image size validation (max 2MB)
- ✅ UploadProgress component — reusable across app
- ✅ useFileUpload hook — reusable for any file type
- ✅ uploadService.js — backend-ready with FormData
- ✅ localStorage persistence — profile survives page navigation
- ✅ Notification created on resume upload
- ✅ Notification created on profile picture update
- ✅ Two bugs identified and fixed
 
---
 
### 🔑 Key Takeaway
 
> File uploads have more edge cases than any other UI interaction — wrong type, too large, network failure, partial upload, preview before save, and persistence after navigation. The `useFileUpload` hook encapsulates all of these concerns in one place, making it reusable across any future upload feature in the app with zero repeated logic.
 
---


## ✅ Day 31 – Multi-Role Dashboard System
 
**Objective:** Implement a complete role-based user experience with centralized permission logic, role-enforced route guards, and a full admin dashboard with user management capabilities.
 
---
 
### 🧠 Concepts Learned
 
**Role-Based Routing**
Built a `RoleRoute` component that accepts an `allowedRoles` array and redirects unauthorized users to their own dashboard instead of showing an error. This is more user-friendly than a 403 page — a candidate visiting `/app/post-job` is silently redirected to their candidate dashboard without any confusion.
 
**Conditional UI Rendering**
The Topbar profile dropdown renders completely different menu items based on the user's role — candidates see Browse Jobs and My Applications, employers see Post Job and ATS, and admins see all dashboards plus platform management tools. Role badges are color-coded: red for admin, yellow for employer, and muted for candidate.
 
**Permission Logic**
Centralized all role checks in `utils/permissions.js` — a single file that exports `ROLES`, `getDashboardPath`, and `getPermissions`. Instead of scattered `user?.role === "employer"` checks throughout the codebase, every component can import `getPermissions(user)` and check `permissions.canPostJob` or `permissions.canViewATS` — making the permission system easy to extend when new roles are added.
 
---
 
### 🛠 Practical Implementation
 
**`utils/permissions.js` — New Utility File**
- `ROLES` object: `{ ADMIN, EMPLOYER, CANDIDATE }`
- `getDashboardPath(role)` — maps role to correct dashboard URL
- `getPermissions(user)` — returns object of boolean permission flags covering jobs, dashboards, admin, profile, and pricing
- Used by both `PrivateRoute` and `RoleRoute` for redirect logic
 
**`route/RoleRoute.jsx` — New Route Guard**
- Accepts `allowedRoles` array (e.g. `["employer", "admin"]`)
- Shows loader during `authLoading`
- Redirects to `/login` if no user
- Redirects to `getDashboardPath(user.role)` if role not in `allowedRoles`
- More flexible than `PrivateRoute` — supports multi-role access
 
**`route/PrivateRoute.jsx` — Updated**
- Now uses `getDashboardPath(user.role)` for redirect instead of hardcoded `/app`
- Ensures wrong-role redirects always go to the correct dashboard
 
**`services/authService.js` — Updated**
- Three test accounts added:
  - `admin@zecpath.com` → admin role
  - Any email containing "employer" → employer role
  - Any other email → candidate role
- Backend-ready — uncomment two lines to use real API
 
**`services/adminService.js` — New Service File**
Four backend-ready functions:
```
fetchAdminStats()          — GET /admin/stats (8 platform metrics)
fetchRecentUsers()         — GET /admin/recent-users
fetchPlatformActivity()    — GET /admin/platform-activity
updateUserStatus()         — PUT /admin/users/:id/status
```
 
**`pages/admin/AdminDashboard.jsx` — New Page**
- ADMIN badge in header with danger color
- 8 stat cards: Total Users, Active Jobs, Applications, Revenue, Employers, Candidates, Pro Subscribers, Support Tickets
- Recent users table — mobile card layout + desktop table
- Suspend / Activate user with optimistic UI and revert on failure
- Platform activity feed with icons
- Three quick action cards: Manage Users, Review Payments, Job Listings
- Independent loading and error states per section
 
**`App.jsx` — Updated**
- Admin lazy import and route added
- `RoleRoute` wrapping added to employer routes (`["employer", "admin"]`)
- `RoleRoute` wrapping added to candidate routes (`["candidate", "admin"]`)
- Admin route protected with `RoleRoute allowedRoles={["admin"]}`
 
**`Topbar.jsx` — Updated**
- Admin profile menu: 🛡️ Admin Dashboard, 💼 All Jobs, 📊 Employer View, 🎓 Candidate View
- Role badge color-coded: `dangerText` for admin, `warningText` for employer
- 🛡️ emoji appended to admin role label
 
---
 
### 📁 Files Created / Modified
 
```
src/
├── utils/
│   └── permissions.js              ← NEW
├── route/
│   ├── PrivateRoute.jsx            ← UPDATED: getDashboardPath
│   └── RoleRoute.jsx               ← NEW: multi-role guard
├── services/
│   ├── authService.js              ← UPDATED: admin test login
│   └── adminService.js             ← NEW: 4 admin API functions
├── pages/admin/
│   └── AdminDashboard.jsx          ← NEW: full admin dashboard
├── App.jsx                         ← UPDATED: RoleRoute + admin route
└── components/Dashboard/
    └── Topbar.jsx                  ← UPDATED: admin menu + role badges
```
 
---
 
### ✅ Deliverables Completed
 
- ✅ Centralized permission system with `getPermissions` and `getDashboardPath`
- ✅ `RoleRoute` — flexible multi-role route guard
- ✅ Admin dashboard with 8 stat cards
- ✅ Recent users table with Suspend / Activate actions
- ✅ Optimistic UI on user status updates
- ✅ Platform activity feed
- ✅ Admin quick action cards
- ✅ Role-specific Topbar navigation for all three roles
- ✅ Color-coded role badges in profile dropdown
- ✅ Employer routes blocked from candidates
- ✅ Candidate routes blocked from employers
- ✅ Admin can access all dashboards
- ✅ Three test accounts for all roles
 
---
 
### 🔑 Key Takeaway
 
> Role-based access control works best when permission logic lives in one place. Scattering `user?.role === "employer"` checks throughout the codebase creates a maintenance nightmare — adding a new role means hunting down every check. A centralized `getPermissions(user)` function means adding a new role requires changing exactly one file.
 
---
