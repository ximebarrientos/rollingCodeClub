import { Table, Button } from "react-bootstrap";
import FilaUsuarioTabla from "./FilaUsuarioTabla";

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
        <FilaUsuarioTabla></FilaUsuarioTabla>
      </tbody>
    </Table>
    </>
  );
};

export default TablaUsuario;
