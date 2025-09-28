import { Col, Container, Form, Row } from "react-bootstrap";

const FormularioTurnos = () => {
  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <Col>
          <Form>
            <h2 className="text-success text-center display-5">Cargar Turno</h2>
            <Form.Group className="mb-3" controlId="fechaTurno">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                className="bg-primary text-light"
                required
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioTurnos;
