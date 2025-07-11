import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "user") {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return <p>🔄 Memuat data user...</p>;

  return (
    <div className="container mt-5">
      <h2>Dashboard Pengguna</h2>
      <p>Halo, {user.name}</p>
      <p>Role: {user.role}</p>
      <button className="btn btn-success" onClick={() => navigate("/kelas")}>
        Lihat Kelas
      </button>
    </div>
  );
};

export default DashboardUser;
