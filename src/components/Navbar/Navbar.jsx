import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar desktop-nav">
        <div className="logo">Logo</div>

        <ul className="nav-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>

          <NavLink to="/network" className="nav-item">
            My Network
          </NavLink>

          <NavLink to="/jobs" className="nav-item">
            Jobs
          </NavLink>

          <NavLink to="/notifications" className="nav-item">
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
      </nav>

      {/* Mobile Navbar */}
      <nav className="navbar mobile-nav">
        <NavLink to="/" className="icon">
          🏠
        </NavLink>
        <NavLink to="/network" className="icon">
          👥
        </NavLink>
        <NavLink to="/jobs" className="icon add">
          ＋
        </NavLink>
        <NavLink to="/notifications" className="icon">
          🔔
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
