import {Button } from "react-bootstrap";

const FilaCanchaTabla = () => {
  return (
    <tr>
      <td>Cancha A</td>
      <td>Futbol 5 Techada</td>
      <td>20:00 a 21:30</td>
      <td>$100</td>
      <td>
        <Button size="sm" variant="warning" className="me-2">
          Editar
        </Button>
        <Button size="sm" variant="danger">
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default FilaCanchaTabla;
