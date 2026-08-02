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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      try {
        const [teachersRes, studentsRes, coursesRes, eventsRes] = await Promise.all([
          getTeachers(),
          getStudents(),
          getCourses(),
          getEvents(),
        ]);

        setTeachers(teachersRes.data);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <p className="dashboard-subtitle">Welcome back, Admin! Here is the current school summary. 👋</p>

      {loading ? (
        <p>Loading dashboard metrics...</p>
      ) : (
        <>
          <div className="dashboard-cards">
            <div className="card">
              <h3>👨‍🏫 Total Teachers</h3>
              <p className="stat-number">{teachers.length}</p>
            </div>

            <div className="card">
              <h3>👨‍🎓 Total Students</h3>
              <p className="stat-number">{students.length}</p>
            </div>

            <div className="card">
              <h3>📚 Total Courses</h3>
              <p className="stat-number">{courses.length}</p>
            </div>

            <div className="card">
              <h3>📅 Scheduled Events</h3>
              <p className="stat-number">{events.length}</p>
            </div>
          </div>

          <div className="recent-activity">
            <h2>System Status & Overview</h2>

            <ul>
              <li>✅ Connected to Jupiter School REST API backend</li>
              <li>✅ {teachers.length} teacher records active</li>
              <li>✅ {students.length} student records enrolled</li>
              <li>✅ {courses.length} courses registered</li>
              <li>✅ {events.length} upcoming school events listed</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;