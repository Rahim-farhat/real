import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import LoadingBox from '../../components/loadingBox';
import MessageBox from '../../components/messageBox';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsDownToPeople,
  faCircleInfo,
  faClipboardQuestion,
  faClock,
  faHandshake,
  faImages,
  faMapLocationDot,
  faMapMarkerAlt,
  faMoneyBill1Wave,
  faTimeline,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import marked from 'https://cdn.skypack.dev/marked@3.0.0';
import ModalComponent from '../../components/imageFull';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, event: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function SpecificScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, event }, dispatch] = useReducer(reducer, {
    event: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get(
          `https://calm-moth-sweater.cyclic.app/api/events/slug/${slug}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    fetchData();
  }, [slug]);
  const markdown = `${event.faq}`;

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{event.name}</title>
      </Helmet>
      <Container fluid>
        <Row className="head">
          <h1 className="titleSp">{event.name}</h1>
        </Row>
        <Row className="mainimg">
          <img src={event.image} alt={event.name} />
        </Row>
        <Row className="topSp">
          <Col md={10} className="left">
            <Row className="infoline">
              <Row>
                <Col xs={3} lg={1}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="iconSp" />
                </Col>
                <Col xs={9} lg={11}>
                  <h6 className="infotitle">Location</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6 className="info">{event.where}</h6>
                </Col>
              </Row>
            </Row>
            <Row className="infoline">
              <Row>
                <Col xs={3} lg={1}>
                  <FontAwesomeIcon icon={faUser} className="iconSp" />
                </Col>
                <Col xs={9} lg={11}>
                  <h6 className="infotitle">Organized by</h6>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h6 className="info">{event.owner}</h6>
                </Col>
              </Row>
            </Row>
            <Row className="infoline">
              <Row>
                <Col xs={3} lg={1}>
                  <FontAwesomeIcon
                    icon={faArrowsDownToPeople}
                    className="iconSp"
                  />
                </Col>
                <Col xs={9} lg={11}>
                  <h6 className="infotitle">Target</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6 className="info">{event.target}</h6>
                </Col>
              </Row>
            </Row>
            <Row className="infoline">
              <Row>
                <Col xs={3} lg={1}>
                  <FontAwesomeIcon icon={faMoneyBill1Wave} className="iconSp" />
                </Col>
                <Col xs={9} lg={11}>
                  <h6 className="infotitle">Pricing</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6 className="info">{event.price}</h6>
                </Col>
              </Row>
            </Row>
          </Col>
          <Col md={2} className="right">
            <Row className="dateSp">
              {event.start_d === event.end_d ? (
                <div className="daySp">{event.start_d}</div>
              ) : (
                <div className="daySp">
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
            </Row>
            <Row className="time">
              <Col xs={3} sm={3}>
                <FontAwesomeIcon icon={faClock} className="icon" />
              </Col>
              <Col xs={9} sm={9}>
                <h6 className="ml-2 ">{event.time}</h6>
              </Col>
            </Row>
            <Row className="register">
              <a
                href={event.register}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Register</Button>
              </a>
            </Row>
          </Col>
        </Row>
        <Row className="det">
          <Row>
            <div className="pich">
              <FontAwesomeIcon icon={faCircleInfo} className="BigiconSp" />
              <h2 className="Biginfotitle">Details</h2>
            </div>
          </Row>

          <p>{event.details}</p>
        </Row>
        <Row className="det">
          <Row>
            <div className="pich">
              <FontAwesomeIcon icon={faMapLocationDot} className="BigiconSp" />
              <h2 className="Biginfotitle">Map</h2>
            </div>
          </Row>

          <Row>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25498.690603299907!2d8.835013812935497!3d36.97790444763691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e4caa99b5afd43%3A0x82d5d6489207ccf5!2sBarkoukech%20Beach!5e0!3m2!1sen!2stn!4v1689178920597!5m2!1sen!2stn"
              className="map"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </Row>
        </Row>

        <Row className="det">
          <Row>
            <div className="pich">
              <FontAwesomeIcon icon={faTimeline} className="BigiconSp" />
              <h2 className="Biginfotitle">Timeline</h2>
            </div>
          </Row>
          <Row>
            <div className="timeleinespace">
              <ul className="timeline timeline-centered">
                {event.timeline.map((timeitem) => (
                  <li className="timeline-item" key={timeitem}>
                    <div className="timeline-info">
                      <span>{timeitem.t_when}</span>
                    </div>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h3 className="timeline-title">{timeitem.t_title}</h3>
                      <p>{timeitem.t_details}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Row>

        <Row className="det">
          <Row>
            <div className="pich">
              <FontAwesomeIcon icon={faImages} className="BigiconSp" />
              <h2 className="Biginfotitle">Gallery: {event.images.length}</h2>
            </div>
          </Row>

          <Row className="scroll-container">
            {event.images.map((image) => (
              <div key={image} className="gallery-col">
                <ModalComponent
                  imageUrl={image}
                  altText={event.name}
                  className="galleryimg"
                />
              </div>
            ))}
          </Row>
        </Row>
        {markdown !== 'undefined' ? (
          <Row className="det">
            <Row>
              <div className="pich">
                <FontAwesomeIcon
                  icon={faClipboardQuestion}
                  className="BigiconSp"
                />
                <h2 className="Biginfotitle">FAQ</h2>
              </div>
            </Row>

            <div
              id="preview"
              dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            ></div>
          </Row>
        ) : null}
        <Row className="det">
          <Row>
            <div className="pich">
              <FontAwesomeIcon icon={faHandshake} className="BigiconSp" />
              <h2 className="Biginfotitle">Sponsored By</h2>
            </div>
          </Row>
          <div className="slider">
            <div className="slide-track">
              {event.sponsors.map((sponsor) => (
                <div className="slide" key={sponsor}>
                  <img src={sponsor} height="100" width="250" alt="" />
                </div>
              ))}
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}
export default SpecificScreen;
