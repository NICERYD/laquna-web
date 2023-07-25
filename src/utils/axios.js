import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  // const emailId = localStorage.getItem("emailId");
  config.headers.Authorization = "Bearer " + token;
  // config.headers.Authorization = emailId;
  return config;
});

axios.interceptors.response.use(function (config) {
  return config;
});

export default axios;
