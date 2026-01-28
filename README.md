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

---

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
