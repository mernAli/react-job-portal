
import Navbar from "../components/Navbar/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import "../components/layout.css";


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

        
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
