import { Col, Container, Row, ListGroup, Table } from "react-bootstrap";
import TablaProducto from "./producto/TablaProducto";
import TablaUsuario from "./usuario/TablaUsuario";


const Administrador = () => {
  return (
    <Container fluid className="my-4">
      <h2>Administrador</h2>
      <Row>
        <Col md={3} className="mb-3 mb-md-0">
          <ListGroup>
            <ListGroup.Item action active>Productos</ListGroup.Item>
            <ListGroup.Item action active>Usuarios</ListGroup.Item>
            <ListGroup.Item action active>Canchas de fútbol</ListGroup.Item>
            <ListGroup.Item action active>Turnos Canchas</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
          <TablaProducto />
            <TablaUsuario />

        </Col>
      </Row>
    </Container>
  );
};

export default Administrador;
