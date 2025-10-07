import { Button, Image } from "react-bootstrap";
import { borrarProducto } from "../../../helpers/queries.js";

const FilaProductoTabla = ({
  producto,
  index,
  obtenerProductos,
  setMostrarFormulario,
  setProductoEditado,
}) => {
  const {
    _id,
    nombreProducto,
    precio,
    categoria,
    subcategoria,
    imagen,
    talles,
    numeros,
  } = producto;

  const handleBorrar = async () => {
    if (window.confirm(`¿Seguro que querés eliminar "${nombreProducto}"?`)) {
      const respuesta = await borrarProducto(_id);
      if (respuesta && respuesta.ok) {
        alert("✅ Producto eliminado correctamente");
        obtenerProductos();
      } else {
        alert("❌ Ocurrió un error al eliminar el producto");
      }
    }
  };

  const handleEditar = () => {
    setProductoEditado(producto);
    setMostrarFormulario(true);
  };

  return (
    <tr>
      <td>{index}</td>
      <td className="text-center">
        {imagen ? (
          <Image
            src={imagen}
            alt={nombreProducto}
            thumbnail
            style={{ width: "70px", height: "70px", objectFit: "cover" }}
          />
        ) : (
          "Sin imagen"
        )}
      </td>
      <td>{nombreProducto}</td>
      <td>${precio.toLocaleString("es-AR")}</td>
      <td>{categoria}</td>
      <td>{subcategoria}</td>
      <td>
        {categoria === "Indumentaria" ? (
          subcategoria === "Botines" && numeros?.length ? (
            numeros.join(", ")
          ) : talles?.length ? (
            talles.join(", ")
          ) : (
            <span className="text-muted">–</span>
          )
        ) : (
          <span className="text-muted">–</span>
        )}
      </td>
      <td>
        <Button
          size="sm"
          variant="warning"
          className="me-2"
          onClick={handleEditar}
        >
          Editar
        </Button>
        <Button size="sm" variant="danger" onClick={handleBorrar}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default FilaProductoTabla;
