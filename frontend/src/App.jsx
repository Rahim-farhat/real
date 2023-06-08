import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SpecificScreen from './screens/SpecificScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import SigninScreen from './screens/SigninScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar
            bg="dark"
            variant="dark"
            fixed="top"
            style={{ marginTop: '0' }}
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>My App</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-5">
            <Routes>
              <Route path="/event/:slug" element={<SpecificScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">-All rights reserved-</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
