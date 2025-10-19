import { Button } from "react-bootstrap";
import { eliminarCanchaAPI } from "../../../helpers/canchasAPI";
import { obtenerTurnosAPI } from "../../../helpers/turnosAPI";
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
      background: "#212529",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        const turnos = await obtenerTurnosAPI();
        const turnosParaCancha = turnos.filter(
          (turno) => turno.canchaId?._id === cancha._id
        );

        if (turnosParaCancha.length > 0) {
          Swal.fire({
            title: "No se puede eliminar",
            text: "Esta cancha tiene turnos reservados. Elimina los turnos antes de borrar la cancha.",
            icon: "warning",
            background: "#212529",
            color: "#fff",
          });
          return;
        }

        const respuesta = await eliminarCanchaAPI(cancha._id);
        if (!respuesta.ok) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la cancha.",
            icon: "error",
            background: "#212529",
            color: "#fff",
          });
          return;
        }

        Swal.fire({
          title: "Eliminada",
          text: "La cancha ha sido eliminada.",
          icon: "success",
          background: "#212529",
          color: "#fff",
        });
        recargarCanchas();
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la cancha.",
          icon: "error",
          background: "#212529",
          color: "#fff",
        });
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
