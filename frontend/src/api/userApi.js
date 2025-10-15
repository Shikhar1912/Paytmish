import createApi from "./axiosBaseApi";

const userApi = createApi(import.meta.env.VITE_APP_API_USER);
export default userApi;