import React from "react";

// Routing
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

import { useAuth } from "./AuthContext";

const UserNav = function UserNav() {
  const { currentUser } = useAuth();
  const { displayName, photoURL } = currentUser;
  const avatarLetters = displayName || "☺";
  const avatar =
    photoURL || `https://eu.ui-avatars.com/api/?name=${avatarLetters}`;
  return (
    <Link to="/profile">
      <Image
        to="/profile"
        src={avatar}
        roundedCircle
        style={{ maxHeight: "30px", maxWidth: "30px" }}
      />
    </Link>
  );
};

const VisitorNav = function VisitorNav() {
  return (
    <Nav>
      <Link to="/sign-up" className="nav-link">
        Sign Up
      </Link>
      <Link to="/log-in" className="nav-link">
        Log In
      </Link>
    </Nav>
  );
};

const HeaderNav = function HeaderNav() {
  const { currentUser } = useAuth();
  if (currentUser) return <UserNav />;
  return <VisitorNav />;
};

const Header = function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Stock Market Dashboard
        </Navbar.Brand>
        <div className="d-flex justify-content-end align-items-center">
          <HeaderNav />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
