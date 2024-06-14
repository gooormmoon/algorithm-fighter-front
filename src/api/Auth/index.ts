import apiClient from "../apiClient";

// MEMO: body => {id, password}
export const login = (body: {}) => {
  return apiClient.post("/api/member/login", body);
};
// MEMO: body => {id, password, name,}
export const register = (body: {}) => {
  return apiClient.post("/api/member/register", body);
};
