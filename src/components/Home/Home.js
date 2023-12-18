import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGlobe, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../../assets/styles/home.css';

const Home = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="dark-overlay"></div>
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6}>
              <h1>Welcome to Venture Vista</h1>
              <p>Discover amazing destinations and plan your next adventure with Venture Vista.</p>
              <Link to="/destinations">
                <Button className="button-home" variant="primary">Explore Destinations</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* About Us Section */}
      <div className="about-us-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>About Us</h2>
              <p>
                Venture Vista is your passport to extraordinary journeys. Our mission is to inspire
                and empower travelers to explore the world, connect with diverse cultures, and create
                unforgettable memories. With a curated list of destinations, personalized itineraries,
                and a user-centric approach, we are here to transform your travel aspirations into reality.
              </p>
              <Button className="button-home" variant="primary">Learn More</Button>
            </Col>
            <Col md={6}>
              <img src="/clip.png" 
              alt="About Us Clipart" 
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '18rem' }}
               />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
       <section className="features-section py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="mb-4">Features</h2>
            </Col>
          </Row>
          <Row>
            {/* Feature 1 */}
            <Col md={4} className="mb-4">
              <div className="feature p-4 border rounded">
                <FontAwesomeIcon icon={faUser} size="2x" className="mb-3"/>
                <h3 className="mb-3">User-Friendly Authentication</h3>
                <p>Hassle-free registration and login process.</p>
                <p>Secure authentication with Firebase.</p>
              </div>
            </Col>

            {/* Feature 2 */}
            <Col md={4} className="mb-4">
              <div className="feature p-4 border rounded">
                <FontAwesomeIcon icon={faGlobe} size="2x" className="mb-3" />
                <h3 className="mb-3">Discover Your Dream Destinations</h3>
                <p>Explore a curated list of destinations with beautiful images in the destination list.</p>
                <p>Dive deep into detailed information with destination descriptions for a comprehensive overview.</p>
              </div>
            </Col>

            {/* Feature 3 */}
            <Col md={4} className="mb-4">
              <div className="feature p-4 border rounded">
                <FontAwesomeIcon icon={faSearch} size="2x" className="mb-3" />
                <h3 className="mb-3">Effortless Destination Search</h3>
                <p>Utilize the powerful destination search tool to find the perfect spot for your next adventure.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className="footer-section py-4 bg-dark text-white">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Contact Us</h5>
              <p>Email: info@venturevista.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </Col>
            <Col md={4}>
              <h5>Follow Us</h5>
              <p>Stay connected with us on social media:</p>
            </Col>
            <Col md={4}>
              <h5>Connect with Us</h5>
              <div className="social-icons">
                <FontAwesomeIcon icon={faFacebook} size="2x" className="me-3" />
                <FontAwesomeIcon icon={faTwitter} size="2x" className="me-3" />
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
