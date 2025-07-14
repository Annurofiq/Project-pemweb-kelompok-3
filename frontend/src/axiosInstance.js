// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "http://localhost/projekUasPemweb/Project-pemweb-kelompok-3/backend/api/",
  withCredentials: true, // <-- penting untuk kirim cookie/session
});

export default axiosInstance;
