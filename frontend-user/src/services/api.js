import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-yty7.onrender.com"
});

export default api;
