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
// export const modifyUser = (body: {}) => {
//   return apiClient.put(`/api/member/`, body);
// };

export const modifyUser = async (userData: any, token: string) => {
  return apiClient.put("/api/user", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const modifyPassword = (change_password: string, token: string) => {
  return apiClient.put(`/api/member/${change_password}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//MEMO : body => {id,password }
// export const deleteUser = (body: {}) => {
//   return apiClient.delete(`/api/member`);
// };
export const deleteUser = (body: { id: string; password: string }) => {
  return apiClient.delete("/api/member", {
    data: body,
  });
};
