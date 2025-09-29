import { Container, Row,Col,Form, Button } from "react-bootstrap";

const Contacto = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Form className="p-4 border rounded bg-dark shadow-sm">
            <h2 className="mb-4 text-info text-center display-6">Contáctanos</h2>
            <Form.Group className="mb-3" controlId="nombreContacto">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" className="bg-primary text-light" required placeholder="Tu nombre" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="emailContacto">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                className="bg-primary text-light"
                required
                placeholder="ejemplo@mail.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefonoContacto">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" className="bg-primary text-light" required placeholder="Ej: 3811234567" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mensajeContacto">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                className="bg-primary text-light"
                required
                placeholder="¿En qué podemos ayudarte?"
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="info" type="submit">
                Enviar
              </Button>
            </div>
          </Form>
        </Col>
        <Col
          xs={12}
          md={6}
          lg={5}
          className="d-flex align-items-center justify-content-center mt-4 mt-md-0"
        >
          <div className="p-4 border rounded bg-info shadow-sm w-100 text-center text-black">
            <h4 className="mb-3 text-primary">¡Gracias por contactarnos!</h4>
            <p className="mb-0">
              Nos comunicaremos contigo lo antes posible, ya sea por correo
              electrónico o por teléfono.
              <br />
              Nuestro equipo responderá tu consulta a la brevedad.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
