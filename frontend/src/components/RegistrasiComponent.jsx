import { useState } from "react";
import axios from "../axiosInstance"; // sudah pakai baseURL dan withCredentials

const RegistrasiComponent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default value
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }

    try {
      const response = await axios.post("register-api.php", form);
      setMessage(response.data.message);
      setForm({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Registrasi gagal. Coba lagi.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Form Registrasi</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nama"
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min. 6 karakter)"
          className="form-control mb-2"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="form-control mb-3"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary w-100">
          Daftar
        </button>
      </form>
    </div>
  );
};

export default RegistrasiComponent;
