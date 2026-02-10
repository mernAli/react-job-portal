import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import Modal from "../../ui/Modal";
import { useAuth } from "../../context/useAuth";


const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { logout } = useAuth();


  const confirmLogout = () => {
    logout();
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

          <NavLink to="/app/ui-demo" className="nav-item">
            UI Demo
          </NavLink>
        </ul>

        <input
          type="text"
          placeholder="🔍︎  Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="nav-search"
        />

        <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
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

        <button
          className="icon logout-icon"
          onClick={() => setShowLogoutModal(true)}
        >
          🚪
        </button>
      </nav>
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        footer={
          <>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              onClick={confirmLogout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        }
      >
        <p className="text-sm text-white">
          Are you sure you want to logout from your account?
        </p>
      </Modal>
    </>
  );
};

export default Navbar;
