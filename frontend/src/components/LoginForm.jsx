import { useState } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("login-api.php", form);

      const user = response.data.user;
      // LoginForm.jsx
      localStorage.setItem("user_id", user.id); // TAMBAHKAN INI
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      alert("Login berhasil sebagai " + user.role);

      // Arahkan ke halaman sesuai role
      if (user.role === "admin") {
        navigate("/kelas-admin");
      } else {
        navigate("/kelas");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Terjadi kesalahan saat login"
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Form Login</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
