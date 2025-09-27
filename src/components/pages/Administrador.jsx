import { Col, Container, Row, ListGroup, Table } from "react-bootstrap";

const Administrador = () => {
  return (
    <Container>
      <h2>Administrador</h2>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item action active>Productos</ListGroup.Item>
            <ListGroup.Item action active>Usuarios</ListGroup.Item>
            <ListGroup.Item action active>Canchas de fútbol</ListGroup.Item>
            <ListGroup.Item action active>Turnos Canchas</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Administrador;
