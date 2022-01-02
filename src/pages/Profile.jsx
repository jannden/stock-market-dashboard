import React from "react";
import { useDispatch } from "react-redux";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Firebase
import useAuth from "../hooks/useAuth";

// Redux
import { userUpdate } from "../actions/userActions";

const Profile = function Profile() {
  const dispatch = useDispatch();
  const authToolkit = useAuth();

  const [formData, setFormData] = React.useState({
    formLoading: false,
    formError: null,
    formSuccess: null,
    formValidated: false,
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
    setFormData({ ...formData, formValidated: true });
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return null;
    }
    if (
      (formData.newPassword1 || formData.newPassword2) &&
      formData.newPassword1 !== formData.newPassword2
    ) {
      setFormData({ ...formData, formError: "The passwords don't match." });
      return null;
    }
    setFormData({ ...formData, formLoading: true });

    dispatch(userUpdate(authToolkit, formData, setFormData));

    return null;
  };
  const [firebaseData, setFirebaseData] = React.useState({});
  const handleFirebase = () => {
    authToolkit
      .createFirestore(formData)
      .then(() => authToolkit.getFirestore())
      .then((result) => {
        setFirebaseData(result);
      });
  };
  const handleSignout = () => {
    authToolkit.handleSignOut();
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-lg-6 col-md-10 mx-auto">
          <Card className="mb-4">
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
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
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Form.Group id="password-confirm" className="mb-3">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.newPassword2}
                    onChange={handleChange}
                    name="newPassword2"
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <p className="text-center fs-4 mb-3">
                  Ready to update your profile?
                </p>
                <p className="text-center mb-3">
                  To save changes, please verify your old password.
                </p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Your old password"
                    aria-describedby="submit-button"
                    required
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                  />
                  <Button
                    disabled={formData.formLoading}
                    variant="primary"
                    id="submit-button"
                    type="submit"
                  >
                    Update your profile
                  </Button>
                </InputGroup>
              </Form>
              <div className="text-center mb-3">
                <div className="fs-4 mb-3">Ready to leave?</div>
                <Button
                  className=""
                  variant="outline-secondary"
                  type="button"
                  onClick={handleSignout}
                >
                  Sign out
                </Button>
              </div>

              <div className="text-center">
                <div className="fs-4 mb-3">Test firebase</div>
                <Button
                  disabled={formData.formLoading}
                  variant="primary"
                  id="firebase-button"
                  type="submit"
                  onClick={handleFirebase}
                >
                  Send to Firebase
                </Button>
                <p>
                  {firebaseData.email
                    ? `Firestore has now these values: ${JSON.stringify(
                        firebaseData
                      )}`
                    : "Test updating Firestore with the current form values..."}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;
