import { Container, Row, Col, Card } from "react-bootstrap";

const Contacto = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center text-success display-6">
        Información de Contacto
      </h2>
      <Row className="g-4 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-telephone-fill display-4 text-secondary mb-3"></i>
              <Card.Title>Teléfono</Card.Title>
              <Card.Text>381 123 4567</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-envelope-fill display-4 text-danger mb-3"></i>
              <Card.Title>Email</Card.Title>
              <Card.Text>info@rollingcodeclub.com</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-whatsapp display-4 text-success mb-3"></i>
              <Card.Title>WhatsApp</Card.Title>
              <Card.Text>+54 9 381 123 4567</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-clock-fill display-4 text-warning mb-3"></i>
              <Card.Title>Horarios</Card.Title>
              <Card.Text>Lunes a Sabados: 18:30 a 00:30</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-geo-alt-fill display-4 text-info mb-3"></i>
              <Card.Title>Visítanos</Card.Title>
              <Card.Text>
                Gral. José María Paz 576, San Miguel de Tucumán, Tucumán
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-share-fill display-4 text-secondary mb-3"></i>
              <Card.Title>Redes Sociales</Card.Title>
              <Card.Text>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="me-3 text-info"
                >
                  <i className="bi bi-facebook display-6"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="me-3 text-danger"
                >
                  <i className="bi bi-instagram display-6"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="text-dark"
                >
                  <i className="bi bi-twitter-x display-6"></i>
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
