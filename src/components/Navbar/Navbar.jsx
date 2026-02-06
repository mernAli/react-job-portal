import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar desktop-nav">
        <div className="logo">Logo</div>

        <ul className="nav-links">
          <NavLink to="/app" end className="nav-item">
            Home
          </NavLink>

          <NavLink to="/app/network" className="nav-item">
            My Network
          </NavLink>

          <NavLink to="/app/jobs" className="nav-item">
            Jobs
          </NavLink>

          <NavLink to="/app/notifications" className="nav-item">
            Notifications
          </NavLink>
        </ul>

        <input
          type="text"
          placeholder="🔍︎  Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="nav-search"
        />

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Mobile Navbar */}
      <nav className="navbar mobile-nav">
        <NavLink to="/app" end className="icon">
          🏠
        </NavLink>
        <NavLink to="/app/network" className="icon">
          👥
        </NavLink>
        <NavLink to="/app/jobs" className="icon add">
          ＋
        </NavLink>
        <NavLink to="/app/notifications" className="icon">
          🔔
        </NavLink>

        <button className="icon logout-icon" onClick={handleLogout}>
          🚪
        </button>
      </nav>
    </>
  );
};

export default Navbar;
