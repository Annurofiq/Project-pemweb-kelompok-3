import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import FaqComponent from "../components/FaqComponent";
import { useNavigate } from "react-router-dom";

const KelasPage = () => {
  const [kelasList, setKelasList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    schedule: "",
    image: "",
  });

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(
        "http://localhost/projekUasPemweb/Project-pemweb-kelompok-3/backend/api/courses-api.php"
      )
      .then((res) => setKelasList(res.data))
      .catch((err) => console.error("Gagal fetch data:", err));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost/projekUasPemweb/Project-pemweb-kelompok-3/backend/api/courses-api.php",
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        alert("Kelas berhasil ditambahkan");
        setFormData({
          title: "",
          description: "",
          price: "",
          schedule: "",
          image: "",
        });
        fetchData();
      })
      .catch((err) => console.error("Gagal tambah kelas:", err));
  };

  const handleDaftar = (course_id) => {
    if (!userId) {
      alert("Silakan login terlebih dahulu untuk mendaftar kelas.");
      navigate("/login");
      return;
    }

    axios
      .post(
        "http://localhost/projekUasPemweb/Project-pemweb-kelompok-3/backend/api/enrollments-api.php",
        JSON.stringify({ course_id }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        alert(res.data.message);
        navigate("/PembelajaranPage");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("Silakan login terlebih dahulu.");
          navigate("/login");
        } else {
          alert(err.response?.data?.message || "Gagal daftar kelas.");
          console.error("Gagal daftar:", err);
        }
      });
  };

  return (
    <div className="kelas-page w-100 min-vh-100">
      <Container>
        {role === "admin" && (
          <Row className="my-5">
            <Col md={8} className="mx-auto">
              <h3 className="mb-3">Tambah Kelas Baru</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Judul Kelas"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Deskripsi"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Harga"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="datetime-local"
                    name="schedule"
                    className="form-control"
                    value={formData.schedule}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    placeholder="URL Gambar (opsional)"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Tambah Kelas
                </button>
              </form>
            </Col>
          </Row>
        )}

        <Row style={{ marginTop: "100px" }}>
          <Col>
            <h1 className="text-center fw-bold">Semua Kelas</h1>
            <p className="text-center mb-5">Lihat semua kelas yang tersedia</p>
          </Col>
        </Row>

        <Row className="gy-4">
          {kelasList.map((kelas) => (
            <Col
              key={kelas.id}
              md={4}
              className="shadow rounded"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <img
                src={
                  kelas.image
                    ? kelas.image
                    : "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={kelas.title}
                className="w-100 mb-3 rounded-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <h5 className="px-3">{kelas.title}</h5>
              <p className="px-3">{kelas.description}</p>
              <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                <p className="m-0 text-primary fw-bold">Rp {kelas.price}</p>
                <button
                  className="btn btn-danger rounded-1"
                  onClick={() => handleDaftar(kelas.id)}
                >
                  Daftar Sekarang
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <FaqComponent />
    </div>
  );
};

export default KelasPage;
