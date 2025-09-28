import { Table } from "react-bootstrap";

const TablaTurnos = () => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Cancha</th>
          <th>Horario</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>Cancha futbol 11</td>
            <td>20:00-21:30</td>
            <td>JosePerez</td>
          </tr>
      </tbody>
    </Table>
  );
};

export default TablaTurnos;
