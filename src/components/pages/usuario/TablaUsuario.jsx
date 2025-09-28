import { Table, Button } from "react-bootstrap";

const TablaUsuario = () => {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 className="text-warning display-6">Usuarios</h2>
    <Button className="btn-outline-warning">Agregar Usuario (+)</Button>
    </div>
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
    </>
  );
};

export default TablaUsuario;
