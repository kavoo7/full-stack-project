import api from "./api";

export const getTeachers = () => api.get("/teachers");

export const addTeacher = (teacher) =>
  api.post("/teachers", teacher);

export const updateTeacher = (id, teacher) =>
  api.patch(`/teachers/${id}`, teacher);

export const deleteTeacher = (id) =>
  api.delete(`/teachers/${id}`);