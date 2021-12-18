import React from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const Controls = function Controls() {
  return (
    <Form>
      <div className="mb-3 d-flex gap-2">
        <Form.Control placeholder="Start date" />
        <Form.Control placeholder="End date" />
      </div>
      <div className="mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary">
            Choose currency
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>EUR</Dropdown.Item>
            <Dropdown.Item>USD</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mb-3">
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Show only my favorites"
        />
      </div>
      <div>
        <div className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-primary">Search</Button>
        </div>
      </div>
    </Form>
  );
};

export default Controls;
