import axios from "axios";
import config from "../config";

const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
});

apiClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (
//       error?.response?.statusCode === 401 &&
//       error?.resposne?.data?.message === "TOKEN_EXPIRED"
//     ) {
//       // const refreshToken = localStorage.getItem("REFRESH_TOKEN");
//       const accessToken = localStorage.getItem("ACCESS_TOKEN");

//       // const response = await axios.post(`${config.API_URL}/auth/refresh`, {
//       //   refreshToken,
//       //   accessToken,
//       // });

//       if (
//         accessToken !== "undefined" &&
//         accessToken !== null &&
//         accessToken !== undefined
//       ) {
//         // const { accessToken } = response.data;

//         localStorage.setItem("ACCESS_TOKEN", accessToken);
//         // localStorage.setItem("REFRESH_TOKEN", refreshToken);

//         return await apiClient(error.config);
//       } else {
//         localStorage.clear();
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (
//       error?.response?.statusCode === 401 &&
//       error?.resposne?.data?.message === "TOKEN_EXPIRED"
//     ) {
//       const refreshToken = localStorage.getItem("REFRESH_TOKEN");
//       const accessToken = localStorage.getItem("ACCESS_TOKEN");

//       const response = await axios.post(`${config.API_URL}/auth/refresh`, {
//         refreshToken,
//         accessToken,
//       });

//       if (response.data) {
//         const { accessToken, refreshToken } = response.data;

//         localStorage.setItem("ACCESS_TOKEN", accessToken);
//         localStorage.setItem("REFRESH_TOKEN", refreshToken);

//         return await apiClient(error.config);
//       } else {
//         localStorage.clear();
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
