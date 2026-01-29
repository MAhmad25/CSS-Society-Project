import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ===== USER ENDPOINTS =====
export const userAPI = {
  register: (data) => api.post("/users/register", data),
  login: (data) => api.post("/users/login", data),
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  changePassword: (data) => api.post("/users/change-password", data),
  deleteAccount: () => api.delete("/users/account"),
  getAllUsers: () => api.get("/users/all"),
  getUserById: (id) => api.get(`/users/${id}`),
  deactivateUser: (id) => api.put(`/users/${id}/deactivate`),
  activateUser: (id) => api.put(`/users/${id}/activate`),
};

// ===== EVENT ENDPOINTS =====
export const eventAPI = {
  getAllEvents: (category, status) => {
    let url = "/events";
    const params = [];
    if (category) params.push(`category=${category}`);
    if (status) params.push(`status=${status}`);
    if (params.length) url += `?${params.join("&")}`;
    return api.get(url);
  },
  getEventById: (id) => api.get(`/events/${id}`),
  createEvent: (data) => api.post("/events", data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  registerForEvent: (id) => api.post(`/events/${id}/register`),
  unregisterFromEvent: (id) => api.delete(`/events/${id}/unregister`),
  getUserEvents: () => api.get("/events/user/my-events"),
};

// ===== ANNOUNCEMENT ENDPOINTS =====
export const announcementAPI = {
  getAllAnnouncements: () => api.get("/announcements"),
  getAllAnnouncementsAdmin: () => api.get("/announcements/admin/all"),
  getAnnouncementById: (id) => api.get(`/announcements/${id}`),
  createAnnouncement: (data) => api.post("/announcements", data),
  updateAnnouncement: (id, data) => api.put(`/announcements/${id}`, data),
  deleteAnnouncement: (id) => api.delete(`/announcements/${id}`),
  togglePinAnnouncement: (id) => api.patch(`/announcements/${id}/toggle-pin`),
  togglePublishAnnouncement: (id) =>
    api.patch(`/announcements/${id}/toggle-publish`),
};

// ===== TEAM MEMBER ENDPOINTS =====
export const teamAPI = {
  getAllTeamMembers: () => api.get("/team-members"),
  getActiveTeamMembers: () => api.get("/team-members/active"),
  getTeamMemberById: (id) => api.get(`/team-members/${id}`),
  createTeamMember: (data) => api.post("/team-members", data),
  updateTeamMember: (id, data) => api.put(`/team-members/${id}`, data),
  deleteTeamMember: (id) => api.delete(`/team-members/${id}`),
  deactivateTeamMember: (id) => api.put(`/team-members/${id}/deactivate`),
  activateTeamMember: (id) => api.put(`/team-members/${id}/activate`),
};

// ===== REGISTRATION ENDPOINTS =====
export const registrationAPI = {
  createRegistration: (data) => api.post("/registrations", data),
  getAllRegistrations: () => api.get("/registrations"),
};

export default api;
