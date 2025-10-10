import { useForm } from "react-hook-form";
import { Modal, Form, Button } from "react-bootstrap";
import { crearTurnoAPI } from "../../../helpers/turnosAPI";
import Swal from "sweetalert2";

const FormularioTurnos = ({
  show,
  onHide,
  cancha,
  onTurnoReservado
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fecha: '',
      horario: ''
    }
  });

  const onSubmit = async (data) => {
    // Crear fecha con zona horaria Argentina (-03:00) para evitar problemas de conversión
    const fechaConZonaHoraria = `${data.fecha}T12:00:00-03:00`;

    const nuevoTurno = {
        fecha: fechaConZonaHoraria,
        horario: data.horario,
        canchaId: cancha._id
    };

    console.log("Fecha original:", data.fecha);
    console.log("Fecha con zona horaria:", fechaConZonaHoraria);
    console.log("Enviando payload de turno:", nuevoTurno);

    try {
        const respuesta = await crearTurnoAPI(nuevoTurno);
        console.log("Respuesta de API:", respuesta);

        if (respuesta.ok) {
            Swal.fire("¡Turno reservado!", "Tu turno ha sido confirmado.", "success");
            reset();
            onHide();
            if (onTurnoReservado) {
                onTurnoReservado();
            }
        } else {
            const errorData = await respuesta.json().catch(() => ({}));
            console.error("Error detallado del backend:", errorData);
            Swal.fire("Error", `No se pudo reservar el turno: ${respuesta.status} ${respuesta.statusText}`, "error");
        }
    } catch (error) {
        console.error("Error al crear turno", error);
        Swal.fire("Error", "Ocurrió un error al reservar", "error");
    }
  };

  const handleClose = () => {
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reservar Turno - {cancha?.nombreCancha}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha del Turno *</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", {
                required: "La fecha es obligatoria",
                validate: value => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  if (selectedDate < today) {
                    return "La fecha no puede ser anterior a hoy";
                  }
                  return true;
                }
              })}
              min={(() => {
                  const today = new Date();
                  return today.toISOString().split('T')[0];
              })()}
              isInvalid={!!errors.fecha}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fecha?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Horario Disponible *</Form.Label>
            <Form.Select
              {...register("horario", {
                required: "El horario es obligatorio",
                validate: value =>
                  cancha?.horariosCancha?.includes(value) || "Horario inválido"
              })}
              isInvalid={!!errors.horario}
            >
              <option value="">Seleccionar horario</option>
              {cancha?.horariosCancha.map((horario, index) => (
                <option key={index} value={horario}>{horario}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.horario?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button variant="success" type="submit">
              Reservar Turno
            </Button>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormularioTurnos;
