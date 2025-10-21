import { useEffect, useState } from "react";
import { Modal, Button, Table, Spinner, Alert, Badge } from "react-bootstrap";
import { obtenerTurnosAPI } from "../../../helpers/turnosAPI";

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

      // Filtrar solo los turnos del usuario logueado
      const turnosUsuario = todosLosTurnos.filter(
        (t) =>
          t.nombreUsuario?.toLowerCase() ===
          usuarioLogueado.nombreUsuario?.toLowerCase()
      );

      setMisTurnos(turnosUsuario);
    } catch (error) {
      console.error("Error al cargar mis turnos", error);
    } finally {
      setLoading(false);
    }
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
            No tenés reservas activas todavía.
          </Alert>
        ) : (
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cancha</th>
                <th>Categoría</th>
                <th>Horario</th>
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