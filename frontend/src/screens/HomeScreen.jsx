import { useReducer, useEffect, useState } from 'react';
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
  faAnglesUp,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../../components/imageFull';
import { getDaysLeft } from '../../components/daysleft';
import { getDaysLeftnumber } from '../../components/daysleftnumber';
import { GoogleDriveLink } from '../../components/googledrivelink';

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
          'https://eventassium.onrender.com/api/events'
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

  /*
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
  */
  const [sortingOption, setSortingOption] = useState('upcoming');

  const filterEvents = (event) => {
    const daysLeft = getDaysLeftnumber(
      event.start_d,
      event.start_m,
      event.year
    );
    if (sortingOption === 'upcoming') {
      return daysLeft > 0; // Filter upcoming events
    } else {
      return daysLeft <= 0; // Filter old events
    }
  };

  return (
    <div>
      <Helmet>
        <title>EventArk</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="events">
          <Row className="sorting-buttons">
            <Col xs={10} md={10}>
              <button
                className={`sorting-button ${
                  sortingOption === 'upcoming' ? 'active' : ''
                }`}
                onClick={() => setSortingOption('upcoming')}
              >
                <div className="picht">
                  <div>Upcoming</div>
                  <FontAwesomeIcon
                    icon={faAnglesUp}
                    className="outicon text-success"
                  />
                </div>
              </button>
            </Col>
            <Col xs={2} md={2}>
              <button
                className={`sorting-button ${
                  sortingOption === 'old' ? 'active' : ''
                }`}
                onClick={() => setSortingOption('old')}
              >
                <div className="picht">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="outicon text-danger"
                  />
                </div>
              </button>
            </Col>
          </Row>
          {events
            .filter(filterEvents) // Apply the filtering based on sorting option
            .sort((a, b) => {
              const dateA = new Date(a.year, a.start_m - 1, a.start_d);
              const dateB = new Date(b.year, b.start_m - 1, b.start_d);
              if (sortingOption === 'upcoming') {
                return dateA - dateB; // Sort upcoming events in ascending order
              } else {
                return dateB - dateA; // Sort old events in descending order (newest first)
              }
            })
            .map((event) => (
              <Container fluid key={event.slug} className="object">
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
                  {(() => {
                    const daysLeft = getDaysLeftnumber(
                      event.start_d,
                      event.start_m,
                      event.year
                    );

                    if (daysLeft > 0 && daysLeft <= 7) {
                      return <span className="ribbon">This week</span>;
                    } else if (daysLeft > 7 && daysLeft <= 30) {
                      return <span className="ribbon">This month</span>;
                    } else {
                      return null; // Don't render anything
                    }
                  })()}

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
                      <div className="mx-0 image-placeholder">
                        <ModalComponent
                          imageUrl={GoogleDriveLink({ link: event.image })}
                          alt="dominant color placeholder"
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
                      <Row className="d-none d-md-block">
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
                    <Col xs={12} md={4} className="date month">
                      {getDaysLeftnumber(
                        event.start_d,
                        event.start_m,
                        event.year
                      ) < 0 ? (
                        <div className="ended">Ended</div>
                      ) : (
                        <div></div>
                      )}
                      {getDaysLeft(event.start_d, event.start_m, event.year)}
                    </Col>
                    <Col xs={12} md={4} className="date">
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
                    <Col xs={12} md={4}>
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
