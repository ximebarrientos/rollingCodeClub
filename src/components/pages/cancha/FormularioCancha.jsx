import { Container, Row, Form, Button } from "react-bootstrap";
import { crearCanchaAPI, editarCanchaAPI } from "../../../helpers/canchasAPI";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";


const FormularioCancha = ({ cancha, recargarCanchas, cerrarFormulario }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (cancha && !cancha.nueva) {
      setValue("nombreCancha", cancha.nombreCancha);
      setValue("categoriaCancha", cancha.categoriaCancha);
      setValue("precioCancha", cancha.precioCancha);
      setValue("descripcionCancha", cancha.descripcionCancha);
      setValue("imagenCancha", cancha.imagenCancha);
      // Para horarios, limpiar primero y marcar los seleccionados
      cancha.horariosCancha.forEach((horario) => {
        setValue(`horario-${horario}`, true);
      });
    } else {
      reset();
    }
  }, [cancha, setValue, reset]);

  const onSubmit = async (data) => {
    const horariosSeleccionados = Object.keys(data)
      .filter((key) => data[key] === true)
      .filter((key) => key.includes("horario-"))
      .map((key) => key.replace("horario-", ""));

    // Validar que al menos un horario esté seleccionado
    if (horariosSeleccionados.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Debe seleccionar al menos un horario",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    const canchaNueva = {
      nombreCancha: data.nombreCancha,
      categoriaCancha: data.categoriaCancha,
      precioCancha: Number(data.precioCancha),
      horariosCancha: horariosSeleccionados,
      descripcionCancha: data.descripcionCancha,
      imagenCancha: data.imagenCancha,
    };

    try {
      let respuesta;
      if (cancha && cancha.nueva) {
        respuesta = await crearCanchaAPI(canchaNueva);
        if (respuesta && respuesta.ok) {
          Swal.fire({
            title: "Cancha creada",
            text: "La cancha ha sido creada con éxito",
            icon: "success",
            confirmButtonColor: "#0066cc",
          });
        } else {
          throw new Error("Error al crear la cancha");
        }
      } else if (cancha) {
        respuesta = await editarCanchaAPI(cancha._id, canchaNueva);
        if (respuesta && respuesta.ok) {
          Swal.fire({
            title: "Cancha editada",
            text: "La cancha ha sido editada con éxito",
            icon: "success",
            confirmButtonColor: "#0066cc",
          });
        } else {
          throw new Error("Error al editar la cancha");
        }
      }
      reset();
      recargarCanchas();
      cerrarFormulario();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al procesar la cancha",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };
  return (
    <Container>
      <Row className="justify-content-center mb-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-info text-center display-5">{cancha && cancha.nueva ? "Cargar Cancha" : "Editar Cancha"}</h2>
          <Form.Group className="mb-3" controlId="nombreCancha">
            <Form.Label>Nombre de Cancha</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la cancha"
              className="bg-primary text-light"
              required
              minLength={2}
              maxLength={100}
              {...register("nombreCancha", {
                required: true,
                minLength: 2,
                maxLength: 100,
              })}
            />
            <Form.Text className="text-danger">
              El nombre de la cancha es obligatorio
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoriaCancha">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              className="bg-primary text-light"
              {...register("categoriaCancha", { required: true })}
            >
              <option value="">Seleccionar</option>
              <option value="Fútbol 5 techada">Fútbol 5 techada</option>
              <option value="Fútbol 5 descubierta">Fútbol 5 descubierta</option>
              <option value="Fútbol 7 techada">Fútbol 7 techada</option>
              <option value="Fútbol 7 descubierta">Fútbol 7 descubierta</option>
            </Form.Select>
            <Form.Text className="text-danger">
              La categoría de la cancha es obligatoria
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="precioCancha">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio de la cancha"
              className="bg-primary text-light"
              step={1}
              required
              min={50}
              max={1000000}
              {...register("precioCancha", { required: true })}
            />
            <Form.Text className="text-danger">
              El precio de la cancha es obligatorio
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="horariosCancha">
            <Form.Label>Horarios</Form.Label>
            <div className="d-flex flex-wrap gap-3">
               {["18:30-20:00", "20:00-21:30", "21:30-23:00", "23:30-00:30"].map(
                (h) => (
                  <Form.Check
                    key={h}
                    type="checkbox"
                    id={`horario-${h}`}
                    label={h}
                    {...register(`horario-${h}`)}
                  />
                )
              )}
            </div>
            <Form.Text className="text-danger">
              Debe seleccionar al menos un horario
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="imagenCancha">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la URL de la imagen de la cancha"
              className="bg-primary text-light"
              {...register("imagenCancha", { required: true })}
            />
            <Form.Text className="text-danger">
              La imagen de la cancha es obligatoria
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionCancha">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción de la cancha"
              className="bg-primary text-light"
              minLength={10}
              maxLength={500}
              {...register("descripcionCancha", { required: true })}
            />
            <Form.Text className="text-danger">
              La descripción de la cancha es obligatoria
            </Form.Text>
          </Form.Group>
          <div className="d-grid">
            <Button variant="info" type="submit">
              {cancha && cancha.nueva ? "Cargar cancha" : "Editar cancha"}
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default FormularioCancha;
