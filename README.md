# Day 7 – Job Listing App (useEffect & Lifecycle)

This project is created as part of my internship **Day 7 task** to understand and implement **React useEffect, component lifecycle, and API integration**.

The application fetches real job data from a **public jobs API** and displays it in a clean, responsive UI inspired by modern job platforms.

---

## 🚀 Features

- Fetches job listings from a public API
- Uses `useEffect` for side effects and lifecycle handling
- Shows a loading state while fetching data
- Displays error message if API fails
- Auto refreshes job data every 60 seconds
- Responsive UI (Desktop & Mobile)
- Reusable components (`JobCard`, `JobList`, `Loader`)

---

## 🧠 Concepts Covered

- React `useEffect()` hook
- Component lifecycle (mount, cleanup)
- API fetching using `fetch`
- State management with `useState`
- Conditional rendering (Loader / Error / Data)
- Component reusability
- Responsive layout using CSS

---

## 🔗 API Used

**Arbeitnow Job Board API**
https://www.arbeitnow.com/api/job-board-ap


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
├─ App.jsx
├─ main.jsx
├─ index.css
└─ App.css


---

## ⚙️ How It Works

1. `JobList` component fetches job data using `useEffect`
2. While data is loading, a loader is shown
3. If an error occurs, an error message is displayed
4. On successful fetch, jobs are rendered using `JobCard`
5. Data automatically refreshes every 60 seconds
6. Cleanup function clears the interval on unmount

---

## 🖥️ Tech Stack

- React (Vite)
- JavaScript (ES6)
- CSS
- Public REST API

---

## 📌 Internship Task Reference

**Day 7 – useEffect & Lifecycle**

- Handle side effects and API data  
- Implement loading and error states  
- Build a data-driven UI  
- Demonstrate clean and stable React code  

---

## 👤 Author

**Ali**  
MERN Stack Intern  

---

## ✅ Status

✔ Task Completed  
✔ API Integrated  
✔ Responsive UI  
✔ Ready for Evaluation



