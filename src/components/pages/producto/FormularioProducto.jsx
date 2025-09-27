import { Container, Form, Row, Button } from "react-bootstrap";

const FormularioProducto = () => {
  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <Form>
          <h2 className="text-success text-center display-5">Cargar producto</h2>
          <Form.Group className="mb-3" controlId="nombreProducto">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del producto"
              className="bg-primary text-light"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="precioProducto">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio del producto"
              className="bg-primary text-light"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoriaProducto">
            <Form.Label>Categoría</Form.Label>
            <Form.Select className="bg-primary text-light">
              <option value="">Seleccionar</option>
              <option value="Indumentaria">Indumentaria</option>
              <option value="Articulos">Artículos para entrenar</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="subcategoriaProducto">
            <Form.Label>Tipo de Indumentaria</Form.Label>
            <Form.Select className="bg-primary text-light">
              <option value="">Seleccionar</option>
              <option value="Remera">Remera</option>
              <option value="Short">Short</option>
              <option value="Calzado">Calzado</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="imagenProducto">
            <Form.Label>Imagen del producto</Form.Label>
            <Form.Control type="file" className="bg-primary text-light" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción del producto"
              className="bg-primary text-light"
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="success" type="submit">
              Cargar producto
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default FormularioProducto;
