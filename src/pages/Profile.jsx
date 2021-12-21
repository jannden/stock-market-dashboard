import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import FormBuilder from "../forms/FormBuilder";

// Data for sign-up fields
import profileForm from "../data/profileForm";

const Profile = function Profile(props) {
  const { token, setToken } = props;
  const handleLogOut = () => {
    setToken(null);
  };
  if (!token) {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col className="col-lg-6 col-md-10 mx-auto">
            <button type="button">Sign Out</button>
            <FormBuilder
              wizardJSON={profileForm}
              setToken={setToken}
              formPurpose="logIn"
            />
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-lg-6 col-md-10 mx-auto">
          You are logged in.
          <button type="button" onClick={handleLogOut}>
            Log Out
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;
