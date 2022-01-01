import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Firebase
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const SignUp = function SignUp() {
  const authToolkit = useAuth();

  const [formLoading, setFormLoading] = React.useState(false);
  const [formError, setFormError] = React.useState();
  const [formSuccess, setFormSuccess] = React.useState();
  const [formValidated, setFormValidated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: authToolkit.currentUser?.email || "",
    displayName: authToolkit.currentUser?.displayName || "",
    photoURL: authToolkit.currentUser?.photoURL || "",
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
    setFormValidated(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return null;
    }
    if (
      (formData.newPassword1 || formData.newPassword2) &&
      formData.newPassword1 !== formData.newPassword2
    ) {
      setFormError("The passwords don't match.");
      return null;
    }

    setFormLoading(true);

    authToolkit
      .handleSignUp(formData.email, formData.newPassword1)
      .then(() =>
        authToolkit.handleUpdateProfile(formData.displayName, formData.photoURL)
      )
      .then(() => auth.currentUser.reload())
      .then(() => {
        const data = {
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL,
        };
        authToolkit.setCurrentUser(data);
        setFormSuccess("Changes to your profile were saved.");
      })
      .catch((firebaseError) => {
        const errorCode = firebaseError.code;
        setFormError(`There was an error: ${errorCode}.`);
      })
      .finally(() => {
        setFormLoading(false);
        setFormValidated(false);
        setTimeout(() => {
          setFormSuccess("");
          setFormError("");
        }, 5000);
      });

    return null;
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-lg-6 col-md-10 mx-auto">
          <Card className="mb-4">
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {formError && <Alert variant="danger">{formError}</Alert>}
              {formSuccess && <Alert variant="success">{formSuccess}</Alert>}
              <Form
                noValidate
                validated={formValidated}
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
                <Form.Group id="displayName" className="mb-3">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={handleChange}
                    name="displayName"
                  />
                </Form.Group>
                <Form.Group id="photoURL" className="mb-3">
                  <Form.Label>Photo URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.photoURL}
                    onChange={handleChange}
                    name="photoURL"
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
                    disabled={formLoading}
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
