import { useEffect, useState } from "react";
import {
  getGallery,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../api/galleryApi";
import "../css/Teachers.css";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    setLoading(true);
    try {
      const response = await getGallery();
      setGallery(response.data);
    } catch (error) {
      console.error("Failed to load gallery:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      image_url: imageUrl,
      caption,
    };

    try {
      if (editingId) {
        await updateGalleryImage(editingId, payload);
        alert("Image updated successfully!");
      } else {
        await addGalleryImage(payload);
        alert("Image uploaded successfully!");
      }

      resetForm();
      loadGallery();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Operation failed.";
      alert(msg);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteGalleryImage(id);
      loadGallery();
      alert("Image deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete image.");
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setImageUrl(item.image_url || "");
    setCaption(item.caption || "");
  }

  function resetForm() {
    setEditingId(null);
    setImageUrl("");
    setCaption("");
  }

  return (
    <div className="teachers-page">
      <h1>🖼 School Gallery Management</h1>

      <form className="teacher-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Gallery Item" : "Add New Image"}</h2>

        <input
          className="form-input"
          type="url"
          placeholder="Image URL (e.g. https://picsum.photos/400/300)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <input
          className="form-input"
          type="text"
          placeholder="Caption (e.g. Science Fair 2026)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />

        <div className="button-group">
          <button className="submit-btn" type="submit">
            {editingId ? "Update Image" : "Upload Image"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading gallery...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {gallery.length === 0 ? (
            <p>No gallery images found.</p>
          ) : (
            gallery.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justify: "space-between",
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.caption}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    backgroundColor: "#f0f0f0",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
                <div style={{ padding: "15px", flex: 1 }}>
                  <p style={{ fontWeight: 600, margin: "0 0 12px 0" }}>{item.caption}</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="edit-btn" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Gallery;