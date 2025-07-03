import React from "react";
import { ListGroup, Card } from "react-bootstrap";

export const CompanyList = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Listed Companies</Card.Title>
        <ListGroup>
          {/* Placeholder */}
          <ListGroup.Item>
            Test Corp (TC) - Price: 10 DSTK
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
