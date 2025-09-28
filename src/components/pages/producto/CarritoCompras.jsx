import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ListGroup,
  Alert,
} from "react-bootstrap";

const CarritoCompras = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col xs={12} md={8}>
          <h2 className="mb-4 display-5">Carrito de Compras</h2>

          <Alert variant="info">No hay productos en el carrito.</Alert>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>remera nike</td>
                <td>$500</td>
                <td>
                  <Button size="sm" variant="secondary">
                    -
                  </Button>
                  <span className="mx-2">cantidad</span>
                  <Button size="sm" variant="secondary">
                    +
                  </Button>
                </td>
                <td>precio*cantidad</td>
                <td>
                  <Button size="sm" variant="danger">
                    <i class="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col xs={12} md={4}>
          <div
            className="p-3 border rounded shadow-sm sticky-top"
            style={{ top: 80 }}
          >
            <h4>Resumen</h4>
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
              >
                <span>precio * cantidad</span>
                <span>$precio*cantidad</span>
              </ListGroup.Item>

              <ListGroup.Item className="fw-bold d-flex justify-content-between align-items-center">
                <span>Total</span>
                <span>$total</span>
              </ListGroup.Item>
            </ListGroup>
            <Button variant="success" className="w-100" size="lg">
              Pagar
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarritoCompras;
