import axios from "axios";

const api = axios.create({
  baseURL: "https://feedback-analytics-system-lhll.onrender.com"
});

export default api;
