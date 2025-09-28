import { Table, Button, Badge } from "react-bootstrap";

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
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        
          <tr>
            <td>Cancha A</td>
            <td>Futbol 5 Techada</td>
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
    </>
  );
};

export default TablaCancha;
