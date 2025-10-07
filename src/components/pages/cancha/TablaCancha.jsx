import { Table, Button, Badge } from "react-bootstrap";
import FilaCanchaTabla from "./FilaCanchaTabla";

const TablaCancha = () => {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 className="text-info display-6">Canchas</h2>
    <Button className="btn-outline-info">Agregar Cancha (+)</Button>
    </div>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Horarios</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <FilaCanchaTabla></FilaCanchaTabla>
      </tbody>
    </Table>
    </>
  );
};

export default TablaCancha;
