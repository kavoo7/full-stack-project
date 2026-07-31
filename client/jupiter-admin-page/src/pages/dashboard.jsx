import "../css/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-cards">

    <div className="card">
        <h3>👨‍🏫 Teachers</h3>
        <h1>15</h1>
    </div>

    <div className="card">
        <h3>👨‍🎓 Students</h3>
        <h1>350</h1>
    </div>

    <div className="card">
        <h3>📚 Courses</h3>
        <h1>12</h1>
    </div>

    <div className="card">
        <h3>📅 Events</h3>
        <h1>5</h1>
    </div>

</div>
    
  );
}

export default Dashboard;