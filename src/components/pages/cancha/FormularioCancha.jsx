import { Container, Row, Form, Button } from "react-bootstrap";

const FormularioCancha = () => {
  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <Form>
          <h2 className="text-info text-center display-5">Cargar Cancha</h2>
          <Form.Group className="mb-3" controlId="nombreCancha">
            <Form.Label>Nombre de Cancha</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la cancha"
              className="bg-primary text-light"
              required
              minLength={2}
              maxLength={100}
            />
            <Form.Text className="text-danger">
              El nombre de la cancha es obligatorio
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
          <Form.Group className="mb-3" controlId="precioCancha">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio de la cancha"
              className="bg-primary text-light"
              step={1}
              required
              min={50}
              max={1000000}
            />
            <Form.Text className="text-danger">
              El precio de la cancha es obligatorio
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="horariosCancha">
            <Form.Label>Horarios</Form.Label>
            <div className="d-flex flex-wrap gap-3">
              <Form.Check
                type="checkbox"
                id="horario-18:30-20:00"
                label="18:30-20:00"
                value="18:30-20:00"
                name="horarios"
                className="text-light"
              />
              <Form.Check
                type="checkbox"
                id="horario-20:00-21:30"
                label="20:00-21:30"
                value="20:00-21:30"
                name="horarios"
                className="text-light"
              />
              <Form.Check
                type="checkbox"
                id="horario-21:30-23:00"
                label="21:30-23:00"
                value="21:30-23:00"
                name="horarios"
                className="text-light"
              />
              <Form.Check
                type="checkbox"
                id="horario-23:30-00:30"
                label="23:30-00:30"
                value="23:30-00:30"
                name="horarios"
                className="text-light"
              />
            </div>
            <Form.Text className="text-danger">
              Debe seleccionar al menos un horario
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="imagenCancha">
            <Form.Label>Imagen de la cancha</Form.Label>
            <Form.Control
              type="file"
              className="bg-primary text-light"
              required
            />
            <Form.Text className="text-danger">
              La imagen de la cancha es obligatoria
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionCancha">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción de la cancha"
              className="bg-primary text-light"
              minLength={10}
              maxLength={500}
            />
            <Form.Text className="text-danger">
              La descripción de la cancha es obligatoria
            </Form.Text>
          </Form.Group>
          <div className="d-grid">
            <Button variant="info" type="submit">
              Cargar cancha
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default FormularioCancha;
