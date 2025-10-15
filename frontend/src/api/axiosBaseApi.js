import axios from "axios";
const createApi = (baseURL) => {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });
  
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        // Clear any tokens/cookies
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
      return Promise.reject(err);
    }
  );

  return api;
};

export default createApi;
