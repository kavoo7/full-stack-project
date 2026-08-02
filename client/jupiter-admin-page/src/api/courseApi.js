import api from "./api";

export const getCourses = () => api.get("/courses");

export const addCourse = (course) => api.post("/courses", course);

export const updateCourse = (id, course) => api.patch(`/courses/${id}`, course);

export const deleteCourse = (id) => api.delete(`/courses/${id}`);
