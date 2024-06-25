import apiClient from "../apiClient";

export const getGameResults = () => {
  return apiClient.get("/app/game/results");
};

export const getGameDetail = (id: number) => {
  return apiClient.get(`/app/game/result/${id}`);
};
