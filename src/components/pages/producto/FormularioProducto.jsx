import { Container, Form, Row } from "react-bootstrap";

const FormularioProducto = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Form>
          <h2>Cargar producto</h2>
          <Form.Group className="mb-3" controlId="nombreProducto">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del producto"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="precioProducto">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio del producto"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoriaProducto">
            <Form.Label>Categoría</Form.Label>
            <Form.Select>
              <option value="">Seleccionar</option>
              <option value="Indumentaria">Indumentaria</option>
              <option value="Articulos">Artículos para entrenar</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de Indumentaria</Form.Label>
            <Form.Select className="mb-3" controlId="subcategoriaProducto">
              <option value="">Seleccionar</option>
              <option value="Remera">Remera</option>
              <option value="Short">Short</option>
              <option value="Calzado">Calzado</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="imagenProducto">
            <Form.Label>Imagen del producto</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción del producto"
            />
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default FormularioProducto;
