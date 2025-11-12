import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

export function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      const response = await axios.post("http://localhost:4500/feedback", formData);
      console.log("Feedback submitted:", response.data);
      setSubmitted(true);
      setError("");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong while sending feedback. Please try again!");
    }
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded shadow" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4 text-primary">We Value Your Feedback 💬</h2>

      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
          Thank you for your feedback! 💖
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Your Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            placeholder="Write your feedback here..."
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="px-4">
            Submit Feedback
          </Button>
        </div>
      </Form>
    </Container>
  );
}
