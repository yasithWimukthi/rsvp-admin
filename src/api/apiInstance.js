import axios from "axios";
import { addAuthIntecepter } from "./authIntecepter";

const apiInstance = axios.create({
  baseURL: "INVALID_URL",
});

addAuthIntecepter(apiInstance);

apiInstance.interceptors.request.use(
  async function (config) {
    // config.baseURL = "http://localhost:4000/";
    config.baseURL = "https://rsvp-backend.herokuapp.com";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { apiInstance };
