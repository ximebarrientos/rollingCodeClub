import { Table,Button } from "react-bootstrap";
import FilaTurnosTabla from "./FilaTurnosTabla";

const TablaTurnos = () => {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 className="text-light display-6">Turnos Canchas</h2>
    <Button className="btn-outline-light">Agregar Turno (+)</Button>
    </div>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Horario</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
          <FilaTurnosTabla></FilaTurnosTabla>
      </tbody>
    </Table>
    </>
  );
};

export default TablaTurnos;
