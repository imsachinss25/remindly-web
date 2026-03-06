import API from "./api";

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const updateUser = (data) =>
  API.put("/auth/update-user", data);