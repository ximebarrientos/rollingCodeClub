import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { registrarUsuario } from "../../../helpers/usuariosAPI";

const Registro = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();
  const passwordValue = watch("password", "");

  const submitRegistro = async (usuario) => {
    const { anio, mes, dia, repetirContrasenia, ...resto } = usuario;
    const fechaNacimiento = `${anio}-${mes}-${dia.padStart(2, "0")}`;
    const usuarioFinal = { ...resto, fechaNacimiento };

    try {
      const respuesta = await registrarUsuario(usuarioFinal);
      if (!respuesta) throw new Error("No se pudo conectar con el servidor.");

      if (respuesta.status === 201) {
        const datosRespuesta = await respuesta.json();
        const nombreUsuario =
          datosRespuesta.usuario?.nombreUsuario || "Nuevo Usuario";
        Swal.fire({
          title: "¡Cuenta Creada!",
          text: `¡Bienvenido ${nombreUsuario}! Inicia sesión para continuar.`,
          icon: "success",
          background: "#212529",
          color: "#fff",
        });
        navegacion("/");
        return;
      }

      let mensajeError = "Ocurrió un error al crear la cuenta.";
      try {
        const errorData = await respuesta.json();
        if (errorData.errores && Array.isArray(errorData.errores)) {
          mensajeError = errorData.errores[0]?.msg || mensajeError;
        } else if (errorData.mensaje) {
          mensajeError = errorData.mensaje;
        } else {
          const textoPlano = JSON.stringify(errorData).toLowerCase();
          if (
            textoPlano.includes("duplicate") ||
            textoPlano.includes("e11000") ||
            textoPlano.includes("unique")
          ) {
            mensajeError =
              "Ya existe un usuario con este nombre, correo o celular.";
          }
        }
      } catch {
        mensajeError = "Error al procesar la respuesta del servidor.";
      }

      Swal.fire({
        title: "Error al Registrar",
        text: mensajeError,
        icon: "error",
        background: "#212529",
        color: "#fff",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Error interno al registrar.",
        icon: "error",
        background: "#212529",
        color: "#fff",
      });
    }
  };

  return (
    <div className="container">
      <Container className="my-5 px-4 border border-1 rounded-4 border-secondary">
        <h2 className="text-center my-4 text-success">Crear Cuenta</h2>
        <Form onSubmit={handleSubmit(submitRegistro)}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="formNombreUsuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                className="bg-primary text-white"
                {...register("nombreUsuario", {
                  required: "El nombre de usuario es obligatorio",
                  minLength: { value: 4, message: "Mínimo 4 caracteres" },
                  maxLength: { value: 20, message: "Máximo 20 caracteres" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombreUsuario?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="bg-primary text-white"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombre?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                className="bg-primary text-white"
                {...register("apellido", {
                  required: "El apellido es obligatorio",
                })}
              />
              <Form.Text className="text-danger">
                {errors.apellido?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Group as={Col} md="4" controlId="formFechaAnio">
              <Form.Select
                className="bg-primary text-white"
                {...register("anio", {
                  required: "Seleccionar Año es obligatorio",
                })}
              >
                <option value="">Año</option>
                {Array.from({ length: 80 }, (_, i) => 2025 - (i + 15)).map(
                  (anio) => (
                    <option key={anio} value={anio}>
                      {anio}
                    </option>
                  )
                )}
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.anio?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="formFechaMes">
              <Form.Select
                className="bg-primary text-white"
                {...register("mes", {
                  required: "Seleccionar Mes es obligatorio",
                })}
              >
                <option value="">Mes</option>
                {[
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ].map((mes, i) => (
                  <option
                    key={i + 1}
                    value={`${(i + 1).toString().padStart(2, "0")}`}
                  >
                    {mes}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.mes?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="formFechaDia">
              <Form.Select
                className="bg-primary text-white"
                {...register("dia", {
                  required: "Seleccionar Día es obligatorio",
                })}
              >
                <option value="">Día</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                  <option key={dia} value={dia}>
                    {dia}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.dia?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formGenero">
              <Form.Label>Género</Form.Label>
              <Form.Select
                className="bg-primary text-white"
                {...register("genero", {
                  required: "El género es obligatorio",
                })}
              >
                <option value=""></option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="No Binario">No Binario</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.genero?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formCelular">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="number"
                className="bg-primary text-white"
                {...register("celular", {
                  required: "El celular es obligatorio",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Número de celular inválido (ej: 3811234567)",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.celular?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formCorreoElectronico">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@rollinCodeClub.com"
              className="bg-primary text-white"
              {...register("correoElectronico", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: "El email debe tener un formato válido.",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.correoElectronico?.message}
            </Form.Text>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crea una contraseña"
                className="bg-primary text-white"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                    message:
                      "Debe tener 8-16 caracteres, 1 dígito, 1 minúscula, 1 mayúscula y 1 caracter especial.",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formRepetirContrasenia">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma la contraseña"
                className="bg-primary text-white"
                {...register("repetirContrasenia", {
                  required: "Confirmar la contraseña es obligatorio",
                  validate: (value) =>
                    value === passwordValue || "Las contraseñas no coinciden.",
                })}
              />
              <Form.Text className="text-danger">
                {errors.repetirContrasenia?.message}
              </Form.Text>
            </Form.Group>
          </Row>

          <div className="d-grid my-4">
            <Button variant="success" type="submit" size="lg">
              Registrarse
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Registro;
