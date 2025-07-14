import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { navLinks } from "../data/index";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const NavbarComponents = () => {
  const [changeColor, setChangeColor] = useState(false);
  const navigate = useNavigate();

  const changeBackgroundColor = () => {
    if (window.scrollY >= 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("check-login.php")
      .then((res) => {
        console.log("Login sebagai:", res.data.user);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log("Belum login");
        } else {
          console.error("Gagal akses check-login.php", err);
        }
      });

    window.addEventListener("scroll", changeBackgroundColor);
    return () => {
      window.removeEventListener("scroll", changeBackgroundColor);
    };
  }, []);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className={changeColor ? "color-active" : ""}
        style={{
          transition: "0.5s",
          position: "fixed",
          width: "100%",
          zIndex: 999,
          top: 0,
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fs-4 fw-bold">
            <span className="logo-box">L</span>
            <span className="logo-text">UFION</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center gap-4">
              {navLinks.map((link) => {
                return (
                  <div className="nav-link" key={link.id}>
                    <NavLink
                      to={link.path}
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                      end
                    >
                      {link.text}
                    </NavLink>
                  </div>
                );
              })}
            </Nav>

            <div className="text-center">
              {user ? (
                <>
                  <span className="me-3 fw-semibold">
                    👤 {user.role.toUpperCase()}
                  </span>
                  <Button
                    variant="outline-danger rounded-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/registrasi">
                    <Button variant="outline-dark rounded-1 me-2">
                      Daftar
                    </Button>
                  </NavLink>
                  <NavLink to="/login">Masuk</NavLink>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponents;
