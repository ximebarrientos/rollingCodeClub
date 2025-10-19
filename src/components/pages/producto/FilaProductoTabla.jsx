import { Button, Image } from "react-bootstrap";
import { borrarProducto } from "../../../helpers/queries.js";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: `¿Eliminar "${nombreProducto}"?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#212529",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarProducto(_id);
        if (respuesta && respuesta.ok) {
          Swal.fire({
            title: "Eliminado",
            text: "✅ Producto eliminado correctamente.",
            icon: "success",
            confirmButtonColor: "#198754",
            timer: 2000,
            background: "#212529",
            color: "#fff",
          });
          obtenerProductos();
        } else {
          Swal.fire({
            title: "Error",
            text: "❌ Ocurrió un error al eliminar el producto.",
            icon: "error",
            confirmButtonColor: "#d33",
            background: "#212529",
            color: "#fff",
          });
        }
      }
    });
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
      <td>${precio}</td>
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
