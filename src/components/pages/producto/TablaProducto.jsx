import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import FilaProductoTabla from "./FilaProductoTabla";
import { listarProductos, listarProductosPaginados } from "../../../helpers/queries.js";
import { set } from "react-hook-form";

const TablaProducto = ({ setMostrarFormulario, setProductoEditado }) => {
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPage, setTotalPage] = useState(1);

  const obtenerProductos = async () => {
    try {
      const respuesta = await listarProductosPaginados(page, limit);
      if (respuesta && respuesta.ok) {
        const datos = await respuesta.json();
        setProductos(datos.productos);
        setTotalPage(datos.totalPaginas);
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
      
      <div className= "d-flex justify-content-center gap-1 my-3 ">
        <Button variant= "secondary">Anterior</Button>
        <Button>1</Button>
        <Button variant= "secondary">Siguiente</Button>

      </div>
    </>
  );
};

export default TablaProducto;
