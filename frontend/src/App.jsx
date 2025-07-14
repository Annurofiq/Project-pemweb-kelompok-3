import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axiosInstance from "./axiosInstance";

import NavbarComponent from "./components/NavbarComponents";
import FooterComponent from "./components/FooterComponent";

import LoginForm from "./components/LoginForm";
import RegistrasiComponent from "./components/RegistrasiComponent";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import HomePage from "./pages/HomePage";
import KelasPage from "./pages/KelasPage";
import KelasAdmin from "./pages/KelasAdmin";
import TestimoniPage from "./pages/TestimoniPage";
import FaqPage from "./pages/FaqPage";
import SyaratPage from "./pages/SyaratPage";
import Pembelajaran from "./pages/PembelajaranPage";

function App() {
  useEffect(() => {
    axiosInstance
      .get("check-login.php")
      .then((res) => {
        console.log("Login sebagai:", res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch(() => {
        console.log("Belum login");
        localStorage.removeItem("user");
      });
  }, []);

  const location = useLocation();
  const hideNavFooter = location.pathname === "/pembelajaranPage";

  return (
    <>
      {!hideNavFooter && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kelas" element={<KelasPage />} />
        <Route path="/kelas-admin" element={<KelasAdmin />} />
        <Route path="/testimoni" element={<TestimoniPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/syarat" element={<SyaratPage />} />
        <Route path="/pembelajaranPage" element={<Pembelajaran />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registrasi" element={<RegistrasiComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />
      </Routes>
      {!hideNavFooter && <FooterComponent />}
    </>
  );
}

export default App;
