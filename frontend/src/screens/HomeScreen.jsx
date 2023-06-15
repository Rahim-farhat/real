import { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import data from '../data';
import axios from 'axios';
import LoadingBox from '../../components/loadingBox';
import MessageBox from '../../components/messageBox';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, events: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, events }, dispatch] = useReducer(reducer, {
    events: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>MyApp Obviously</title>
      </Helmet>
      <h1>Featured Events</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="events">
          {events.map((event) => (
            <Container fluid key={event.slug}>
              <Row xs={2} md={4} lg={6}>
                <div className="categories" key={event.slug}>
                  {event.categories.map((category) => (
                    <p className="category" key={category}>
                      {category}
                    </p>
                  ))}
                </div>
              </Row>

              <div className="event" key={event.slug}>
                <Row>
                  <Col sm={9}>
                    <Link
                      to={`/event/${event.slug}`}
                      className="text-decoration-none"
                    >
                      <h4 className="title">{event.name}</h4>
                    </Link>
                    <Row className="location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />

                      <h6 className="ml-2">{event.where}</h6>
                    </Row>
                    <Row className="owner">
                      <h5>Par:</h5>
                      <h6>{event.owner}</h6>
                    </Row>
                  </Col>
                  <Col sm={3} className="date">
                    <Row>
                      {event.start_d === event.end_d ? (
                        <div className="day">{event.start_d}</div>
                      ) : (
                        <Row>
                          <Col className="day">{event.start_d}</Col>
                          <Col className="day">-</Col>
                          <Col className="day">{event.end_d}</Col>
                        </Row>
                      )}
                    </Row>
                    <Row>
                      {event.start_m === event.end_m ? (
                        <div className="month">{event.start_m}</div>
                      ) : (
                        <Row>
                          <Col sm={1} className="month">
                            {event.start_d}
                          </Col>
                          <Col sm={1} className="month">
                            -
                          </Col>
                          <Col sm={1} className="month">
                            {event.end_d}
                          </Col>
                        </Row>
                      )}
                    </Row>
                    <div className="year">{event.year}</div>
                  </Col>
                </Row>
                <img src={event.image} alt={event.name} />
              </div>
            </Container>
          ))}
        </div>
      )}
    </div>
  );
}
export default HomeScreen;
