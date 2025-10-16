
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import "./contacto.css";
import { useState } from "react";

const Contacto = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    nombreContacto: '',
    mailContacto: '',
    mensajeContacto: ''
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Mensaje enviado exitosamente');
    setFormData({
      nombreContacto: '',
      mailContacto: '',
      mensajeContacto: ''
    });
    handleClose();
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h2 className="text-success display-6 me-3">
          Información de Contacto
        </h2>
        <Button variant="outline-success" onClick={handleShow}>
          Contactanos
        </Button>
      </div>
      <Row className="g-4 justify-content-center cajaCardContacto">
        <Col xs={12} md={6} lg={4}>
          <a href="tel:3811234567" className="text-decoration-none">
            <Card className="h-100 text-center bg-primary cardContacto">
              <Card.Body>
                <i className="bi bi-telephone-fill display-4 text-secondary mb-3"></i>
                <Card.Title>Teléfono</Card.Title>
                <Card.Text>381 123 4567</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <a href="mailto:info@rollingcodeclub.com" className="text-decoration-none">
            <Card className="h-100 text-center bg-primary cardContacto">
              <Card.Body>
                <i className="bi bi-envelope-fill display-4 text-danger mb-3"></i>
                <Card.Title>Email</Card.Title>
                <Card.Text>info@rollingcodeclub.com</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <a href="https://wa.me/+5493811234567" target="_blank" className="text-decoration-none">
            <Card className="h-100 text-center bg-primary cardContacto">
              <Card.Body>
                <i className="bi bi-whatsapp display-4 text-success mb-3"></i>
                <Card.Title>WhatsApp</Card.Title>
                <Card.Text>+54 9 381 123 4567</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 text-center bg-primary cardContacto">
            <Card.Body>
              <i className="bi bi-clock-fill display-4 text-warning mb-3"></i>
              <Card.Title>Horarios</Card.Title>
              <Card.Text>Lunes a Sabados: 18:30 a 00:30</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <a href="https://maps.google.com/?q=Gral.+José+María+Paz+576,+San+Miguel+de+Tucumán,+Tucumán" target="_blank" className="text-decoration-none">
            <Card className="h-100 text-center bg-primary cardContacto">
              <Card.Body>
                <i className="bi bi-geo-alt-fill display-4 text-info mb-3"></i>
                <Card.Title>Visítanos</Card.Title>
                <Card.Text>
                  Gral. José María Paz 576, San Miguel de Tucumán, Tucumán
                </Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 text-center bg-primary cardContacto">
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
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contactanos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nombreContacto">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                name="nombreContacto"
                value={formData.nombreContacto}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mailContacto">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                name="mailContacto"
                value={formData.mailContacto}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mensajeContacto">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa tu mensaje"
                name="mensajeContacto"
                value={formData.mensajeContacto}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Contacto;
