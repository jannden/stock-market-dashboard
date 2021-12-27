import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "../helpers/Table";

// Components
import Controls from "../helpers/Controls";

const Home = function Home() {
  return (
    <Container>
      <Row className="mb-4">
        <Col xs={3}>
          <Card>
            <Card.Body>
              <Controls />
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
              <Table />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;