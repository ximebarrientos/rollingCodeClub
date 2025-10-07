import { Table, Button } from "react-bootstrap";
import FilaProductoTabla from "./FilaProductoTabla";

const TablaProducto = () => {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 className="text-success display-6">Productos</h2>
    <Button className="btn-outline-success">Agregar Producto (+)</Button>
    </div>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Sub-Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
          <FilaProductoTabla></FilaProductoTabla>
      </tbody>
    </Table>
    </>
  );
};

export default TablaProducto;
