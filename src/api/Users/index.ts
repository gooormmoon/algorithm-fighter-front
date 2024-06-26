import apiClient from "../apiClient";

//MEMO : 내 정보 조회
export const getMe = () => {
  return apiClient.get("/api/member");
};

//MEMO : 유저 정보 조회
export const getUser = (id: string) => {
  return apiClient.get(`/api/members/${id}`);
};

//MEMO : body => {name, nickname, profileImage,description}
export const modifyUser = (body: {}) => {
  return apiClient.put(`/api/member`, body);
};

export const modifyPassword = (password: string) => {
  return apiClient.put("/api/member/change-password", { password });
};
//MEMO : body => {id,password }
export const deleteUser = (body: { id: string; password: string }) => {
  return apiClient.delete(`/api/member`, { data: body });
};
