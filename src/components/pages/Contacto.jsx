import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "./contacto.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
    Swal.fire({
      title: "Mensaje enviado exitosamente",
      text: "Gracias por contactarnos. Te responderemos pronto.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#198754",
      background: "#212529",
      color: "#fff",
    });
    reset();
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h2 className="text-success display-6 me-3">Información de Contacto</h2>
        <Button variant="success" onClick={handleShow}>
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
          <a
            href="mailto:info@rollingcodeclub.com"
            className="text-decoration-none"
          >
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
          <a
            href="https://wa.me/+5493811234567"
            target="_blank"
            className="text-decoration-none"
          >
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
          <a
            href="https://maps.google.com/?q=Gral.+José+María+Paz+576,+San+Miguel+de+Tucumán,+Tucumán"
            target="_blank"
            className="text-decoration-none"
          >
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="nombreContacto">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                {...register("nombreContacto", {
                  required: "El nombre es requerido",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "El nombre no puede superar los 50 caracteres",
                  },
                })}
                required
                minLength={3}
                maxLength={50}
                className="bg-primary text-white"
              />
              {errors.nombreContacto && (
                <Form.Text className="text-danger mt-1">
                  {errors.nombreContacto.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="mailContacto">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                {...register("mailContacto", {
                  required: "El email es requerido",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message: "El email debe tener un formato válido",
                  },
                })}
                required
                className="bg-primary text-white"
                minLength={10}
                maxLength={100}
              />
              {errors.mailContacto && (
                <Form.Text className="text-danger mt-1">
                  {errors.mailContacto.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="whatsappContacto">
              <Form.Label>WhatsApp</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Ingresa tu número de WhatsApp (opcional)"
                {...register("whatsappContacto")}
                className="bg-primary text-white"
                minLength={7}
                maxLength={15}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mensajeContacto">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa tu mensaje"
                {...register("mensajeContacto", {
                  required: "El mensaje es requerido",
                  minLength: {
                    value: 15,
                    message: "El mensaje debe tener al menos 15 caracteres",
                  },
                  maxLength: {
                    value: 250,
                    message: "El mensaje no puede superar los 250 caracteres",
                  },
                })}
                required
                minLength={15}
                maxLength={250}
                className="bg-primary text-white"
              />
              {errors.mensajeContacto && (
                <Form.Text className="text-danger mt-1">
                  {errors.mensajeContacto.message}
                </Form.Text>
              )}
            </Form.Group>
            <Button variant="success" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Contacto;
