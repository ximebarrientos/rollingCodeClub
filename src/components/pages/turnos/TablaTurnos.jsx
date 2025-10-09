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

  // Filtrar turnos para mostrar solo fechas de hoy o futuras
  const fechaHoy = new Date();
  fechaHoy.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas

  const turnosFuturos = turnos.filter(turno => {
    const fechaTurno = new Date(turno.fecha);
    fechaTurno.setHours(0, 0, 0, 0);
    return fechaTurno >= fechaHoy;
  });

  // Los turnos ya vienen con canchaId populado, usar la info directamente
  const turnosConCancha = turnosFuturos.map(turno => ({
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
