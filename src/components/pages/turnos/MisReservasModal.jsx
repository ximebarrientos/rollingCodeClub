import { useEffect, useState } from "react";
import { Modal, Button, Table, Spinner, Alert, Badge } from "react-bootstrap";
import { obtenerTurnosAPI, eliminarTurnoAPI } from "../../../helpers/turnosAPI";
import Swal from "sweetalert2";

const MisReservasModal = ({ show, onHide, usuarioLogueado }) => {
  const [misTurnos, setMisTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) {
      cargarMisTurnos();
    }
  }, [show]);

  const cargarMisTurnos = async () => {
    try {
      setLoading(true);
      const todosLosTurnos = await obtenerTurnosAPI();

      const turnosUsuario = todosLosTurnos.filter(
        (t) =>
          t.nombreUsuario?.toLowerCase() ===
          usuarioLogueado?.nombreUsuario?.toLowerCase()
      );

      const hoy = new Date();
      const turnosFuturos = turnosUsuario.filter((t) => {
        const fechaTurno = new Date(t.fecha);
        return fechaTurno.setHours(0, 0, 0, 0) >= hoy.setHours(0, 0, 0, 0);
      });

      setMisTurnos(turnosFuturos);
    } catch (error) {
      console.error("Error al cargar mis turnos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarReserva = async (idTurno) => {
    Swal.fire({
      title: "¿Cancelar reserva?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
      background: "#212529",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await eliminarTurnoAPI(idTurno);

          if (respuesta && respuesta.ok) {
            Swal.fire({
              title: "Reserva cancelada",
              icon: "success",
              timer: 1800,
              background: "#212529",
              color: "#fff",
              showConfirmButton: false,
            });
            cargarMisTurnos();
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo cancelar la reserva.",
              icon: "error",
              background: "#212529",
              color: "#fff",
            });
          }
        } catch (error) {
          console.error("Error al cancelar reserva:", error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al conectar con el servidor.",
            icon: "error",
            background: "#212529",
            color: "#fff",
          });
        }
      }
    });
  };

  const formatFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString("es-ES", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-dark text-info">
        <Modal.Title>Mis Reservas</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="info" />
            <p className="mt-3">Cargando tus reservas...</p>
          </div>
        ) : misTurnos.length === 0 ? (
          <Alert variant="info" className="text-center">
            No tenés reservas activas.
          </Alert>
        ) : (
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cancha</th>
                <th>Categoría</th>
                <th>Horario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {misTurnos.map((turno) => (
                <tr key={turno._id}>
                  <td>{formatFecha(turno.fecha)}</td>
                  <td>{turno.canchaId?.nombreCancha || "N/A"}</td>
                  <td>{turno.canchaId?.categoriaCancha || "N/A"}</td>
                  <td>
                    <Badge bg="success">{turno.horario}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancelarReserva(turno._id)}
                    >
                      Cancelar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="outline-info" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MisReservasModal;
