import { useEffect, useState } from "react";
import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../api/teacherApi";

import "../css/Teachers.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    setLoading(true);
    try {
      const response = await getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error("Failed to load teachers:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { name, email, phone };

    try {
      if (editingId) {
        await updateTeacher(editingId, payload);
        alert("Teacher updated successfully!");
      } else {
        await addTeacher(payload);
        alert("Teacher added successfully!");
      }

      resetForm();
      loadTeachers();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Operation failed.";
      alert(msg);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      await deleteTeacher(id);
      loadTeachers();
      alert("Teacher deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete teacher.");
    }
  }

  function handleEdit(teacher) {
    setEditingId(teacher.id);
    setName(teacher.name || "");
    setEmail(teacher.email || "");
    setPhone(teacher.phone || "");
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <div className="teachers-page">
      <h1>👨‍🏫 Teacher Management</h1>

      <form className="teacher-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Teacher" : "Add New Teacher"}</h2>

        <div className="form-group-grid">
          <input
            className="form-input"
            type="text"
            placeholder="Teacher Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="form-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-input"
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button className="submit-btn" type="submit">
            {editingId ? "Update Teacher" : "Add Teacher"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading teachers...</p>
      ) : (
        <table className="teacher-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No teachers found.
                </td>
              </tr>
            ) : (
              teachers.map((teacher, index) => (
                <tr key={teacher.id}>
                  <td>{index + 1}</td>
                  <td><strong>{teacher.name}</strong></td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>

                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(teacher)}>
                      Edit
                    </button>

                    <button className="delete-btn" onClick={() => handleDelete(teacher.id)}>
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

export default Teachers;