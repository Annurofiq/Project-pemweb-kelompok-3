import { Container, Row, Col } from "react-bootstrap";
import FaqComponent from "../components/FaqComponent";

const SyaratPage = () => {
  return (
    <div className="syarat-ketentuan-page">
      <div className="syarat-ketentuan min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center mb-1 animate__animated animate__fadeInUp animate__delay-1s">
                Syarat & Ketentuan
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                Syarat dan ketentuan ini mengatur penggunaan layanan Lufion
                Academy.
              </p>
            </Col>
          </Row>
          <Row className="pt-5">
            <Col>
              <p>
                Dengan mengakses dan menggunakan layanan Lufion Academy, Anda
                setuju untuk mematuhi syarat dan ketentuan berikut. Jika Anda
                tidak setuju dengan syarat dan ketentuan ini, harap tidak
                menggunakan layanan kami.
              </p>
            </Col>
          </Row>
          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">1. Pendaftaran dan Akun Pengguna</h4>
            </Col>
            <p>
              Untuk dapat mengakses kursus yang tersedia di Lufion Academy, Anda
              diharuskan untuk membuat akun dengan memberikan informasi yang
              akurat, lengkap, dan terkini. Anda bertanggung jawab penuh atas
              kerahasiaan akun Anda dan segala aktivitas yang terjadi di bawah
              akun Anda. Jika Anda merasa ada aktivitas yang mencurigakan,
              segera hubungi tim dukungan kami.
            </p>
          </Row>
          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">2. Akses Kursus dan Materi</h4>
              <p>
                Setelah pendaftaran dan pembayaran yang berhasil (jika
                diperlukan), Anda akan mendapatkan akses ke kursus yang Anda
                pilih. Akses ini dapat berupa akses jangka waktu tertentu atau
                akses seumur hidup, sesuai dengan ketentuan kursus
                masing-masing. Semua materi yang disediakan dalam kursus adalah
                hak milik Lufion Academy dan dilindungi oleh hukum hak cipta.
                Penggunaan materi hanya boleh untuk tujuan pribadi dan
                non-komersial.
              </p>
            </Col>
          </Row>
          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">3. Pembayaran dan Biaya</h4>
              <p>
                Lufion Academy mengenakan biaya untuk akses ke beberapa kursus.
                Pembayaran dilakukan melalui metode yang disediakan di platform
                kami. Semua biaya kursus yang telah dibayar bersifat final dan
                tidak dapat dikembalikan, kecuali dalam keadaan khusus yang
                ditentukan dalam kebijakan pengembalian dana.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="fw-bold">4. Penggunaan Konten</h4>
              <p>
                Konten yang disediakan di Lufion Academy, termasuk video, materi
                teks, dan latihan, hanya boleh digunakan untuk kepentingan
                pribadi dan non-komersial. Anda tidak diperbolehkan untuk
                menyalin, memodifikasi, mendistribusikan, atau menggunakan
                konten untuk tujuan komersial tanpa izin tertulis dari Lufion
                Academy.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="fw-bold">5. Pengembalian Dana</h4>
              <p>
                Pengembalian dana untuk kursus yang dibeli dapat dilakukan dalam
                waktu 14 hari setelah pembelian jika Anda merasa kursus yang
                Anda pilih tidak sesuai dengan harapan atau kebutuhan Anda.
                Namun, pengembalian dana tidak berlaku jika kursus telah diakses
                sepenuhnya atau jika sertifikat telah diterbitkan.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <FaqComponent />
    </div>
  );
};

export default SyaratPage;
