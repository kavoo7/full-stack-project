import { useEffect, useState } from "react";
import {
  getTeachers,
  getStudents,
  getCourses,
  getEvents,
} from "../api/dashboardApi";

import "../css/dashboard.css";

function Dashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const teachersRes = await getTeachers();
        const studentsRes = await getStudents();
        const coursesRes = await getCourses();
        const eventsRes = await getEvents();

        setTeachers(teachersRes.data);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome back, Admin! 👋</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>👨‍🏫 Teachers</h3>
          <h1>{teachers.length}</h1>
        </div>

        <div className="card">
          <h3>👨‍🎓 Students</h3>
          <h1>{students.length}</h1>
        </div>

        <div className="card">
          <h3>📚 Courses</h3>
          <h1>{courses.length}</h1>
        </div>

        <div className="card">
          <h3>📅 Events</h3>
          <h1>{events.length}</h1>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>

        <ul>
          <li>✔ Dashboard connected successfully</li>
          <li>✔ Teacher records loaded</li>
          <li>✔ Student records loaded</li>
          <li>✔ Course records loaded</li>
          <li>✔ Event records loaded</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;