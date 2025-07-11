import { useState } from "react";
import { Link } from "react-router-dom";

const PembelajaranPage = () => {
  const [showModul, setShowModul] = useState(true);
  const [materiAktif, setMateriAktif] = useState(null);

  const toggleModul = () => {
    setShowModul(!showModul);
  };

  const daftarMateri = [
    {
      judul: "Materi 1 : Pengenalan Web Development",
      konten:
        "Ini adalah paragraf pembelajaran untuk Materi 1. Kamu akan belajar dasar-dasar HTML dan struktur halaman web.",
    },
    {
      judul: "Materi 2",
      konten:
        "Ini adalah paragraf pembelajaran untuk Materi 2. Kita masuk ke CSS dan bagaimana mempercantik tampilan.",
    },
    {
      judul: "Materi 3",
      konten:
        "Materi 3 membahas dasar JavaScript dan bagaimana membuat web jadi interaktif.",
    },
    {
      judul: "Materi 4",
      konten:
        "Di Materi 4 kita akan mengenal DOM dan cara manipulasi elemen HTML dengan JavaScript.",
    },
    {
      judul: "Materi 5",
      konten:
        "Materi terakhir membahas integrasi semua skill untuk membuat mini project.",
    },
  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#E3F2FD",
          height: "15vh",
          padding: "0 20px",
          paddingRight: "22%",
        }}
      >
        <Link to="/" style={{ marginRight: "auto", fontSize: "24px" }}>
          ←
        </Link>
        <h2 style={{ margin: "0 auto" }}>Belajar Web Developer</h2>
      </header>

      {/* Konten Utama */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Konten Kiri */}
        <div style={{ flex: 1, padding: "30px" }}>
          {materiAktif ? (
            <>
              <h4>{materiAktif.judul}</h4>
              <p>{materiAktif.konten}</p>
            </>
          ) : (
            <>
              <h4>Rofiq</h4>
              <p>Deskripsi Pengajar :</p>
              <p>
                Hai! Aku adalah seorang Web Developer yang sudah beberapa tahun
                berkecimpung di dunia pengembangan website, dari bikin tampilan
                yang menarik sampai bikin fitur yang benar-benar jalan. Aku
                biasa pakai HTML, CSS, JavaScript, React, dan juga back-end
                seperti Node.js.
              </p>
            </>
          )}
        </div>

        {/* Panel Modul */}
        <div
          style={{
            width: showModul ? "250px" : "50px",
            transition: "all 0.3s ease",
            backgroundColor: "#fff",
            borderLeft: "1px solid #ddd",
            padding: "20px",
            overflow: "hidden",
          }}
        >
          {/* Tombol Panah */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={toggleModul}
          >
            <span style={{ fontSize: "24px", marginRight: "10px" }}>
              {showModul ? "➤" : "◀"}
            </span>
            {showModul && <strong>Daftar Modul</strong>}
          </div>

          {/* List Modul */}
          {showModul && (
            <ul style={{ marginTop: "20px", paddingLeft: "20px" }}>
              {daftarMateri.map((materi, index) => (
                <li
                  key={index}
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  onClick={() => setMateriAktif(materi)}
                >
                  {materi.judul}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PembelajaranPage;
