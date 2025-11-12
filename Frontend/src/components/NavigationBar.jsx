import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from "../services/TokenService";
import { getRole, removeRole } from "../services/RoleService";
import { ROLES } from "../constants/RoleConstants";
import logo from "../assets/images/logo.png";

export function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [role, setRole] = useState(getRole());
  console.log("Current role in Navbar:", role);
  const navigate = useNavigate();

  // 👇 Update login & role dynamically
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!getToken());
      setRole(getRole());
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    clearToken();
    removeRole();
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      style={{ background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)", height: "80px" }}
      // "
      variant="dark"
    >
      <Container>
        <Navbar.Brand><img
            src={logo}
            alt="HomeEase Logo"
            style={{
              height: "45px", // ✅ Adjust this to your preferred size (40–60px usually looks good)
              width: "auto",
              marginRight: "12px",
              borderRadius: "8px",
            }}
          />HomeEase</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          

          <Nav className="me-auto">
            {isLoggedIn && <Nav.Link>Logged in as: {role}</Nav.Link>}
            {isLoggedIn && role === "ADMIN" && (
              <>
                {/* <LinkContainer to="/">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer> */}
                <LinkContainer to="/add-services">
                  <Nav.Link>Add Services</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/serviceList">
                  <Nav.Link>Services List</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/feedback-list">
                  <Nav.Link>Feedback List</Nav.Link>
                </LinkContainer>
                
              </>
            )}
            {isLoggedIn && role === "USER" && (
              <>
                <LinkContainer to="/service-dashboard">
                  <Nav.Link>Service Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about-us">
                  <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/feedback">
                  <Nav.Link>Feedback</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>


          {/* 👇 Right side of navbar (Login / Logout) */}
          <Nav className="ms-auto">
            {!isLoggedIn ? (
              <LinkContainer to="/login">
                <button
                  type="button"
                  className="btn btn-outline-secondary text-white"
                >
                  Login
                </button>
              </LinkContainer>
            ) : (
              <button
                type="button"
                className="btn btn-outline-danger text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
