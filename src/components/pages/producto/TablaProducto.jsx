import { Table, Button } from "react-bootstrap";

const TablaProducto = () => {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h2>Productos</h2>
    <Button variant="success">Agregar Producto</Button>
    </div>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
          <tr >
            <td>Musculosa fluor</td>
            <td>50</td>
            <td>Indumentaria</td>
            <td>
              <Button size="sm" variant="warning" className="me-2">
                Editar
              </Button>
              <Button
                size="sm"
                variant="danger"
              >
                Borrar
              </Button>
            </td>
          </tr>
      </tbody>
    </Table>
    </>
  );
};

export default TablaProducto;
