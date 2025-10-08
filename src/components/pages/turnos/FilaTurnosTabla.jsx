import { Badge, Button } from "react-bootstrap";
import { eliminarTurnoAPI } from "../../../helpers/turnosAPI";
import Swal from "sweetalert2";

const FilaTurnosTabla = ({ turno, recargarTurnos }) => {
  const formatFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar turno?",
      text: `¿Estás seguro de eliminar el turno de la cancha "${turno.nombreCancha}" para el ${formatFecha(turno.fecha)} a las ${turno.horario}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await eliminarTurnoAPI(turno._id);
        Swal.fire("Eliminado", "El turno ha sido eliminado.", "success");
        recargarTurnos();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo eliminar el turno.", "error");
      }
    }
  };

  return (
    <tr>
      <td>{formatFecha(turno.fecha)}</td>
      <td>{turno.nombreCancha}</td>
      <td>{turno.categoriaCancha}</td>
      <td><Badge className="bg-success">{turno.horario}</Badge></td>
      <td>{turno.clienteId || "Sin asignar"}</td>
      <td>
        <Button size="sm" variant="warning" className="me-2">
          Editar
        </Button>
        <Button size="sm" variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </td>
    </tr>
  );
};

export default FilaTurnosTabla;
