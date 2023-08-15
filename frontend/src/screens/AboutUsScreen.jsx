import { Container, Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
function AboutUsScreen() {
  return (
    <div className="about-us-container">
      <Helmet>
        <title>EventArk</title>
      </Helmet>
      <Container>
        <Row className="text-center">
          <Col>
            <h1 className="heading">About EventArk</h1>
            <Col className="tex-center">
              <div className="slogan-container">
                <p className="slogan">Every event in Tunisia</p>
                <img
                  src="https://em-content.zobj.net/thumbs/120/twitter/351/flag-tunisia_1f1f9-1f1f3.png"
                  className="flag"
                />
              </div>
            </Col>
            <p className="description">
              EventArk is your go-to platform for discovering every event in
              Tunisia. Our mission is to gather a diverse range of events under
              one roof, making it convenient for you to explore various fields
              such as entrepreneurship, technology, sports, and more. We are
              passionate about bringing you the latest updates on events that
              matter to you, all in one centralized hub.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3 className="sub-heading">Explore a Variety of Fields</h3>
            <p className="description">
              EventArk covers a wide spectrum of fields, ensuring that you never
              miss out on any event that aligns with your interests. Whether you
              are a tech enthusiast, a sports lover, or looking to network in
              the world of entrepreneurship, our platform has you covered. We
              believe in connecting individuals with events that matter to them,
              fostering a vibrant and engaged community.
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h3 className="sub-heading">Connect With Us</h3>
            <p className="description">
              Stay updated with EventArk through our social media channels:
            </p>
            <Button variant="outline-primary" className="social-button">
              Follow us on Facebook
            </Button>
            <Button variant="outline-info" className="social-button">
              Follow us on X
            </Button>
            <Button variant="outline-danger" className="social-button">
              Follow us on TikTok
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUsScreen;
