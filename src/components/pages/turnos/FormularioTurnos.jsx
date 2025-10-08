import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { crearTurnoAPI } from "../../../helpers/turnosAPI";
import Swal from "sweetalert2";

const FormularioTurnos = ({
  show,
  onHide,
  cancha,
  onTurnoReservado
}) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  const handleReservar = async () => {
    if (!fechaSeleccionada || !horarioSeleccionado) {
      Swal.fire("Error", "Por favor selecciona fecha y horario", "error");
      return;
    }

    const nuevoTurno = {
      fecha: fechaSeleccionada,
      horario: horarioSeleccionado,
      canchaId: cancha._id
    };

    try {
      const respuesta = await crearTurnoAPI(nuevoTurno);
      if (respuesta.ok) {
        Swal.fire("¡Turno reservado!", "Tu turno ha sido confirmado.", "success");
        limparFormulario();
        onHide();
        if (onTurnoReservado) {
          onTurnoReservado();
        }
      } else {
        Swal.fire("Error", "No se pudo reservar el turno", "error");
      }
    } catch (error) {
      console.error("Error al crear turno", error);
      Swal.fire("Error", "Ocurrió un error al reservar", "error");
    }
  };

  const limparFormulario = () => {
    setFechaSeleccionada("");
    setHorarioSeleccionado("");
  };

  const handleClose = () => {
    limparFormulario();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reservar Turno - {cancha?.nombreCancha}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Fecha del Turno</Form.Label>
            <Form.Control
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Horario Disponible</Form.Label>
            <Form.Select
              value={horarioSeleccionado}
              onChange={(e) => setHorarioSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccionar horario</option>
              {cancha?.horariosCancha.map((horario, index) => (
                <option key={index} value={horario}>{horario}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleReservar}>
          Reservar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormularioTurnos;
