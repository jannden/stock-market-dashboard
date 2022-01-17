import React from "react";
import { useSelector } from "react-redux";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = function SignUp() {
  const currentUser = useSelector((state) => state.currentUser);

  const [formData, setFormData] = React.useState({
    formLoading: false,
    formError: null,
    formSuccess: null,
    formValidated: false,
    email: currentUser.email || "",
    displayName: currentUser.displayName || "",
    photoURL: currentUser.photoURL || "",
    newPassword1: "",
    newPassword2: "",
    oldPassword: "",
  });

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFormData(() => ({ ...formData, [fieldName]: fieldValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormData({ ...formData, formValidated: true });
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return null;
    }
    setFormData({ ...formData, formLoading: true });

    // We don't need to dispatch userData to Redux from here, as it is taken care of in onAuthStateChanged (App.jsx)
    createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.newPassword1
    ).catch((firebaseError) => {
      setFormData({
        ...formData,
        formLoading: false,
        formValidated: false,
        formError: `There was an error: ${firebaseError.code}.`,
      });
      setTimeout(() => {
        setFormData({
          ...formData,
          formError: "",
        });
      }, 3000);
    });
    return null;
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-lg-6 col-md-10 mx-auto">
          <Card className="mb-4">
            <Card.Body>
              <h2 className="text-center mb-4">Hello! Please sign up.</h2>
              {formData.formError && (
                <Alert variant="danger">{formData.formError}</Alert>
              )}
              {formData.formSuccess && (
                <Alert variant="success">{formData.formSuccess}</Alert>
              )}
              <Form
                noValidate
                validated={formData.formValidated}
                onSubmit={handleSubmit}
              >
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                </Form.Group>
                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.newPassword1}
                    onChange={handleChange}
                    name="newPassword1"
                  />
                </Form.Group>
                <Form.Group id="password-confirm" className="mb-3">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.newPassword2}
                    onChange={handleChange}
                    name="newPassword2"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    disabled={formData.formLoading}
                    variant="primary"
                    id="submit-button"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUp;
