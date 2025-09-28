import { Table, Button, Badge } from "react-bootstrap";

const TablaCancha = () => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Horarios</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        
          <tr>
            <td>Cancha futbol 11</td>
            <td>Techada</td>
            <td>20:00 a 21:30</td>
            <td>$100</td>
            <td>
              <Badge className="bg-success">
                Disponible
              </Badge>
            </td>
            <td>
              <Button size="sm" variant="warning" className="me-2">
                Editar
              </Button>
              <Button size="sm" variant="danger">
                Borrar
              </Button>
            </td>
          </tr>
      </tbody>
    </Table>
  );
};

export default TablaCancha;
