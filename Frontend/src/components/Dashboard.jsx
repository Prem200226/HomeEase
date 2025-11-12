import { Container, Row, Col } from "react-bootstrap";

// ✅ Local image imports
import carRepair from "../assets/images/carrepair.png";
import carCleaning from "../assets/images/carcleaning.png";
import pestControl from "../assets/images/pestcontrol.png";
import deepCleaning from "../assets/images/deepcleaning.png";
import catering from "../assets/images/catering.png";
import photographers from "../assets/images/photographers.png";

import HomePage1 from "../assets/images/HomePage.jpeg";
import HomePage2 from "../assets/images/HomePage2.jpeg";
import HomePage3 from "../assets/images/HomePage3.jpeg";

import trusted from "../assets/images/trusted.png";
import support from "../assets/images/support.png";
import verified from "../assets/images/verified.png";
import rating from "../assets/images/rating.png";

export function Dashboard() {
  return (
    <Container className="mt-5 text-center">
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #f1f5ff, #e4ebff)",
          padding: "50px 0",
          borderRadius: "15px",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#2E0854",
            marginBottom: "10px",
          }}
        >
          Find Here Your Home Service Solution
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "#333",
            marginBottom: "40px",
          }}
        >
          Welcome to <strong>HomeEase!</strong> Your trusted partner for all home repair,
          maintenance, and improvement needs.
        </p>

        {/* Trending Services */}
        <div style={{ backgroundColor: "#fff", padding: "50px 0" }}>
          <h2 style={{ fontWeight: "bold", color: "#000", marginBottom: "40px" }}>
            Trending Services
          </h2>

          <Row className="justify-content-center">
            <Col md={2}>
              <img src={carRepair} alt="Car Repair" style={{ width: "70px", marginBottom: "15px" }} />
              <p style={{ fontWeight: "500" }}>Car Repair and Services</p>
            </Col>
            <Col md={2}>
              <img src={carCleaning} alt="Car Cleaning" style={{ width: "70px", marginBottom: "15px" }} />
              <p style={{ fontWeight: "500" }}>Car Cleaning</p>
            </Col>
            <Col md={2}>
              <img src={pestControl} alt="Pest Control" style={{ width: "70px", marginBottom: "15px" }} />
              <p style={{ fontWeight: "500" }}>Pest Control</p>
            </Col>
            <Col md={2}>
              <img src={deepCleaning} alt="Deep Cleaning" style={{ width: "70px", marginBottom: "15px" }} />
              <p style={{ fontWeight: "500" }}>Deep Cleaning Services</p>
            </Col>
            <Col md={2}>
              <img src={catering} alt="Catering" style={{ width: "70px", marginBottom: "15px" }} />
              <p style={{ fontWeight: "500" }}>Catering Services</p>
            </Col>
            <Col md={2}>
              <img src={photographers} alt="Photographers" style={{ width: "70px", marginBottom: "15px" }} />
              <p style={{ fontWeight: "500" }}>Photographers</p>
            </Col>
          </Row>
        </div>

        {/* Gallery Section */}
        <Row className="justify-content-center">
          <Col md={4}>
            <img src={HomePage1} alt="Home Service 1" style={{ width: "80%", borderRadius: "10px" }} />
          </Col>
          <Col md={4}>
            <img src={HomePage2} alt="Home Service 2" style={{ width: "80%", borderRadius: "10px" }} />
          </Col>
          <Col md={4}>
            <img src={HomePage3} alt="Home Service 3" style={{ width: "80%", borderRadius: "10px" }} />
          </Col>
        </Row>
      </div>

      {/* Why Choose Us */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "50px 0",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#2E0854",
            marginBottom: "40px",
          }}
        >
          Why Choose HomeEase
        </h2>

        <Row>
          <Col md={3}>
            <img src={trusted} alt="Trusted" style={{ width: "60px", marginBottom: "15px" }} />
            <h5 style={{ fontWeight: "600" }}>Trusted Services</h5>
            <p>Over 1,000 happy customers every day and growing.</p>
          </Col>

          <Col md={3}>
            <img src={support} alt="Support" style={{ width: "60px", marginBottom: "15px" }} />
            <h5 style={{ fontWeight: "600" }}>Instant Support</h5>
            <p>Our consultants are available 24/7 whenever you need us.</p>
          </Col>

          <Col md={3}>
            <img src={verified} alt="Verified" style={{ width: "60px", marginBottom: "15px" }} />
            <h5 style={{ fontWeight: "600" }}>Verified Professionals</h5>
            <p>Background-checked experts providing reliable services.</p>
          </Col>

          <Col md={3}>
            <img src={rating} alt="Rating" style={{ width: "60px", marginBottom: "15px" }} />
            <h5 style={{ fontWeight: "600" }}>Highest Ratings</h5>
            <p>Rated 4.5★+ by customers across all service categories.</p>
          </Col>
        </Row>
      </div>

      {/* Cities Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #003366, #3366cc)",
          color: "#fff",
          padding: "40px 20px",
          borderRadius: "10px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <h5 style={{ fontWeight: "bold", textAlign: "left", marginLeft: "40px" }}>
          SERVICES AVAILABLE IN YOUR CITY
        </h5>

        <div
          style={{
            textAlign: "left",
            marginLeft: "60px",
            marginTop: "20px",
            lineHeight: "2",
            fontSize: "16px",
          }}
        >
          Delhi | Faridabad | Gurgaon | Noida | Ghaziabad | Mumbai | Bangalore | Navi Mumbai |
          Hyderabad | Chennai | Pune | Kolkata | Nagpur | Ahmedabad | Vadodara | Nashik |
          Aurangabad | Indore | Jaipur | Lucknow | Chandigarh | Goa | Meerut | Bhubaneswar
        </div>
      </div>
    </Container>
  );
}
