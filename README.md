# React Job Listing App

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

```env
VITE_JOB_API_URL=https://www.arbeitnow.com/api/job-board-api

Note: The .env file is ignored in Git for security reasons.


🖥 Tech Stack
- React (Vite)
- JavaScript (ES6)
- CSS
- Public REST API
