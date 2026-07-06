import api from "./axios";

export const getDashboardStats = () =>
  api.get("/admin/dashboard");

export const getNeedsAttention = () =>
  api.get("/admin/needs-attention");
export const getMonthlyRegistrations = () =>
  api.get("/admin/monthly-registrations");