import { useEffect, useState } from "react";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import FilaCanchaTabla from "./FilaCanchaTabla";
import { obtenerCanchasAPI } from "../../../helpers/canchasAPI";
import FormularioCancha from "./FormularioCancha";

const TablaCancha = () => {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
  const [canchaModal, setCanchaModal] = useState(null);

  const cargarCanchas = async () => {
    try {
      const data = await obtenerCanchasAPI();
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
      ) : (
        canchaSeleccionada === null && (
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
                  setCanchaModal={setCanchaModal}
                />
              ))}
            </tbody>
          </Table>
        )
      )}

      <Modal show={!!canchaModal} onHide={() => setCanchaModal(null)} centered>
        {canchaModal && (
          <>
            <Modal.Header closeButton className="bg-info text-light">
              <Modal.Title>{canchaModal.nombreCancha}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
              <img
                src={canchaModal.imagenCancha}
                alt={canchaModal.nombreCancha}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              />

              <p>
                <strong>Categoría:</strong> {canchaModal.categoriaCancha}
              </p>
              <p>
                <strong>Horarios:</strong>{" "}
                {canchaModal.horariosCancha.join(", ")}
              </p>
              <p>
                <strong>Precio:</strong> ${canchaModal.precioCancha}
              </p>

              <p>
                <strong>Descripción:</strong> {canchaModal.descripcionCancha}
              </p>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <Button variant="secondary" onClick={() => setCanchaModal(null)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default TablaCancha;
