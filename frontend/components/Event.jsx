import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPersonChalkboard,
  faScrewdriverWrench,
  faTrophy,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function Event(props) {
  const { event } = props;

  return (
    <Container fluid>
      <Row xs={2} md={4} lg={6}>
        <div className="categories">
          {event.categories.map((category) => (
            <p className="category" key={category}>
              {category}
            </p>
          ))}
        </div>
      </Row>

      <div className="event" key={event.slug}>
        <Link to={`/event/${event.slug}`} className="text-decoration-none">
          <Row className="up">
            <Col xs={9} className="ev-details">
              <Row className="text-decoration-none">
                <h1 className="title">{event.name}</h1>
              </Row>

              <Row className="location">
                <Col xs={2} sm={1}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
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

            <Col xs={3} className="date">
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
                <FontAwesomeIcon icon={faScrewdriverWrench} className="icon" />
              )}
              {type === 'presentation' && (
                <FontAwesomeIcon icon={faPersonChalkboard} className="icon" />
              )}
            </Col>
          ))}
        </Row>
        <Row className="down">
          <img className="image" src={event.image} alt={event.name} />
        </Row>
      </div>
    </Container>
  );
}

Event.propTypes = {
  event: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    where: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    start_d: PropTypes.string.isRequired,
    end_d: PropTypes.string.isRequired,
    start_m: PropTypes.string.isRequired,
    end_m: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Event;
