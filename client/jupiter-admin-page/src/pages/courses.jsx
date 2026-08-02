import { useEffect, useState } from "react";
import { getCourses, addCourse, updateCourse, deleteCourse } from "../api/courseApi";
import { getTeachers } from "../api/teacherApi";
import "../css/Teachers.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [coursesRes, teachersRes] = await Promise.all([
        getCourses(),
        getTeachers(),
      ]);
      setCourses(coursesRes.data);
      setTeachers(teachersRes.data);
    } catch (error) {
      console.error("Failed to load courses or teachers:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      teacher_id: teacherId ? parseInt(teacherId, 10) : null,
    };

    try {
      if (editingId) {
        await updateCourse(editingId, payload);
        alert("Course updated successfully!");
      } else {
        await addCourse(payload);
        alert("Course added successfully!");
      }

      resetForm();
      loadData();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Operation failed.";
      alert(msg);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteCourse(id);
      loadData();
      alert("Course deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete course.");
    }
  }

  function handleEdit(course) {
    setEditingId(course.id);
    setName(course.name || "");
    setTeacherId(course.teacher_id ? String(course.teacher_id) : "");
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setTeacherId("");
  }

  return (
    <div className="teachers-page">
      <h1>📚 Course Management</h1>

      <form className="teacher-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Course" : "Add New Course"}</h2>

        <input
          className="form-input"
          type="text"
          placeholder="Course Name (e.g. Mathematics)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="form-input"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="">-- Assign Teacher (Optional) --</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name} ({teacher.email})
            </option>
          ))}
        </select>

        <div className="button-group">
          <button className="submit-btn" type="submit">
            {editingId ? "Update Course" : "Add Course"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <table className="teacher-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Assigned Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td><strong>{course.name}</strong></td>
                  <td>{course.teacher_name || "Unassigned"}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(course)}>
                      Edit
                    </button>

                    <button className="delete-btn" onClick={() => handleDelete(course.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Courses;