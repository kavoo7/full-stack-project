import { NavLink, useNavigate } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>🎓 Jupiter</h2>
        <p>School Admin</p>
      </div>

      <nav>
        <NavLink to="/dashboard" className="nav-link">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/teachers" className="nav-link">
          👨‍🏫 Teachers
        </NavLink>

        <NavLink to="/students" className="nav-link">
          👨‍🎓 Students
        </NavLink>

        <NavLink to="/courses" className="nav-link">
          📚 Courses
        </NavLink>

        <NavLink to="/events" className="nav-link">
          📅 Events
        </NavLink>

        <NavLink to="/gallery" className="nav-link">
          🖼 Gallery
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;