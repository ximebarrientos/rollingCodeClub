import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import FilaCanchaTabla from "./FilaCanchaTabla";
import { obtenerCanchasAPI } from "../../../helpers/canchasAPI";
import FormularioCancha from "./FormularioCancha";

const TablaCancha = () => {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);

  const cargarCanchas = async () => {
    try {
      const data = await obtenerCanchasAPI();
      console.log("Canchas obtenidas:", data); // Debug log
      setCanchas(data);
    } catch (error) {
      console.error("Error al cargar canchas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCanchas();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-info display-6">Canchas</h2>
        <Button
          variant="outline-info"
          onClick={() =>
            setCanchaSeleccionada(canchaSeleccionada ? null : { nueva: true })
          }
        >
          {canchaSeleccionada ? "Cerrar formulario" : "Agregar Cancha (+)"}
        </Button>
      </div>

      {canchaSeleccionada && (
        <FormularioCancha
          cancha={canchaSeleccionada}
          recargarCanchas={cargarCanchas}
          cerrarFormulario={() => setCanchaSeleccionada(null)}
        />
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="info" />
        </div>
      ) : canchaSeleccionada === null && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Horarios</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {canchas.map((cancha) => (
              <FilaCanchaTabla
                key={cancha._id}
                cancha={cancha}
                recargarCanchas={cargarCanchas}
                onEditar={() => setCanchaSeleccionada(cancha)}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TablaCancha;
