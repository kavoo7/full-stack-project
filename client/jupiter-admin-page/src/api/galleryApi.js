import api from "./api";

export const getGallery = () => api.get("/gallery");

export const addGalleryImage = (imageData) => api.post("/gallery", imageData);

export const updateGalleryImage = (id, imageData) => api.patch(`/gallery/${id}`, imageData);

export const deleteGalleryImage = (id) => api.delete(`/gallery/${id}`);
