import axios from "axios";

const instance = axios.create({
  baseURL:
    "http://localhost/projekUasPemweb/Project-pemweb-kelompok-3/backend/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ini penting untuk kirim session cookie ke backend PHP
});

export default instance;
