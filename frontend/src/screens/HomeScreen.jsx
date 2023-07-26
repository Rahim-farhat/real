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
//import Button from 'react-bootstrap/Button';
import {
  faMapMarkerAlt,
  //faPersonChalkboard,
  //faScrewdriverWrench,
  //faTrophy,
  faUser,
  //faCircleChevronRight,
  faArrowsDownToPeople,
} from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../../components/imageFull';
import { getDaysLeft } from '../../components/daysleft';

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
        const response = await axios.get(
          'https://calm-moth-sweater.cyclic.app/api/events'
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    fetchData();
  }, []);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  useEffect(() => {
    const slide = () => {
      var slides = document.querySelectorAll('.slide');

      for (var i = 0; i < slides.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = slides[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          slides[i].classList.add('active');
        }
      }
    };

    window.addEventListener('scroll', slide);

    return () => {
      window.removeEventListener('scroll', slide);
    };
  }, []);

  useEffect(() => {
    const typanim = () => {
      var typanims = document.querySelectorAll('.typanim');

      for (var i = 0; i < typanims.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = typanims[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          typanims[i].classList.add('active');
        } else {
          typanims[i].classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', typanim);

    return () => {
      window.removeEventListener('scroll', typanim);
    };
  }, []);

  useEffect(() => {
    const reveal = () => {
      var reveals = document.querySelectorAll('.reveal');

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };

    window.addEventListener('scroll', reveal);

    return () => {
      window.removeEventListener('scroll', reveal);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>Eventassium</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="events">
          {events
            .sort((a, b) => {
              const dateA = new Date(a.year, a.start_m - 1, a.start_d);
              const dateB = new Date(b.year, b.start_m - 1, b.start_d);
              return dateA - dateB;
            })
            .map((event) => (
              <Container fluid key={event.slug}>
                <Row xs={2} md={4} lg={6}>
                  <div className="categories overflow-hidden" key={event.slug}>
                    {event.categories.map((category) => (
                      <p className="category slide" key={category}>
                        {category}
                      </p>
                    ))}
                  </div>
                </Row>

                <div className="event up" key={event.slug}>
                  <span className="ribbon">
                    {getDaysLeft(event.start_d, event.start_m, event.year)}
                  </span>
                  <Row className="text-decoration-none">
                    <h1 className="title">{event.name}</h1>
                  </Row>
                  <Row>
                    <Col
                      xs={7}
                      sm={6}
                      md={6}
                      lg={5}
                      xl={5}
                      xxl={4}
                      className="d-flex align-items-center"
                    >
                      <div className="mx-0">
                        <ModalComponent
                          imageUrl={event.image}
                          altText={event.name}
                        />
                      </div>
                    </Col>
                    <Col
                      xs={5}
                      sm={6}
                      md={6}
                      lg={7}
                      xl={7}
                      xxl={9}
                      className="ev-details"
                    >
                      <Row>
                        <div className="outitle">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="outicon"
                          />
                          <h6 className="outinfotitle">Location</h6>
                        </div>
                        <Row>
                          <h6 className="info reveal">{event.where}</h6>
                        </Row>
                      </Row>
                      <Row>
                        <div className="outitle">
                          <FontAwesomeIcon icon={faUser} className="outicon" />
                          <h6 className="outinfotitle">Organized by</h6>
                        </div>
                        <Row>
                          <h6 className="info reveal">{event.owner}</h6>
                        </Row>
                      </Row>
                      <Row>
                        <div className="outitle">
                          <FontAwesomeIcon
                            icon={faArrowsDownToPeople}
                            className="outicon"
                          />
                          <h6 className="outinfotitle">Target</h6>
                        </div>
                        <Row>
                          <h6 className="info reveal">{event.target}</h6>
                        </Row>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="middle">
                    <Col className="date month">
                      {getDaysLeft(event.start_d, event.start_m, event.year)}
                    </Col>
                    <Col className="date">
                      {event.start_d === event.end_d ? (
                        <div className="day">{event.start_d}</div>
                      ) : (
                        <div className="day">
                          {event.start_d}-{event.end_d}
                        </div>
                      )}

                      {event.start_m === event.end_m ? (
                        <div className="month">{months[event.start_m - 1]}</div>
                      ) : (
                        <div className="month">
                          {months[event.start_m - 1]}/{months[event.end_m - 1]}
                        </div>
                      )}

                      <div className="year">{event.year}</div>
                    </Col>
                    <Col>
                      <Link
                        to={`/event/${event.slug}`}
                        className="text-decoration-none "
                      >
                        <button className="learn-more dot">
                          <span className="circlemore" aria-hidden="true">
                            <span className="icon arrow"></span>
                          </span>
                          <span className="button-text">Learn More</span>
                        </button>
                        {/*
                        <Button className="seeMoreBt">
                          <div className="seeMore">
                            <Col xs={8}>
                              <h6 className="mt-2">See More</h6>
                            </Col>
                            <Col xs={4}>
                              <FontAwesomeIcon
                                icon={faCircleChevronRight}
                                className="icon"
                              />
                            </Col>
                          </div>
                        </Button>*/}
                      </Link>
                    </Col>
                  </Row>

                  <Row className="mid">
                    {event.types.map((type) => (
                      <span className="typanim" key={type}>
                        {type}
                      </span>
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
export default HomeScreen;
