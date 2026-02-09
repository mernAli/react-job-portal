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
