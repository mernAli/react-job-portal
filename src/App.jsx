import JobList from "./components/JobList";
import "./components/layout.css";

function App() {
  return (
    <div className="app-layout">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="profile-card">
          <div className="avatar"></div>
          <h3>Ali</h3>
          <p>MERN Intern</p>
        </div>

        <div className="menu">
          <p>Preferences</p>
          <p>Applied Jobs</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h2>Top job picks for you</h2>
        <p className="subtitle">
          Based on your profile, preferences, and recent activity
        </p>

        <JobList />
      </main>
    </div>
  );
}

export default App;
