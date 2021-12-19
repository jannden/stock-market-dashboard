/* eslint-disable */

// Routing
import { Link } from "react-router-dom";

import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

const Header = function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">Stock Market Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/sign-up" className="nav-link">
              Sign Up
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
