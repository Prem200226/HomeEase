import { Container, Row, Col, Card } from "react-bootstrap";

import aboutus1 from "../assets/images/aboutus1.png";
import mission from "../assets/images/mission.png";
import vision from "../assets/images/vision.jpg";
import Snehal from "../assets/images/Snehal.jpeg";
import Prem from "../assets/images/Prem.png";
import Abhi from "../assets/images/Abhi.jpeg";

export function Aboutus() {
    return (
        <Container className="mt-5 mb-5">
            <div className="text-center mb-5">
                <h2 style={{ fontWeight: "bold", color: "#2E0854" }}>About HomeEase</h2>
                <p style={{ fontSize: "18px", color: "#555", marginTop: "10px" }}>
                    Making home services simpler, faster, and more reliable for everyone.
                </p>
            </div>

            {/* Who We Are Section */}
            <Row className="align-items-center mb-5">
                <Col md={6}>
                    <img
                        src={aboutus1}
                        alt="About HomeEase"
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        }}
                    />
                </Col>
                <Col md={6}>
                    <h4 style={{ color: "#2E0854", fontWeight: "600" }}>Who We Are</h4>
                    <p style={{ color: "#333", marginTop: "15px", lineHeight: "1.7" }}>
                        HomeEase is your one-stop platform for trusted and verified home services.
                        From cleaning, electrical work, and plumbing to car repair, pest control,
                        and beauty services — we bring skilled professionals right to your doorstep.
                    </p>
                    <p style={{ color: "#333", lineHeight: "1.7" }}>
                        We aim to make your life easier by ensuring top-quality service,
                        transparent pricing, and on-time delivery — every single time.
                    </p>
                </Col>
            </Row>

            {/* Mission and Vision */}
            <Row className="text-center mb-5">
                <Col md={6}>
                    <Card className="p-4 shadow-sm" style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                        <Card.Img
                            variant="top"
                            src={mission}
                            style={{ width: "80px", margin: "0 auto", marginBottom: "15px" }}
                        />
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "600", color: "#2E0854" }}>Our Mission</Card.Title>
                            <Card.Text>
                                To simplify access to trusted home services by connecting customers with
                                verified professionals, ensuring convenience and satisfaction every time.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="p-4 shadow-sm" style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                        <Card.Img
                            variant="top"
                            src={vision}
                            style={{ width: "80px", margin: "0 auto", marginBottom: "15px" }}
                        />
                        <Card.Body>
                            <Card.Title style={{ fontWeight: "600", color: "#2E0854" }}>Our Vision</Card.Title>
                            <Card.Text>
                                To be India’s most reliable and customer-focused home service provider
                                where convenience meets trust, quality, and excellence.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Core Values */}
            <div
                style={{
                    backgroundColor: "#cfe2ff",
                    padding: "40px 20px",
                    borderRadius: "12px",
                    textAlign: "center",
                    marginBottom: "60px",
                }}
            >
                <h4 style={{ fontWeight: "bold", color: "#000", marginBottom: "20px" }}>Our Core Values</h4>
                <p style={{ fontSize: "16px", maxWidth: "800px", margin: "0 auto", lineHeight: "1.7" }}>
                    Integrity | Quality | Customer Satisfaction | Trust | Innovation
                </p>
            </div>

            {/* Meet Our Team */}
            <div className="text-center mb-5">
                <h3 style={{ color: "#2E0854", fontWeight: "bold", marginBottom: "40px" }}>Meet Our Team</h3>
                <Row className="justify-content-center">
                    <Col md={3} sm={6} className="mb-4">
                        <Card className="shadow-sm border-0">
                            <Card.Img
                                variant="top"
                                src={Prem} // same for Prem and Abhi
                                alt="Team Member 1"
                                style={{
                                    borderRadius: "10px 10px 0 0",
                                    height: "280px",              // slightly taller for balance
                                    objectFit: "contain",          // shows full image without cropping
                                    backgroundColor: "#f8f9fa",    // gives a neutral background if the image doesn't fill the box
                                    padding: "10px"                // adds breathing room
                                }}
                            />
                            <Card.Body>
                                <Card.Title style={{ color: "#2E0854", fontWeight: "600" }}>Prem Myana</Card.Title>
                                <Card.Text>Software Developer</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} sm={6} className="mb-4">
                        <Card className="shadow-sm border-0">
                            <Card.Img
                                variant="top"
                                src={Snehal} 
                                alt="Team Member 2"
                                style={{
                                    borderRadius: "10px 10px 0 0",
                                    height: "280px",              
                                    objectFit: "contain",         
                                    backgroundColor: "#f8f9fa",   
                                    padding: "10px"                
                                }}
                            />
                            <Card.Body>
                                <Card.Title style={{ color: "#2E0854", fontWeight: "600" }}>Snehal Shinde</Card.Title>
                                <Card.Text>Software Developer</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} sm={6} className="mb-4">
                        <Card className="shadow-sm border-0">
                            <Card.Img
                                variant="top"
                                src={Abhi}
                                alt="Team Member 3"
                                style={{
                                    borderRadius: "10px 10px 0 0",
                                    height: "280px",              
                                    objectFit: "contain",         
                                    backgroundColor: "#f8f9fa",   
                                    padding: "10px"                
                                }}
                            />
                            <Card.Body>
                                <Card.Title style={{ color: "#2E0854", fontWeight: "600" }}>Abhishek Jagtap</Card.Title>
                                <Card.Text>Software Developer</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
