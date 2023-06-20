import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBox() {
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

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <Row>
        <Col sm={8}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby="button-search"
          />
        </Col>
        <Col sm={3}>
          <Button variant="success" type="submit" id="button-search">
            {isSmallScreen ? <FontAwesomeIcon icon={faSearch} /> : 'Search'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
