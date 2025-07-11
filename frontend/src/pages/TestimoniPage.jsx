import { Container, Row, Col } from "react-bootstrap";
import { testimoni } from "../data/index";
import FaqComponent from "../components/FaqComponent";

const TestimoniPage = () => {
  return (
    <div className="testimoni-page">
      <div className="testimoni">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__delay-1s">
                Semua Testimoni
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                Berikut adalah testimoni dari para peserta yang telah mengikuti
                kursus di Lufion Academy. Simak pengalaman mereka dan temukan
                inspirasi untuk perjalanan belajar Anda!
              </p>
            </Col>
          </Row>
          <Row className="row-cols-lg-3 row-cols-1">
            {testimoni.map((data) => {
              return (
                <Col key={data.id} className="mb-5 text-center">
                  <div className="shadow-sm p-4 h-100 rounded bg-white">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="rounded-circle mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="mb-1">{data.name}</h5>
                    <p className="fw-bold m-0">{data.skill}</p>
                    <p className="desc mt-3">{data.desc}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>

      <FaqComponent />
    </div>
  );
};

export default TestimoniPage;
