import { Table, Button } from "react-bootstrap";

const TablaUsuario = () => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Mail</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>JosePerez</td>
          <td>joseperez@mail.com</td>
          <td>
            <Button size="sm" variant="success">Activo</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TablaUsuario;
