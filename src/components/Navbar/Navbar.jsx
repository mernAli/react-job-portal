import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
      </nav>

      {/* Mobile Navbar */}
      <nav className="navbar mobile-nav">
        <NavLink to="/" className="icon">🏠</NavLink>
        <NavLink to="/network" className="icon">👥</NavLink>
        <NavLink to="/jobs" className="icon add">＋</NavLink>
        <NavLink to="/notifications" className="icon">🔔</NavLink>
      </nav>
    </>
  );
};

export default Navbar;
