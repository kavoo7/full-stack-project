import api from "./api";

export const getTeachers = () => api.get("/teachers");

export const getStudents = () => api.get("/students");

export const getCourses = () => api.get("/courses");

export const getEvents = () => api.get("/events");