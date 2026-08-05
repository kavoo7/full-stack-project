import "../css/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-title">
        <h2>Jupiter School Admin</h2>
        <span>Management Console</span>
      </div>

      <div className="navbar-actions">
        <label className="search-box" aria-label="Search">
          <span>⌕</span>
          <input type="search" placeholder="Search records..." />
        </label>

        <button className="notification-btn" type="button" aria-label="Notifications">
          🔔
        </button>

        <div className="admin">
          <span className="avatar-badge">A</span>
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
