import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SpecificScreen from './screens/SpecificScreen';
import AboutUsScreen from './screens/AboutUsScreen';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMeteor } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/esm/Button';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import SearchBox from '../components/SearchBox';
//import SearchScreen from './screens/SearchScreen';

function App() {
  //const fullBox = true;
  //const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleNavItemClick = () => {
    setShowOffcanvas(false); // Close the Offcanvas when a navigation item is clicked
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `https://eventassium.netlify.app/api/events/categories`
        );
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  const currentDate = new Date();

  const options = {
    weekday: 'short', // Short weekday name (e.g., Tue)
    day: 'numeric', // Day of the month (e.g., 25)
    month: 'short', // Short month name (e.g., Jul)
    year: 'numeric', // Full year (e.g., 2023)
  };
  const formattedDate = currentDate.toLocaleString('en-US', options);

  /*const expand = 'false';*/
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar fixed="top" expand="false" className="mb-3 navbar">
            <Container fluid>
              <Container className="topo">
                <LinkContainer to="/events">
                  <Navbar.Brand className="logo">
                    <div className="picht">
                      Explore
                      <FontAwesomeIcon icon={faMeteor} className="BigiconSp" />
                    </div>
                  </Navbar.Brand>
                </LinkContainer>

                <LinkContainer to="/">
                  <Navbar.Brand className="appname">Eventassium™</Navbar.Brand>
                </LinkContainer>
                {/*
                <div className="d-none d-sm-block">{ <SearchBox /> }</div>
                <Navbar.Toggle
                  aria-controls="offcanvasNavbar"
                  className="toggle lighter-toggle"
                  onClick={() => setShowOffcanvas((prevState) => !prevState)}
                />*/}
                <Button
                  aria-controls="offcanvasNavbar"
                  className="toggle"
                  onClick={() => setShowOffcanvas((prevState) => !prevState)}
                >
                  <FontAwesomeIcon icon={faBars} className="BigiconSp" />
                </Button>
              </Container>

              <Navbar.Collapse id="offcanvasNavbar">
                <Navbar.Offcanvas
                  show={showOffcanvas}
                  onHide={() => setShowOffcanvas(false)}
                  placement="start"
                  aria-labelledby="offcanvasNavbarLabel"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Categories</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="d-sm-none">{/* <SearchBox /> */}</div>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      {categories.map((category) => (
                        <Nav.Item key={category}>
                          <LinkContainer
                            to={{
                              pathname: '/search',
                              search: `category=${category}`,
                            }}
                          >
                            <Nav.Link
                              className="catego"
                              onClick={handleNavItemClick}
                            >
                              {category}
                            </Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      </div>
      <main>
        <Container className="mt-5">
          <Routes>
            <Route path="/event/:slug" element={<SpecificScreen />} />
            <Route path="/events" element={<HomeScreen />} />
            <Route path="/search" element={<CategoryScreen />} />
            <Route path="/" element={<AboutUsScreen />} />
            {/*<Route path="/search" element={<SearchScreen />} />*/}
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center mt-2">
          <div className="dot">
            <div className="ring-container">
              <div className="ringring"></div>
              <div className="circle"></div>
            </div>
            <p>Today: {formattedDate}</p>
          </div>

          <p>-All rights reserved-</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
