import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import FormBuilder from "../forms/FormBuilder";

// Data for sign-up fields
import logInForm from "../data/logInForm";

const SignUp = function SignUp() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-lg-6 col-md-10 mx-auto">
          <FormBuilder wizardJSON={logInForm} formPurpose="logIn" />
        </Col>
      </Row>
    </Container>
  );
};
export default SignUp;
