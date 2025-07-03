import React from "react";
import { Form, Button, Card } from "react-bootstrap";

export const CompanyRegistry = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Register Company</Card.Title>
        <Form>
          <Form.Group className="mb-3" controlId="formCompanyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Enter company name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formInitialPrice">
            <Form.Label>Initial Share Price (DSTK)</Form.Label>
            <Form.Control type="number" placeholder="10" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTotalSupply">
            <Form.Label>Total Share Supply</Form.Label>
            <Form.Control type="number" placeholder="1000" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
