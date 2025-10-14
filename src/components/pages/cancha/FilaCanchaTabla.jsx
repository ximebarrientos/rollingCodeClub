import { Button } from "react-bootstrap";
import { eliminarCanchaAPI } from "../../../helpers/canchasAPI";
import Swal from "sweetalert2";

const FilaCanchaTabla = ({ cancha, recargarCanchas, onEditar }) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar cancha?",
      text: `¿Estás seguro de eliminar "${cancha.nombreCancha}"? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await eliminarCanchaAPI(cancha._id);
        Swal.fire("Eliminada", "La cancha ha sido eliminada.", "success");
        recargarCanchas();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo eliminar la cancha.", "error");
      }
    }
  };

  return (
    <tr>
      <td>{cancha.nombreCancha}</td>
      <td>{cancha.categoriaCancha}</td>
      <td>{cancha.horariosCancha.join(", ")}</td>
      <td>${cancha.precioCancha}</td>
      <td>
        <Button size="sm" variant="warning" className="me-2" onClick={onEditar}>
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button size="sm" variant="danger" onClick={handleDelete}>
          <i className="bi bi-trash-fill"></i>
        </Button>
      </td>
    </tr>
  );
};

export default FilaCanchaTabla;
