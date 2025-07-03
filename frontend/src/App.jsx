import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Navbar, Stack } from "react-bootstrap";
import { ConnectWallet } from "./components/ConnectWallet";
import { CompanyRegistry } from "./components/CompanyRegistry";
import { CompanyList } from "./components/CompanyList";
import { TradeView } from "./components/TradeView";


function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">DeStock</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <ConnectWallet />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col md={8}>
            <Stack gap={3}>
              <h2>Trade</h2>
              <TradeView />
              <h2>All Companies</h2>
              <CompanyList />
            </Stack>
          </Col>
          <Col md={4}>
            <Stack gap={3}>
              <h2>Register</h2>
              <CompanyRegistry />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;