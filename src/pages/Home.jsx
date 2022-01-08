import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// Components
import Table from "../components/Table";
import Controls from "../components/Controls";
import Chart from "../components/Chart";

const Home = function Home() {
  return (
    <Container>
      <Row className="mb-2">
        <Col xs={4}>
          <Card>
            <Card.Body>
              <Controls />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Table />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Chart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
