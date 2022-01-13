import React from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Controls = function Controls() {
  return (
    <Form>
      <div className="mb-2 d-flex gap-2">
        <Form.Control
          placeholder="Start date"
          id="email"
          onChange={(e) => {
            e.target.value = "abc";
          }}
        />
        <Form.Control placeholder="End date" />
      </div>
      <div className="mb-2 d-flex gap-2">
        <Button variant="outline-primary">USD</Button>
        <Button variant="primary">EUR</Button>
      </div>
      <div className="mb-2">
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Show only my favorites"
        />
      </div>
    </Form>
  );
};

export default Controls;
