import { useForm } from "react-hook-form";
import { Modal, Form, Button } from "react-bootstrap";
import { crearTurnoAPI } from "../../../helpers/turnosAPI";
import Swal from "sweetalert2";

const FormularioTurnos = ({
  show,
  onHide,
  cancha,
  turnos,
  refreshData,
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
    try {
      // Verificar si el turno ya está ocupado (con manejo de errores)
      const turnoOcupado = turnos.some(turno => {
        try {
          const fechaTurno = new Date(turno.fecha).toISOString().split('T')[0];
          return turno.canchaId?._id === cancha?._id &&
                 fechaTurno === data.fecha &&
                 turno.horario === data.horario;
        } catch (error) {
          console.warn('Error procesando turno existente:', error);
          return false;
        }
      });

      if (turnoOcupado) {
        Swal.fire("Turno ocupado", `El horario ${data.horario} para la fecha ${new Date(data.fecha).toLocaleDateString('es-ES')} ya está reservado en esta cancha.`, "warning");
        return;
      }

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

      const respuesta = await crearTurnoAPI(nuevoTurno);
      console.log("Respuesta de API:", respuesta);

      if (respuesta.ok) {
          Swal.fire("¡Turno reservado!", "Tu turno ha sido confirmado.", "success");
          reset();
          onHide();
          if (refreshData) {
            refreshData();
          }
      } else {
          const errorData = await respuesta.json().catch(() => ({}));
          console.error("Error detallado del backend:", errorData);
          Swal.fire("Error", `No se pudo reservar el turno: ${respuesta.status} ${respuesta.statusText}`, "error");
      }
    } catch (error) {
        console.error("Error completo en onSubmit:", error);
        Swal.fire("Error", "Ocurrió un error inesperado al reservar el turno. Por favor, inténtalo de nuevo.", "error");
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
              {cancha?.horariosCancha?.map((horario, index) => {
                // Verificar si este horario está ocupado para la fecha seleccionada
                const fechaSeleccionada = watch("fecha");
                let estaOcupado = false;

                if (fechaSeleccionada && turnos) {
                  try {
                    estaOcupado = turnos.some(turno => {
                      if (!turno?.canchaId?._id) return false;
                      const fechaTurno = new Date(turno.fecha).toISOString().split('T')[0];
                      return turno.canchaId._id === cancha._id &&
                             fechaTurno === fechaSeleccionada &&
                             turno.horario === horario;
                    });
                  } catch (error) {
                    console.warn('Error verificando horario ocupado:', error);
                  }
                }

                return (
                  <option
                    key={index}
                    value={horario}
                    disabled={estaOcupado}
                    className={estaOcupado ? 'text-muted' : ''}
                  >
                    {horario} {estaOcupado ? '(Ocupado)' : ''}
                  </option>
                );
              }) || []}
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
