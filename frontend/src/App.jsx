import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SpecificScreen from './screens/SpecificScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getError } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
//import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  //const fullBox = true;
  //const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  //const [categories, setCategories] = useState([]);
  /*
  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/events/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  */

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1100); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const expand = 'false';
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar fixed="top" expand={expand} className="mb-3 navbar">
            <Container fluid>
              <Container className="topo">
                <LinkContainer to="/">
                  <Navbar.Brand className="logo">My App</Navbar.Brand>
                </LinkContainer>

                <div className="d-none d-sm-block">
                  <Form className="d-flex">
                    <Row>
                      <Col sm={8}>
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                        />
                      </Col>
                      <Col sm={3}>
                        <Button variant="success">
                          {isSmallScreen ? (
                            <FontAwesomeIcon icon={faSearch} />
                          ) : (
                            'Search'
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  className="toggle"
                ></Navbar.Toggle>
              </Container>

              <Navbar.Offcanvas
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className="d-sm-none">
                    <Form className="d-flex">
                      <Row>
                        <Col sm={8}>
                          <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                          />
                        </Col>
                        <Col sm={4}>
                          <Button variant="success">
                            {isSmallScreen ? (
                              <FontAwesomeIcon icon={faSearch} />
                            ) : (
                              'Search'
                            )}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>

                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    <NavDropdown title="Dropdown">
                      <NavDropdown.Item href="#action3">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </header>
      </div>
      <main>
        <Container className="mt-5">
          <Routes>
            <Route path="/event/:slug" element={<SpecificScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">-All rights reserved-</div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
