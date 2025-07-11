import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/main.css";

const MentorComponent = () => {
  return (
    <div className="mentor-page min-vh-100">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center p-5 fw-bold animate__animated animate__fadeInUp animate__delay-1s">
              Mentor
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MentorComponent;
