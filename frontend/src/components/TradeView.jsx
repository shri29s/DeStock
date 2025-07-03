import React from "react";
import { Form, Button, Card, InputGroup, FormControl } from "react-bootstrap";

export const TradeView = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Trade Shares</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Company</Form.Label>
            <Form.Select>
              <option>1: Test Corp (TC)</option>
            </Form.Select>
          </Form.Group>
          <InputGroup className="mb-3">
            <FormControl placeholder="Amount" />
            <Button variant="success">Buy</Button>
            <Button variant="danger">Sell</Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};
