import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import FormBuilder from "../forms/FormBuilder";

// Data
const signUpForm = [
  {
    pages: [
      {
        title: "Sign Up",
        fields: [
          {
            id: "username",
            label: "Username",
            required: true,
            type: "text",
          },
          {
            id: "email",
            label: "Email address",
            required: true,
            type: "email",
          },
          {
            id: "password",
            label: "Password",
            required: true,
            type: "password",
          },
        ],
      },
    ],
  },
];

const SignUp = function SignUp() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-lg-6 col-md-10 mx-auto">
          <FormBuilder wizardJSON={signUpForm} />
        </Col>
      </Row>
    </Container>
  );
};
export default SignUp;
