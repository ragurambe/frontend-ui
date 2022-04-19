import axios from "axios";
import querystring from "querystring";
import { getEnv } from "./config";

export const client = axios.create({
  baseURL: getEnv("API_BASE"),
  timeout: 3 * 60 * 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  paramsSerializer: (p) => {
    const params = { ...p };
    return querystring.stringify(params, "&", "=", { arrayFormat: "repeat" });
  },
});

client.interceptors.request.use(
  (config) => {
    document
      .getElementsByClassName("loading-background")[0]
      .classList.remove("hide");
    document
      .getElementsByClassName("loading-background")[0]
      .classList.add("show");
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (res) => {
    document
      .getElementsByClassName("loading-background")[0]
      .classList.remove("show");
    document
      .getElementsByClassName("loading-background")[0]
      .classList.add("hide");
    return res;
  },
  (err) => {
    document
      .getElementsByClassName("loading-background")[0]
      .classList.remove("show");
    document
      .getElementsByClassName("loading-background")[0]
      .classList.add("hide");
    if (!err || !err.response) return Promise.reject(err);
    const {
      config,
      response: { status },
    } = err;
    const originalRequest = config;
    return Promise.reject(err);
  }
);

const request = (options, byPassError) => {
  const onSuccess = (response) => response.data;

  const onError = (error) => {
    console.error("Error Message:", error.message);
    return Promise.reject(error.response ? error.response.data : error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
