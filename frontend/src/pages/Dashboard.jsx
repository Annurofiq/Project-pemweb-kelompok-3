import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      if (storedUser.role === "admin") {
        navigate("/dashboard-admin");
      } else if (storedUser.role === "user") {
        navigate("/dashboard-user");
      } else {
        navigate("/login");
      }
    }
  }, [navigate]);

  return <p>🔄 Mengarahkan ke dashboard...</p>;
};

export default Dashboard;
