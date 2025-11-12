import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { saveData } from "../services/UserService";
import { saveAdminData } from "../services/AdminService";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user", // default role
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      const apiCall =
        formData.role === "admin" ? saveAdminData(formData) : saveData(formData);
      const response = await apiCall;

      if (response.status === 200) {
        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <Card className="shadow-lg rounded-4 border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <Alert variant="success" className="fw-bold">
                  Registration
                </Alert>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    value={formData.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={formData.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label className="fw-semibold">Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    value={formData.phone}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>

                {/* 👇 Radio Buttons for Role */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Register As</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="User"
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Admin"
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === "admin"}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="success" type="submit" className="fw-semibold">
                    Register
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account? <a href="/login">Login</a>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
