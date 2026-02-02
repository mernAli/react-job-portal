import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Network from "../pages/Network";
import Notifications from "../pages/Notification";

const AppLayout = () => {
  return (
    <>
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

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/network' element={<Network />} />
            <Route path='/notifications' element={<Notifications />} />

        </Routes>
      </div>
    </>
  );
};

export default AppLayout;
