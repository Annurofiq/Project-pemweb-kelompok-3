import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import { Container, Row, Col } from "react-bootstrap";

const KelasAdmin = () => {
  const [kelasList, setKelasList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    schedule: "",
    image: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(
        "http://localhost/projekUasPemweb/Project-pemweb-kelompok-3/backend/api/courses-api.php"
      )
      .then((res) => setKelasList(res.data))
      .catch((err) => console.error("❌ Gagal fetch data:", err));
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
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert("✅ Kelas berhasil ditambahkan");
        setFormData({
          title: "",
          description: "",
          price: "",
          schedule: "",
          image: "",
        });
        fetchData();
      })
      .catch((err) => {
        console.error("❌ Gagal tambah kelas:", err);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus kelas ini?")) return;

    axios
      .delete(
        "http://localhost/projekUasPemweb/Project-pemweb-kelompok-3/backend/api/courses-api.php",
        {
          data: { id: id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        fetchData();
      })
      .catch((err) => {
        console.error("❌ Gagal hapus kelas:", err);
      });
  };

  return (
    <div className="kelas-admin min-vh-100 py-4">
      <Container>
        <h2 className="mb-4 text-center">Dashboard Admin - Kelola Kelas</h2>

        {/* Form Tambah Kelas */}
        <Row className="mb-5">
          <Col md={8} className="mx-auto">
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
                  placeholder="URL Gambar"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Tambah Kelas
              </button>
            </form>
          </Col>
        </Row>

        {/* Daftar Kelas */}
        <Row>
          <Col>
            <h4 className="text-center">Daftar Kelas Tersedia</h4>
          </Col>
        </Row>

        <Row className="gy-4 mt-2">
          {kelasList.map((kelas) => (
            <Col key={kelas.id} md={4} className="shadow rounded">
              {kelas.image ? (
                <img
                  src={kelas.image}
                  alt={kelas.title}
                  className="w-100 mb-3 rounded-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="text-muted">Gambar tidak tersedia</p>
                </div>
              )}
              <h5 className="px-3">{kelas.title}</h5>
              <p className="px-3">{kelas.description}</p>
              <div className="d-flex justify-content-between align-items-center px-3 pb-3">
                <p className="m-0 fw-bold text-primary">Rp {kelas.price}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(kelas.id)}
                >
                  Hapus
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default KelasAdmin;
