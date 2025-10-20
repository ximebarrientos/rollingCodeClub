import { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import FilaTurnosTabla from "./FilaTurnosTabla";
import { obtenerTurnosAPI } from "../../../helpers/turnosAPI";
import { obtenerCanchasAPI } from "../../../helpers/canchasAPI";

const TablaTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordenRecientePrimero, setOrdenRecientePrimero] = useState(true);
  useEffect(() => {
    cargarTurnosYCanchas();
  }, []);

  const cargarTurnosYCanchas = async () => {
    try {
      const [turnosData, canchasData] = await Promise.all([
        obtenerTurnosAPI(),
        obtenerCanchasAPI(),
      ]);

      setTurnos(turnosData);
      setCanchas(canchasData);
    } catch (error) {
      console.error("Error al cargar turnos y canchas", error);
    } finally {
      setLoading(false);
    }
  };

  const recargarTurnos = () => {
    cargarTurnosYCanchas();
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="info" />
        <p className="mt-3 text-light">Cargando turnos...</p>
      </div>
    );
  }

  const turnosFiltrados = turnos.filter((turno) => {
    const fechaTurno = new Date(turno.fecha);
    const fechaHoy = new Date();

    fechaTurno.setHours(0, 0, 0, 0);
    const fechaActual = new Date(fechaHoy);
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaTurno > fechaActual) return true;

    if (fechaTurno.getTime() === fechaActual.getTime()) {
      const [horaInicio] = turno.horario
        .split("-")
        .map((h) => parseInt(h.split(":")[0]));
      const horaActual = fechaHoy.getHours();
      return horaInicio > horaActual;
    }

    return false;
  });

  const turnosConCancha = turnosFiltrados.map((turno) => ({
    ...turno,
    nombreCancha: turno.canchaId
      ? turno.canchaId.nombreCancha
      : "Cancha no encontrada",
    categoriaCancha: turno.canchaId
      ? turno.canchaId.categoriaCancha
      : "N/A",
  }));

  const turnosOrdenados = [...turnosConCancha].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    const diferenciaFecha = fechaB - fechaA;

    if (diferenciaFecha !== 0)
      return ordenRecientePrimero ? diferenciaFecha : -diferenciaFecha;

    const horaA = parseInt(a.horario.split("-")[0].replace(":", ""), 10);
    const horaB = parseInt(b.horario.split("-")[0].replace(":", ""), 10);
    return ordenRecientePrimero ? horaB - horaA : horaA - horaB;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="text-light display-6">Turnos Canchas</h2>
        <div className="d-flex gap-2">
          <Button className="btn-outline-light" onClick={recargarTurnos}>
            Actualizar
          </Button>
          <Button
            variant={ordenRecientePrimero ? "outline-warning" : "outline-info"}
            onClick={() => setOrdenRecientePrimero(!ordenRecientePrimero)}
          >
            {ordenRecientePrimero
              ? "Mostrar más viejos primero"
              : "Mostrar más nuevos primero"}
          </Button>
        </div>
      </div>

      {turnosOrdenados.length === 0 ? (
        <Alert variant="info" className="text-center">
          No hay turnos reservados en este momento.
        </Alert>
      ) : (
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Horario</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnosOrdenados.map((turno, index) => (
              <FilaTurnosTabla
                key={turno._id || index}
                turno={turno}
                recargarTurnos={recargarTurnos}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TablaTurnos;
