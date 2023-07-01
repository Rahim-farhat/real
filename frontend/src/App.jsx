import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SpecificScreen from './screens/SpecificScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
//import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getError } from './utils';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';
//import Form from 'react-bootstrap/Form';
//import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CategoryScreen from './screens/CategoryScreen';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import SearchBox from '../components/SearchBox';
//import SearchScreen from './screens/SearchScreen';

function App() {
  //const fullBox = true;
  //const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `https://calm-moth-sweater.cyclic.app/api/events/categories`
        );
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
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
                  <Navbar.Brand className="logo">
                    My Newest App ever
                  </Navbar.Brand>
                </LinkContainer>

                <div className="d-none d-sm-block">{/*<SearchBox />*/}</div>
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
                  <div className="d-sm-none">{/*<SearchBox />*/}</div>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {categories.map((category) => (
                      <Nav.Item key={category}>
                        <LinkContainer
                          to={{
                            pathname: '/search',
                            search: `category=${category}`,
                          }}
                        >
                          <Nav.Link className="catego">{category}</Nav.Link>
                        </LinkContainer>
                      </Nav.Item>
                    ))}
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
            <Route path="/search" element={<CategoryScreen />} />
            {/*<Route path="/search" element={<SearchScreen />} />*/}
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
