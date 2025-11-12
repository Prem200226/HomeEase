import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        padding: "40px 0 20px",
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">HomeEase</h5>
            <p>Your trusted partner for hassle-free home services and comfort.</p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              <li><a href="/" style={{ color: "#ccc", textDecoration: "none" }}>Dashboard</a></li>
              <li><a href="/add-product" style={{ color: "#ccc", textDecoration: "none" }}>Services</a></li>
              <li><a href="/products-list" style={{ color: "#ccc", textDecoration: "none" }}>About Us</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="https://facebook.com" style={{ color: "#ccc", fontSize: "1.5rem" }}><FaFacebook /></a>
              <a href="https://instagram.com" style={{ color: "#ccc", fontSize: "1.5rem" }}><FaInstagram /></a>
              <a href="https://twitter.com" style={{ color: "#ccc", fontSize: "1.5rem" }}><FaTwitter /></a>
              <a href="https://linkedin.com" style={{ color: "#ccc", fontSize: "1.5rem" }}><FaLinkedin /></a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "30px 0" }} />

        <p className="text-center mb-0" style={{ color: "#aaa" }}>
          © {new Date().getFullYear()} HomeEase. All rights reserved.
        </p>
      </Container>
    </footer >
  );
}