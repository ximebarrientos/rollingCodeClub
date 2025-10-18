import { Badge, Button } from "react-bootstrap";
import { eliminarTurnoAPI } from "../../../helpers/turnosAPI";
import Swal from "sweetalert2";

const FilaTurnosTabla = ({ turno, recargarTurnos }) => {
  const formatFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString("es-ES", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar turno?",
      text: `¿Estás seguro de eliminar el turno de la cancha "${
        turno.nombreCancha
      }" para el ${formatFecha(turno.fecha)} a las ${
        turno.horario
      }? Esta acción no se puede deshacer.`,
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
        const respuesta = await eliminarTurnoAPI(turno._id);
        if (!respuesta.ok) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el turno.",
            icon: "error",
            background: "#212529",
            color: "#fff",
          });
          return;
        }

        Swal.fire({
          title: "Eliminado",
          text: "El turno ha sido eliminado.",
          icon: "success",
          background: "#212529",
          color: "#fff",
        });
        recargarTurnos();
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el turno.",
          icon: "error",
          background: "#212529",
          color: "#fff",
        });
      }
    }
  };

  return (
    <tr>
      <td>{formatFecha(turno.fecha)}</td>
      <td>{turno.nombreCancha}</td>
      <td>{turno.categoriaCancha}</td>
      <td>
        <Badge className="bg-success">{turno.horario}</Badge>
      </td>
      <td>{turno.nombreUsuario || "Sin asignar"}</td>
      <td>
        <Button size="sm" variant="danger" onClick={handleDelete}>
          <i className="bi bi-trash-fill"></i>
        </Button>
      </td>
    </tr>
  );
};

export default FilaTurnosTabla;
