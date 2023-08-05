import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../../components/loadingBox';
import MessageBox from '../../components/messageBox';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPersonChalkboard,
  faScrewdriverWrench,
  faTrophy,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function CategoryScreen() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://real-rahim-farhat.vercel.app/api/events/search',
          {
            params: { category },
          }
        );
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching events.');
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div>
      <Helmet>
        <title>{`${category} Events`}</title>
      </Helmet>
      <h3 className="categotitle">{`${category} Events`}</h3>
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
                <Link
                  to={`/event/${event.slug}`}
                  className="text-decoration-none"
                >
                  <Row className="up">
                    <Col xs={2} className="d-flex align-items-center">
                      <div className="mx-auto">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="image"
                        />
                      </div>
                    </Col>
                    <Col xs={8} className="ev-details">
                      <Row className="text-decoration-none">
                        <h1 className="title">{event.name}</h1>
                      </Row>

                      <Row className="location">
                        <Col xs={2} sm={1}>
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="icon"
                          />
                        </Col>
                        <Col xs={10} sm={11}>
                          <h6 className="ml-2">{event.where}</h6>
                        </Col>
                      </Row>

                      <Row className="location">
                        <Col xs={2} sm={1}>
                          <FontAwesomeIcon icon={faUser} className="icon" />
                        </Col>
                        <Col xs={10} sm={11}>
                          <h6 className="ml-2">{event.owner}</h6>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={2} className="date">
                      {event.start_d === event.end_d ? (
                        <div className="day">{event.start_d}</div>
                      ) : (
                        <div className="day">
                          {event.start_d}-{event.end_d}
                        </div>
                      )}

                      {event.start_m === event.end_m ? (
                        <div className="month">{event.start_m}</div>
                      ) : (
                        <div className="month">
                          {event.start_m}/{event.end_m}
                        </div>
                      )}

                      <div className="year">{event.year}</div>
                    </Col>
                  </Row>
                </Link>
                <Row className="mid">
                  {event.types.map((type) => (
                    <Col className="type" key={type}>
                      {type}
                      {type === 'competition' && (
                        <FontAwesomeIcon icon={faTrophy} className="icon" />
                      )}
                      {type === 'workshops' && (
                        <FontAwesomeIcon
                          icon={faScrewdriverWrench}
                          className="icon"
                        />
                      )}
                      {type === 'presentation' && (
                        <FontAwesomeIcon
                          icon={faPersonChalkboard}
                          className="icon"
                        />
                      )}
                    </Col>
                  ))}
                </Row>
              </div>
            </Container>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryScreen;
