import { Col, Container, Form, Row, Button } from "react-bootstrap";

const FormularioTurnos = () => {
  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <Col md={8} lg={6}>
          <Form>
            <h2 className="text-success text-center display-5">Cargar Turno</h2>
            <Form.Group className="mb-3" controlId="fechaTurno">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                className="bg-primary text-light"
                required
              />
              <Form.Text className="text-danger">
                La fecha del turno es obligatoria
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="categoriaCancha">
              <Form.Label>Categoría</Form.Label>
              <Form.Select className="bg-primary text-light">
                <option value="">Seleccionar</option>
                <option value="Futbol 5 techada">Futbol 5 techada</option>
                <option value="Futbol 5 sin techo">Futbol 5 sin techo</option>
                <option value="Futbol 7 techada">Futbol 7 techada</option>
                <option value="Futbol 7 sin techo">Futbol 7 sin techo</option>
              </Form.Select>
              <Form.Text className="text-danger">
                La categoría de la cancha es obligatoria
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="categoriaCancha">
              <Form.Label>Horario</Form.Label>
              <Form.Select className="bg-primary text-light">
                <option value="">Seleccionar</option>
                <option value="18:30-20:00">18:30-20:00</option>
                <option value="20:00-21:30">20:00-21:30</option>
                <option value="21:30-23:00">21:30-23:00</option>
                <option value="23:30-00:30">23:30-00:30</option>
              </Form.Select>
              <Form.Text className="text-danger">
                El horario del turno es obligatorio
              </Form.Text>
            </Form.Group>
            <div className="d-grid">
              <Button variant="success" type="submit">
                Reservar turno
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioTurnos;
