import api from "./axios";

export const getEvents = () => api.get("/events");

export const createEvent = (data) =>
  api.post("/events", data);

export const updateEvent = (id, data) =>
  api.put(`/events/${id}`, data);

export const deleteEvent = (id) =>
  api.delete(`/events/${id}`);

export const completeEvent = (id) =>
  api.patch(`/events/${id}/complete`);