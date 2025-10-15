import createApi from "./axiosBaseApi.js";

const accountApi = createApi(import.meta.env.VITE_APP_API_ACC);
export default accountApi;
