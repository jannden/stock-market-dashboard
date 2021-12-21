import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Our authentication toolkit
// import { signUp } from "./AuthContext";

const SignUp = function SignUp() {
  const [formData] = React.useState({
    email: "",
    password1: "",
    password2: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center h-100"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h1 className="mb-4 text-center">Sign up</h1>
        <Card>
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="email"
                  value={formData.password1}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                  type="password"
                  name="email"
                  value={formData.password2}
                />
              </Form.Group>
              <Button type="submit" className="w-100">
                Sign up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};
export default SignUp;
