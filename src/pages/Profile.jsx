import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useAuth } from "../auth/AuthContext";

const Profile = function Profile() {
  const emailRef = React.useRef();
  const displayNameRef = React.useRef();
  const photoURLRef = React.useRef();
  const passwordOldRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const authToolkit = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    async function myPromises() {
      const credential = authToolkit.EmailAuthProvider.credential(
        authToolkit.currentUser.email,
        passwordOldRef.current.value
      );
      await authToolkit.reauthenticate(credential);
      if (emailRef.current.value !== authToolkit.currentUser.email) {
        authToolkit.handleUpdateEmail(emailRef.current.value);
      }
    }
    myPromises().catch((err) => {
      console.log(err.message);
    });

    /*
    if (passwordRef.current.value) {
      authToolkit.handleUpdatePassword(passwordRef.current.value);
    }
    authToolkit.handleUpdateProfile(
      displayNameRef.current.value,
      photoURLRef.current.value
    );
    */
    setLoading(false);
    return false;
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-lg-6 col-md-10 mx-auto">
          <button type="button" onClick={authToolkit.handleSignOut}>
            Sign Out
          </button>

          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="passwordOld">
                  <Form.Label>Password OLD</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordOldRef}
                    placeholder="Fill to save the form"
                  />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={authToolkit.currentUser.email}
                  />
                </Form.Group>
                <Form.Group id="displayName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={displayNameRef}
                    required
                    defaultValue={authToolkit.currentUser.displayName}
                  />
                </Form.Group>
                <Form.Group id="photoURL">
                  <Form.Label>Photo URL</Form.Label>
                  <Form.Control
                    type="text"
                    ref={photoURLRef}
                    required
                    defaultValue={authToolkit.currentUser.photoURL}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;
