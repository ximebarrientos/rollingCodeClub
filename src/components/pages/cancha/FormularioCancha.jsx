import { useEffect, useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearCanchaAPI, editarCanchaAPI } from "../../../helpers/canchasAPI";
import Swal from "sweetalert2";

const FormularioCancha = ({ cancha, recargarCanchas, cerrarFormulario }) => {
  const [preview, setPreview] = useState("");
  const [imagenActual, setImagenActual] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    resetField,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (cancha && !cancha.nueva) {
      setValue("nombreCancha", cancha.nombreCancha);
      setValue("categoriaCancha", cancha.categoriaCancha);
      setValue("precioCancha", cancha.precioCancha);
      setValue("descripcionCancha", cancha.descripcionCancha);
      setImagenActual(cancha.imagenCancha);

      cancha.horariosCancha.forEach((horario) => {
        setValue(`horario-${horario}`, true);
      });
    } else {
      reset();
      setPreview("");
      setImagenActual("");
    }
  }, [cancha, setValue, reset]);

  const onSubmit = async (data) => {
    const horariosSeleccionados = Object.keys(data)
      .filter((key) => data[key] === true && key.includes("horario-"))
      .map((key) => key.replace("horario-", ""));

    if (horariosSeleccionados.length === 0) {
      setError("horariosCancha", {
        type: "manual",
        message: "Debe seleccionar al menos un horario disponible.",
      });
      return;
    } else {
      clearErrors("horariosCancha");
    }

    const formData = new FormData();
    formData.append("nombreCancha", data.nombreCancha);
    formData.append("categoriaCancha", data.categoriaCancha);
    formData.append("precioCancha", data.precioCancha);
    formData.append("descripcionCancha", data.descripcionCancha);
    horariosSeleccionados.forEach((h) => formData.append("horariosCancha", h));

    if (data.imagenCancha && data.imagenCancha[0]) {
      formData.append("imagen", data.imagenCancha[0]);
    }

    try {
      let respuesta;
      if (cancha && cancha.nueva) {
        respuesta = await crearCanchaAPI(formData);
        if (respuesta && respuesta.ok) {
          Swal.fire({
            title: "Cancha creada",
            text: "La cancha ha sido creada con éxito",
            icon: "success",
            confirmButtonColor: "#0066cc",
          });
        } else throw new Error("Error al crear la cancha");
      } else if (cancha) {
        respuesta = await editarCanchaAPI(cancha._id, formData);
        if (respuesta && respuesta.ok) {
          Swal.fire({
            title: "Cancha editada",
            text: "La cancha ha sido editada con éxito",
            icon: "success",
            confirmButtonColor: "#0066cc",
          });
        } else throw new Error("Error al editar la cancha");
      }

      reset();
      setPreview("");
      setImagenActual("");
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
          <h2 className="text-info text-center display-5 mb-4">
            {cancha && cancha.nueva ? "Cargar Cancha" : "Editar Cancha"}
          </h2>

          <Form.Group className="mb-3" controlId="nombreCancha">
            <Form.Label>Nombre de Cancha</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la cancha"
              className="bg-primary text-light"
              {...register("nombreCancha", {
                required: "El nombre es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombreCancha?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="categoriaCancha">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              className="bg-primary text-light"
              {...register("categoriaCancha", {
                required: "Seleccione una categoría",
              })}
            >
              <option value="">Seleccionar</option>
              <option value="Fútbol 5 techada">Fútbol 5 techada</option>
              <option value="Fútbol 5 descubierta">Fútbol 5 descubierta</option>
              <option value="Fútbol 7 techada">Fútbol 7 techada</option>
              <option value="Fútbol 7 descubierta">Fútbol 7 descubierta</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.categoriaCancha?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="precioCancha">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio"
              className="bg-primary text-light"
              {...register("precioCancha", {
                required: "El precio es obligatorio",
                min: { value: 1000, message: "Mínimo $1000" },
                max: { value: 1000000, message: "Máximo $1.000.000" },
              })}
            />
            <Form.Text className="text-danger">
              {errors.precioCancha?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="horariosCancha">
            <Form.Label>Horarios disponibles</Form.Label>
            <div className="d-flex flex-wrap gap-3">
              {["18:30-20:00", "20:00-21:30", "21:30-23:00", "23:30-00:30"].map(
                (h) => (
                  <Form.Check
                    key={h}
                    type="checkbox"
                    id={`horario-${h}`}
                    label={h}
                    {...register(`horario-${h}`)}
                    onChange={() => clearErrors("horariosCancha")}
                  />
                )
              )}
            </div>

            <input
              type="hidden"
              {...register("horariosCancha")}
              aria-invalid={!!errors.horariosCancha}
            />

            <Form.Text className="text-danger">
              {errors.horariosCancha?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="imagenCancha">
            <Form.Label>Imagen de la cancha</Form.Label>
            <Form.Control
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              {...register("imagenCancha", {
                required: !cancha || cancha.nueva
                  ? "La imagen es obligatoria"
                  : false,
                validate: {
                  fileSize: (files) =>
                    !files[0] ||
                    files[0].size <= 2 * 1024 * 1024 ||
                    "La imagen no debe superar los 2MB.",
                },
              })}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  clearErrors("imagenCancha");
                } else {
                  setPreview("");
                }
              }}
            />

            {(preview || imagenActual) && (
              <div className="mb-2 position-relative d-inline-block mt-3">
                <img
                  className="rounded-3 img-preview"
                  src={preview || imagenActual}
                  alt="Imagen"
                  width={220}
                />
                <Button
                  variant="light"
                  size="sm"
                  className="p-0 d-flex align-items-center justify-content-center shadow btn-img-preview"
                  onClick={() => {
                    setPreview("");
                    setImagenActual("");
                    resetField("imagenCancha");
                  }}
                >
                  <i className="bi bi-x fs-5 text-danger"></i>
                </Button>
              </div>
            )}

            <Form.Text className="text-danger">
              {errors.imagenCancha?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcionCancha">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción de la cancha"
              className="bg-primary text-light"
              {...register("descripcionCancha", {
                required: "La descripción es obligatoria",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
                maxLength: { value: 500, message: "Máximo 500 caracteres" },
              })}
            />
            <Form.Text className="text-danger">
              {errors.descripcionCancha?.message}
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
