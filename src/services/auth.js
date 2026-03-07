import API from "./api";

// Health check
export const healthCheck = () =>
  API.get(import.meta.env.VITE_REMINDER_SERVICE_API.replace('api', ''));

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const updateUser = (data) =>
  API.put("/auth/update-user", data);