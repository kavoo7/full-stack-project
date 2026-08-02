import api from "./api";

export const getEnrollments = () => api.get("/enrollments");

export const addEnrollment = (enrollmentData) => api.post("/enrollments", enrollmentData);

export const deleteEnrollment = (id) => api.delete(`/enrollments/${id}`);
