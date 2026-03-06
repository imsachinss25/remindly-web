import API from "./api";

export const createReminder = (data) =>
  API.post("/reminders", data);

export const getReminders = () =>
  API.get("/reminders");

export const deleteReminder = (id) =>
  API.put(`/reminders/${id}`);