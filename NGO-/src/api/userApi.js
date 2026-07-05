import api from "./axios";

export const getVolunteerDashboard = () =>
  api.get("/users/dashboard");