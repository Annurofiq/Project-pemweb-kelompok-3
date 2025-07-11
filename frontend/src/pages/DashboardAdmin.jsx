import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cek role saat komponen mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "admin") {
      alert("Akses hanya untuk admin!");
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return <p>🔄 Memuat data admin...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Dashboard Admin</h2>
      <p>
        Selamat datang, <strong>{user.name}</strong>
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>

      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/kelas-admin")}
        >
          📚 Kelola Kelas
        </button>
      </div>
    </div>
  );
};

export default DashboardAdmin;
