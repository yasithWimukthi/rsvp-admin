import axios from "axios";
import { addAuthIntecepter } from "./authIntecepter";

const apiInstance = axios.create({
  baseURL: "INVALID_URL",
});

addAuthIntecepter(apiInstance);

apiInstance.interceptors.request.use(
  async function (config) {
    // config.baseURL = "http://localhost:4000/api/v1";
    config.baseURL = "https://packaging-lite-api.herokuapp.com/api/v1";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { apiInstance };
