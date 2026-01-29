import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobList from "./components/JobList";
import "./components/layout.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Network from "./pages/Network";
import Jobs from "./pages/Jobs";
import Notifications from "./pages/Notification";

function App() {
  return (

    <>
    <BrowserRouter>
      <Navbar />

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

        {/* MAIN CONTENT (ROUTED) */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/network" element={<Network />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>


    
    </>
  );
}

export default App;
