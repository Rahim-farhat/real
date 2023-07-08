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
  faClock,
  faMapMarkerAlt,
  faMoneyBill1Wave,
  faPersonChalkboard,
  faScrewdriverWrench,
  faTrophy,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import marked from 'https://cdn.skypack.dev/marked@3.0.0';

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
                <Col xs={2} lg={1}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="iconSp" />
                </Col>
                <Col xs={10} lg={11}>
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
                <Col xs={2} lg={1}>
                  <FontAwesomeIcon icon={faUser} className="iconSp" />
                </Col>
                <Col xs={10} lg={11}>
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
                <Col xs={2} lg={1}>
                  <FontAwesomeIcon
                    icon={faArrowsDownToPeople}
                    className="iconSp"
                  />
                </Col>
                <Col xs={10} lg={11}>
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
                <Col xs={2} lg={1}>
                  <FontAwesomeIcon icon={faMoneyBill1Wave} className="iconSp" />
                </Col>
                <Col xs={10} lg={11}>
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
              <Button>Register</Button>
            </Row>
          </Col>
        </Row>
        <Row className="det">
          <h2>Details</h2>
          <p>
            If you want to create CSS 3D Text Effects and looking for good 3D
            Text effects for it then you are in the right place. Here I have
            created a lot of 3D text animation collections. These CSS 3D Text
            Effects Examples are the best examples of the Internet. Here I have
            shared the design of 3D Text CSS with the apples. We have given the
            required source code and live preview. There are different types of
            3D text effects here. Some CSS 3D Text Animation Effects are made by
            basic code again made by some 3D Text Animation CSS Basic Code. If
            you know basic HTML and CSS, you can easily create these CSS 3D Text
            Effects.
          </p>
        </Row>
        <Row className="det">
          <h2>FAQ</h2>
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          ></div>
        </Row>
        <Row className="midSp">
          {event.types.map((type) => (
            <Row key={type} className="m-0">
              <Col xs={12} md={4} className="type">
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
                  <FontAwesomeIcon icon={faPersonChalkboard} className="icon" />
                )}
              </Col>
              <Col className="typedet" md={8}>
                <h3>details</h3>
              </Col>
            </Row>
          ))}
        </Row>
        <Row>
          <section className="Features">
            <div className="bloc">
              <img
                className="log"
                src="data:image/png;base64,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"
              />
              <div className="text">
                <h2 className="logotitle">Robotics</h2>
              </div>
            </div>
            <div className="vl"></div>
            <div className="bloc">
              <img
                className="log"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFAklEQVR4nO2cOyw0XxTAhxWJt3xY70eoROWRoKIjQUulQb0KFY2KRGdDVAqiQSLxbukVGnSCeBZCY8Muu+efM//4snct36ydmXvuzPklNxKxd865v9l77849SwOGFJrsABgRFkIMFkIMFkIMFkJVSDAYhLm5OWhtbYWsrCzQNI2bZt0Y4Bi3tbXB/Py8PvaCkNvbW2hsbGQBmpybsKmpCe7u7v4XgnZYhib9ZmxuboZQKAQaTlOyg+Gm6WOwsLAAGq4Z0QPS19enT2GMtdzc3EBvb68w9u3t7aBlZ2cLv8Q/ZOzh+vpaGPucnBz8KU4ZjL3Ema5ZiExYCDFYCDFYCDFYiGpCuGmyx0B6ANw0FgKEbwTpAXDTfhDC2Ms/3yGMvbAQYrAQYrAQYrAQYrAQYrhSSCgUAqq4Tsjm5iYUFhYCHlWvrKwANVwlJBAIwJ8/f/7mVlBQAOFwGCjhKiGLi4tCbiUlJUANVwlpaWkRchsdHQVquEbI0dHRl2RPTk6AGq4RMjQ0JOTV2dkJFHGFkOfn5y8V/Gtra0ARVwiZnZ0VciouLhZK/inhCiENDQ1CThMTE0AVxws5ODgQ8klNTYWLiwugiuOF9Pf3C/lghTllSAl5f3+Hl5cX0/p7eHiA9PR0IZ+dnR2gDAkhb29vMDMzA16vFzweD4yNjZnS79TUlJBLdXU1fHx8GHrt0tIS5OfnQ1FRkR4bxugKIRsbG1BbW/slkPPz86T6xYFHAdF9oiCjT4Njt8kYI8bqWCHHx8f6h7M4AUBaWtrfLz3+FpyaovvEqQunMKNCcnNz48aGMWPsjhGCgzIyMqLvduIljAOB00Wy9MZ8PWxgYCCh16+vr38rBWPHHIwKJikE7zr8gJaXl/dtkoODg3B/f5/0ta6urvS1KLr/w8PDhPt5fHwEn8/3pa/PhtPa5OQkvL6+glJCtre3oa6uLm5SVkwD4+PjQv/19fUQiUR+3d/Z2Rl0d3d/G39lZSUsLy8ndQ1bhJyenkJXV9c/EzGTYDCoPxqJvo7f71fmxrJEiIy3+ierq6vCtTIyMuDp6QlUmXpNF7K3tydlMfwkduc2PDwMVmBkc4JjIV1IRUWFLevEd3N9SkqKcF08mLKSn9aX8vLyhNcV04XguiBLiM/nE66JR7ZW89M6iTendCH7+/tSpqxAIKA/6oi+HhY1WIWRKQvHwrWL+mJMRQnKMfNBpbKLuqz9e4sNFSXKbnvtTuTI4ooSOz9P2SLE6rf6kEUVJY59dJLoYri1tZVQRUlmZqbQB344NKMG2NEPFxN5/F5aWmq4H7/fb0lFCZaZWrVOkBTy0wGVUSGRSER/cGhFRUmsEMcfUMU7wsVBKCsr0zcBv6ko8Xg8cHl5aUpMOG1iLBiTq45w3VRR4mghD3EqSnZ3d0F1lBUyFVNRUlVVZbiihDJKCgmHw1BTUyPEOT09DU5ASSE7SVSUUEdJIT09PUlVlFBGOSFXJlWUUEU5IeMmV5RQQykhQQsrSqiglJBViytKKKCUkI6ODlsqSmSijJAzCRUlMlBGiE9CRYkMlBHi9XptqyiRiRJCIpGIsLvCfyCDZT9ORAkhn+cTeDaBzeh5iYooI8QtsBBisBBisBBisBBisBBisBBisBBisBBisBBisBBisBDVhHDTZI+B9AC4aSwECN8I0gPgpkWNgexFjRFhIcRgIcRgIcRgIcRgIUCL/wCMCRKINY9TmQAAAABJRU5ErkJggg=="
              />
              <div className="text">
                <h2 className="logotitle">Coding</h2>
              </div>
            </div>
            <div className="vl"></div>
            <div className="bloc">
              <img
                className="log"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFAklEQVR4nO2cOyw0XxTAhxWJt3xY70eoROWRoKIjQUulQb0KFY2KRGdDVAqiQSLxbukVGnSCeBZCY8Muu+efM//4snct36ydmXvuzPklNxKxd865v9l77849SwOGFJrsABgRFkIMFkIMFkIMFkJVSDAYhLm5OWhtbYWsrCzQNI2bZt0Y4Bi3tbXB/Py8PvaCkNvbW2hsbGQBmpybsKmpCe7u7v4XgnZYhib9ZmxuboZQKAQaTlOyg+Gm6WOwsLAAGq4Z0QPS19enT2GMtdzc3EBvb68w9u3t7aBlZ2cLv8Q/ZOzh+vpaGPucnBz8KU4ZjL3Ema5ZiExYCDFYCDFYCDFYiGpCuGmyx0B6ANw0FgKEbwTpAXDTfhDC2Ms/3yGMvbAQYrAQYrAQYrAQYrAQYrhSSCgUAqq4Tsjm5iYUFhYCHlWvrKwANVwlJBAIwJ8/f/7mVlBQAOFwGCjhKiGLi4tCbiUlJUANVwlpaWkRchsdHQVquEbI0dHRl2RPTk6AGq4RMjQ0JOTV2dkJFHGFkOfn5y8V/Gtra0ARVwiZnZ0VciouLhZK/inhCiENDQ1CThMTE0AVxws5ODgQ8klNTYWLiwugiuOF9Pf3C/lghTllSAl5f3+Hl5cX0/p7eHiA9PR0IZ+dnR2gDAkhb29vMDMzA16vFzweD4yNjZnS79TUlJBLdXU1fHx8GHrt0tIS5OfnQ1FRkR4bxugKIRsbG1BbW/slkPPz86T6xYFHAdF9oiCjT4Njt8kYI8bqWCHHx8f6h7M4AUBaWtrfLz3+FpyaovvEqQunMKNCcnNz48aGMWPsjhGCgzIyMqLvduIljAOB00Wy9MZ8PWxgYCCh16+vr38rBWPHHIwKJikE7zr8gJaXl/dtkoODg3B/f5/0ta6urvS1KLr/w8PDhPt5fHwEn8/3pa/PhtPa5OQkvL6+glJCtre3oa6uLm5SVkwD4+PjQv/19fUQiUR+3d/Z2Rl0d3d/G39lZSUsLy8ndQ1bhJyenkJXV9c/EzGTYDCoPxqJvo7f71fmxrJEiIy3+ierq6vCtTIyMuDp6QlUmXpNF7K3tydlMfwkduc2PDwMVmBkc4JjIV1IRUWFLevEd3N9SkqKcF08mLKSn9aX8vLyhNcV04XguiBLiM/nE66JR7ZW89M6iTendCH7+/tSpqxAIKA/6oi+HhY1WIWRKQvHwrWL+mJMRQnKMfNBpbKLuqz9e4sNFSXKbnvtTuTI4ooSOz9P2SLE6rf6kEUVJY59dJLoYri1tZVQRUlmZqbQB344NKMG2NEPFxN5/F5aWmq4H7/fb0lFCZaZWrVOkBTy0wGVUSGRSER/cGhFRUmsEMcfUMU7wsVBKCsr0zcBv6ko8Xg8cHl5aUpMOG1iLBiTq45w3VRR4mghD3EqSnZ3d0F1lBUyFVNRUlVVZbiihDJKCgmHw1BTUyPEOT09DU5ASSE7SVSUUEdJIT09PUlVlFBGOSFXJlWUUEU5IeMmV5RQQykhQQsrSqiglJBViytKKKCUkI6ODlsqSmSijJAzCRUlMlBGiE9CRYkMlBHi9XptqyiRiRJCIpGIsLvCfyCDZT9ORAkhn+cTeDaBzeh5iYooI8QtsBBisBBisBBisBBisBBisBBisBBisBBisBBisBBisBDVhHDTZI+B9AC4aSwECN8I0gPgpkWNgexFjRFhIcRgIcRgIcRgIcRgIUCL/wCMCRKINY9TmQAAAABJRU5ErkJggg=="
              />
              <div className="text">
                <h2 className="logotitle">
                  Renewable<h2 className="logotitle">Energy</h2>
                </h2>
              </div>
            </div>
            <div className="vl"></div>
            <div className="bloc">
              <img
                className="log"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKElEQVR4nO2bUU7DMBBE56uXaPkD7kA5XykcBVX9olwAKzehfIFEuYBRJEeKoro0TWzPhnmSpTpdabMre6qJG0AIIYQQQkTwYbDG0ePVwP7MADwB+Gg1cA9gHb4rHUfPY6uA7nggiKNnH276rnVt2VoRpePM6p7vXC8VR8ECwAbAz4ltwz7qe98CuCnRvC+CBow16lrmORu4CYlfcicemfred6GW55yJm207h32uQi3fOZNSirKletTAgaiBA1EDB6IG9uSYSfeYDj71w4eYSZ8KyR8+dE36VBs4+sOH2Ir7q4EVAEc8j9XZnQ9eKJc20AF4I57H6uzOR9tpzRZeRhJap13Pffj8PmaC9T/8EVmNmWAWmtisxL4aWJpzNbBZeavUZyh9NbA0fTUwOVPdwsmQE8nsRCrDGkjhRJxhDaRwItagcyLWoHMilVENpHEizqgG0jgRa9A5EWvQOZHKsAZSOBFnWAN1JnIBdE7EGnROpDKugcWdiDOqgTROxBp0TsQadE6kMqqBNE7EGdfA5Ex1CydDZyKFz0Qqsjm9E3Fk/4XRmUhi6JyINeREBiInMjUnYg06J2INOZGBqIHWGngICRewT5HXXbch6c54E+t7fw211C+RZ+MWwGfk59/qK//XyMw8vCbfbGeL4xBWXvbmXSrK/kxLmDqOnn3nECp2WFMqjp71iW2zIoijZ3bE+h2zSKXiTOHP1J9ScfR4NVAIIYQQAmz8AnMAd1rgLvCIAAAAAElFTkSuQmCC"
              />
              <div className="text">
                <h2 className="logotitle">Electronics</h2>
              </div>
            </div>
            <div className="vl"></div>
            <div className="bloc">
              <img
                className="log"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADVElEQVR4nO2av2sUQRTHPwSMF7FQQxAPMRoI2CpGDWIjVpI05/9gJaiFRRpjKcQzWNoGtBCx0NJGC0URGxEE4Qqbu8JrjMGomBtZeAvDcDv742bvds75wuPu9t68efPdN+/N7CwEBCShBqwDHUB5Km3gnowlN9YrMABX0ixCQEcaL+AvzmiRkBtKxHcUHocKBBAiQHlSHWzZ3vkUWPcs2zsnoFPB6mDL9s4JUBXNDc79VQ4NFg3pUfmbyWBVJcnfShCQFV4QkAdFCXDRRyCACkRAW9qczqB71lLSvI2AZoG5vDZCf50brAkJcSTYJNK5C+weJwLSbJRhc2DbKhBAKREwZ4mA6L+xjYAp4DawrdmYEYl/b4vOVAX8xaXBZaCltf0unx9F9GtKdJdH6K8zg4eBx1qbL8Al4IhByFcJ/wvAJ+368xzTolIETALXgC3R3ZLQ1ktbTEI8+Bi7pG0cET+lbc0nAlqi0wMeAvUEvaMi/VCXtj1tWpTlr3ODygjj6G7nxSFgQyNAlehvaQTEGX8TuClTIw2Tortp2PCSgDmJADMJJsFMgi+A4z4TEOMi8NmYFseMarFhKYPeE4Bk8VXJ6nF2vyWiX1vtk/HHgoCku52l5o8VATGWNL3ouw1jSYBrvUAAIQKoxBRoaDpp54dZnFvQ9Bol+OvM4CngpZHZe5LxZ3L2EWE/cB/4a9h8C5xz4G8qshqcBR5pa/ZoF7di1PwucAWYyNDHhOh2jbXBirZD7Emfs6MkYK/xhOcP8AA4aKn5H4BFSx8ngTeWtcEB4A7wS/7/LVGybxQEfNPuxhNg3mJrSdsi7whR05qtabm2I79bKWuDeemzZ/gyVAIU8Nq4ozaYS+E4xPXvSUvhJCyKD7pPWceRijSDtoxsQxTSzwynlVwr+lS4kcHf3FCuDRqId4hp4Z4V3hGAhHqh93hHSUA7x0nvsGA7UXZOQLPP/K2KrA2DgFqOk95hie1E2TkBviEQQIkRoIYUKf36ydp3IICQAwhJkAHmnQucB97LljmtpEVb3VfAiXGpAnXgR4Ha3pVtsvcE3BA77+QxVxr2aOeJ1x30X3gcbUdr/qdi52qONpelTdR2EBR967Tya/6y3zqt7Jo/rxR96zSA/wX/ABETbYcUim2kAAAAAElFTkSuQmCC"
              />
              <div className="text">
                <h2 className="logotitle">3D Printing</h2>
              </div>
            </div>
          </section>
        </Row>
      </Container>
    </div>
  );
}
export default SpecificScreen;
