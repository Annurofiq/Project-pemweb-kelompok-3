import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/img/hero.png";

import { kelasTerbaru, dataSwiper, mentor } from "../data/index";
import { useNavigate } from "react-router-dom";
import FaqComponent from "../components/FaqComponent";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination } from "swiper/modules";

import TestimoniPage from "./TestimoniPage";

const HomePage = () => {
  let Navigate = useNavigate();
  return (
    <div className="homepage">
      {/* w-100 min-vh-100 d-flex align-items-center overflow-hidden */}
      <header>
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="6">
              <h1 className="mb-4 animate__animated animate__bounceInUp animeate__delay-1s">
                Belajar Skill Digital <br /> yang Dibutuhkan Dunia Kerja
                Sekarang
              </h1>
              <p className="mb-4 animate__animated animate__fadeInUp animeate__delay-1s">
                Mulai dari dasar hingga mahir. Pelajari desain, coding,
                pemasaran digital, dan lebih banyak lagi—semua dalam satu
                platform, kapan saja, di mana saja
              </p>
              <button
                className="btn btn-dark btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animeate__delay-1s"
                onClick={() => Navigate("/kelas")}
              >
                Lihat Kelas
              </button>
              <button className="btn btn-outline-dark btn-lg rounded-1 mb-xs-0 mb-2 animate__animated animate__fadeInUp animeate__delay-1s">
                Lihat Promo
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img
                src={HeroImage}
                alt="hero-img"
                className="animate__animated animate__backInUp"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="kelas w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold">Kelas Terbaru</h1>
              <p className="text-center mb-5">
                Rekomendasi Kelas Populer Saat Ini
              </p>
            </Col>
          </Row>
          <Row>
            {kelasTerbaru.map((kelas) => {
              return (
                <Col
                  key={kelas.id}
                  className="shadow rounded"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={kelas.delay}
                >
                  <img
                    src={kelas.image}
                    alt={kelas.title}
                    className="w-100 mb-3 rounded-top"
                  />
                  <h5 className="px-3">{kelas.title}</h5>
                  <p className="px-3">{kelas.description}</p>
                  <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                    <p className="m-0 text-primary fw-bold">Rp {kelas.price}</p>
                    <button
                      className="btn btn-danger rounded-1"
                      onClick={() => Navigate("/PembelajaranPage")}
                    >
                      {kelas.buy}
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col className="text-center">
              <button
                className="btn btn-success rounded-5 btn-lg"
                data-aos="fade-up"
                data-aos-duration="1000"
                onClick={() => Navigate("/kelas")}
              >
                Lihat Semua Kelas
              </button>
              <i className="fa-solid fa-chevron-right ms-3"></i>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mentor section */}
      <div className="mentor-page">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold p-2 animate__animated animate__fadeInUp animate__delay-1s">
                Mentor
              </h1>
              <p className="text-center mb-5">
                Belajar Langsung dari Para Expert
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={25} className="position-relative">
              <Swiper
                rewind={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={0}
              >
                {mentor.map((data) => (
                  <SwiperSlide key={data.id}>
                    <div
                      className="mentor-card d-flex bg-white rounded shadow mx-auto"
                      style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        // maxWidth: "900px",
                        width: "90%",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          paddingRight: "30px",
                          padding: "20px",
                        }}
                      >
                        <h4 className="fw-bold">{data.name}</h4>
                        <p className="fw-bold mb-2">{data.skill}</p>
                        <p className="desc" style={{ whiteSpace: "pre-wrap" }}>
                          Deskripsi Pengajar : <br />
                          {data.desc}
                        </p>
                      </div>
                      <div style={{ flexShrink: 0 }}>
                        <img
                          src={data.image}
                          alt={data.name}
                          style={{
                            width: "300px",
                            borderRadius: "0px 5px 5px 0px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mentor section end*/}

      {/* Testimoni section */}
      <div className="testimoni py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold my-5">Testimoni</h1>
            </Col>
          </Row>
          <Row>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {dataSwiper.map((data) => {
                return (
                  <SwiperSlide key={data.id} className="shadow-sm ">
                    <img src={data.image} alt="" />
                    <h5 className="mb-2">{data.name}</h5>
                    <h5 className="m-1.5 fw-bold">{data.skill}</h5> <br />
                    <p className="desc">{data.desc}</p>
                    <div className="people"></div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Row>
        </Container>
      </div>
      {/* Faq Section */}
      <FaqComponent />
      {/* Faq Section end*/}
      {/* <TestimoniPage /> */}
    </div>
  );
};

export default HomePage;
