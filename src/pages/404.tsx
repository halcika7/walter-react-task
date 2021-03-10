import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const NotFound = () => (
  <div data-testid="404">
    <Container>
      <Row>
        <Col>
          <div className="error-wrapper">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <p>Sorry, an error has occured, Requested page not found!</p>
            <div className="mt-3 mb-3">
              <Link to="/" className="btn btn-primary btn-lg">
                Take Me Home
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default NotFound;
