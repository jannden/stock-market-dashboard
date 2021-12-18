import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Header from "./components/Header";
import Controls from "./components/Controls";

const App = function App() {
  return (
    <div>
      <Header />
      <Container>
        <Row className="mb-4">
          <Col xs={3}>
            <Card>
              <Card.Body>
                <Card.Text>
                  <Controls />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>Here will be the chart</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>Here will be the table</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
