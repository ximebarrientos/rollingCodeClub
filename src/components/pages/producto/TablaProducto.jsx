import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import FilaProductoTabla from "./FilaProductoTabla";
import { listarProductos } from "../../../helpers/queries.js";

const TablaProducto = ({ setMostrarFormulario, setProductoEditado }) => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      const respuesta = await listarProductos();
      if (respuesta && respuesta.ok) {
        const datos = await respuesta.json();
        setProductos(datos);
      } else {
        console.error("Error al obtener los productos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-success display-6">Productos</h2>
        <Button
          variant="outline-success"
          onClick={() => {
            setProductoEditado(null); 
            setMostrarFormulario(true); 
          }}
        >
          Agregar Producto (+)
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Subcategoría</th>
            <th>Talles / Números</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto, index) => (
              <FilaProductoTabla
                key={producto._id}
                index={index + 1}
                producto={producto}
                obtenerProductos={obtenerProductos}
                setMostrarFormulario={setMostrarFormulario}
                setProductoEditado={setProductoEditado}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No hay productos cargados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TablaProducto;
