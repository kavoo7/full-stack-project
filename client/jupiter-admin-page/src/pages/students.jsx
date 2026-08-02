import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";

import "../css/student.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [className, setClassName] = useState("");
  const [parentContact, setParentContact] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      admission_no: admissionNo,
      class_name: className,
      parent_contact: parentContact,
    };

    try {
      if (editingId) {
        await updateStudent(editingId, payload);
        alert("Student updated successfully!");
      } else {
        await addStudent(payload);
        alert("Student added successfully!");
      }

      resetForm();
      loadStudents();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Operation failed.";
      alert(msg);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    try {
      await deleteStudent(id);
      loadStudents();
      alert("Student deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student.");
    }
  }

  function handleEdit(student) {
    setEditingId(student.id);
    setName(student.name || "");
    setAdmissionNo(student.admission_no || "");
    setClassName(student.class_name || "");
    setParentContact(student.parent_contact || "");
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setAdmissionNo("");
    setClassName("");
    setParentContact("");
  }

  return (
    <div className="students-page">
      <h1>👨‍🎓 Student Management</h1>

      <form className="student-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Student" : "Add New Student"}</h2>

        <div className="form-group-grid">
          <input
            className="form-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="form-input"
            type="text"
            placeholder="Admission No (e.g. JP001)"
            value={admissionNo}
            onChange={(e) => setAdmissionNo(e.target.value)}
            required
          />

          <input
            className="form-input"
            type="text"
            placeholder="Class (e.g. Grade 8)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />

          <input
            className="form-input"
            type="text"
            placeholder="Parent Contact (e.g. 0700111222)"
            value={parentContact}
            onChange={(e) => setParentContact(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button className="submit-btn" type="submit">
            {editingId ? "Update Student" : "Add Student"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Admission No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Parent Contact</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td><strong>{student.admission_no}</strong></td>
                  <td>{student.name}</td>
                  <td>{student.class_name}</td>
                  <td>{student.parent_contact}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student.id)}
                    >
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

export default Students;