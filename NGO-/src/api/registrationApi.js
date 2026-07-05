import api from "./axios";

export const registerForEvent = (data) =>
  api.post("/registrations", data);

export const getRegistrations = () =>
  api.get("/registrations");

export const updateRegistrationStatus = (id, status) => {
  return api.put(`/registrations/${id}/status`, {
    status,
  });
};

export const getMyRegistrations = () =>
  api.get("/registrations/my");

export const getMyCertificates = () =>
    api.get("/registrations/certificates");

export const getRecentRegistrations = () =>
  api.get("/registrations/recent");


export const updateAttendance = (id, attendanceStatus) =>
    api.patch(
        `/registrations/attendance/${id}`,
        { attendanceStatus }
    );