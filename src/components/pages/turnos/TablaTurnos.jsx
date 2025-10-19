import { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import FilaTurnosTabla from "./FilaTurnosTabla";
import { obtenerTurnosAPI } from "../../../helpers/turnosAPI";
import { obtenerCanchasAPI } from "../../../helpers/canchasAPI";

const TablaTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarTurnosYCanchas();
  }, []);

  const cargarTurnosYCanchas = async () => {
    try {
      const [turnosData, canchasData] = await Promise.all([
        obtenerTurnosAPI(),
        obtenerCanchasAPI()
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

  const turnosFiltrados = turnos.filter(turno => {
    const fechaTurno = new Date(turno.fecha);
    const fechaHoy = new Date();

    fechaTurno.setHours(0, 0, 0, 0);
    const fechaActual = new Date(fechaHoy);
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaTurno > fechaActual) {
      return true;
    }

    if (fechaTurno.getTime() === fechaActual.getTime()) {
      const [horaInicio] = turno.horario.split('-').map(h => parseInt(h.split(':')[0]));
      const horaActual = fechaHoy.getHours();
      return horaInicio > horaActual; 
    }

    return false;
  });


  const turnosConCancha = turnosFiltrados.map(turno => ({
    ...turno,
    nombreCancha: turno.canchaId ? turno.canchaId.nombreCancha : 'Cancha no encontrada',
    categoriaCancha: turno.canchaId ? turno.canchaId.categoriaCancha : 'N/A'
  }));

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-light display-6">Turnos Canchas</h2>
        <Button className="btn-outline-light" onClick={recargarTurnos}>
          Actualizar
        </Button>
      </div>

      {turnosConCancha.length === 0 ? (
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
            {turnosConCancha.map((turno, index) => (
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
