import { useEffect, useState } from "react";
import { getEvents, addEvent, updateEvent, deleteEvent } from "../api/eventApi";
import "../css/Teachers.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title,
      description,
      date,
    };

    try {
      if (editingId) {
        await updateEvent(editingId, payload);
        alert("Event updated successfully!");
      } else {
        await addEvent(payload);
        alert("Event created successfully!");
      }

      resetForm();
      loadEvents();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Operation failed.";
      alert(msg);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id);
      loadEvents();
      alert("Event deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete event.");
    }
  }

  function handleEdit(event) {
    setEditingId(event.id);
    setTitle(event.title || "");
    setDescription(event.description || "");
    setDate(event.date || "");
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setDate("");
  }

  return (
    <div className="teachers-page">
      <h1>📅 School Events Management</h1>

      <form className="teacher-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Event" : "Create New Event"}</h2>

        <input
          className="form-input"
          type="text"
          placeholder="Event Title (e.g. Sports Day)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-input"
          placeholder="Event Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{ resize: "vertical", fontFamily: "inherit" }}
          required
        />

        <input
          className="form-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div className="button-group">
          <button className="submit-btn" type="submit">
            {editingId ? "Update Event" : "Create Event"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <table className="teacher-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td><strong>{event.date || "N/A"}</strong></td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(event)}>
                      Edit
                    </button>

                    <button className="delete-btn" onClick={() => handleDelete(event.id)}>
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

export default Events;