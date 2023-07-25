import axios from "axios";

const baseURL = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});
export { baseURL };
