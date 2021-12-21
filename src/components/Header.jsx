import React from "react";

// Routing
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

import { useAuth } from "../auth/AuthContext";

const Header = function Header() {
  const { handleSignOut } = useAuth();
  return (
    <Navbar bg="primary" variant="dark" expand="md" className="mb-4">
      <Container>
        <Link to="/">
          <Navbar.Brand>Stock Market Dashboard</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/sign-up" className="nav-link">
              Sign Up
            </Link>
            <Link to="/log-in" className="nav-link">
              Log In
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/" onClick={handleSignOut}>
              Sign out
            </Link>
          </Nav>
          <a href="#profile" className="justify-content-end">
            <Image
              src="https://eu.ui-avatars.com/api/?name=John+Doe"
              roundedCircle
            />
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
