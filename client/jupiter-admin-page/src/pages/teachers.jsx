import { useEffect, useState } from "react";
import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../api/teacherApi";

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    try {
      const response = await getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTeacher(editingId, {
          name,
          email,
          phone,
        });

        alert("Teacher updated successfully!");
      } else {
        await addTeacher({
          name,
          email,
          phone,
        });

        alert("Teacher added successfully!");
      }

      setName("");
      setEmail("");
      setPhone("");
      setEditingId(null);

      loadTeachers();
    } catch (error) {
      console.error(error);
      alert("Operation failed.");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmed) return;

    try {
      await deleteTeacher(id);

      loadTeachers();

      alert("Teacher deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete teacher.");
    }
  }

  return (
    <div>
      <h1>Teachers</h1>

      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Teacher" : "Add Teacher"}</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          {editingId ? "Update Teacher" : "Add Teacher"}
        </button>

        <br /><br />
      </form>

      <table border="1" cellPadding="10">
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
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingId(teacher.id);
                    setName(teacher.name);
                    setEmail(teacher.email);
                    setPhone(teacher.phone);
                  }}
                >
                  Edit
                </button>

                {" "}

                <button onClick={() => handleDelete(teacher.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;