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

    const usuarioFinal = {
      ...resto,
      fechaNacimiento: fechaNacimiento,
    };

    const respuesta = await registrarUsuario(usuarioFinal);

    if (!respuesta) {
      Swal.fire("Error", "No se pudo conectar con el servidor.", "error");
      return;
    }

    if (respuesta.status === 201) {
      const datosRespuesta = await respuesta.json();

      const nombreUsuario =
        datosRespuesta.usuario?.nombreUsuario || "Nuevo Usuario";

      Swal.fire({
        title: `¡Cuenta Creada!`,
        text: `¡Bienvenido ${nombreUsuario}! Inicia sesión para continuar.`,
        icon: "success",
      });
      navegacion("/login");
    } else {
      const datosError = await respuesta.json();
      Swal.fire({
        title: "Error al Registrar",

        text: datosError.mensaje || "Ocurrió un error al crear la cuenta.",
        icon: "error",
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
              <Form.Label>Nombre Completo</Form.Label>
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
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
                <option value="1974">1974</option>
                <option value="1973">1973</option>
                <option value="1972">1972</option>
                <option value="1971">1971</option>
                <option value="1970">1970</option>
                <option value="1969">1969</option>
                <option value="1968">1968</option>
                <option value="1967">1967</option>
                <option value="1966">1966</option>
                <option value="1965">1965</option>
                <option value="1964">1964</option>
                <option value="1963">1963</option>
                <option value="1962">1962</option>
                <option value="1961">1961</option>
                <option value="1960">1960</option>
                <option value="1959">1959</option>
                <option value="1958">1958</option>
                <option value="1957">1957</option>
                <option value="1956">1956</option>
                <option value="1955">1955</option>
                <option value="1954">1954</option>
                <option value="1953">1953</option>
                <option value="1952">1952</option>
                <option value="1951">1951</option>
                <option value="1950">1950</option>
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
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
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
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
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

            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="formCelular"
            >
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
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
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

          <div className="d-grid my-4 ">
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
