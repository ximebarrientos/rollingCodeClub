import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../../helpers/usuariosAPI";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate();

  const loginUser = async (user) => {
    try {
      user.correoElectronico = user.email;
      delete user.email;
      const respuesta = await login(user);
      if (respuesta.status === 200) {
        const { usuario, token } = await respuesta.json();
        console.log("Datos de usuario recibidos del Backend:", usuario);
        console.log("Token recibido:", token);
        setUsuarioLogueado({
          ...usuario,
          token: token,
        });
        sessionStorage.setItem(
          "userKey",
          JSON.stringify({ ...usuario, token: token })
        );
        Swal.fire({
          title: "Login exitoso",
          text: `Bienvenido ${usuario.nombreUsuario}`,
          icon: "success",
        });
        if (usuario.rol && usuario.rol.toLowerCase() === "administrador") {
          navegacion("/administrador");
        } else {
          navegacion("/");
        }
      } else {
        Swal.fire({
          title: "Ocurrio un error",
          text: `Credenciales invalidas`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Ocurrio un error",
        text: `Error al conectar con el servidor`,
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <Container className="my-5 px-4 border border-1 rounded-4 border-secondary">
        <h2 className="text-center my-4">Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit(loginUser)}>
          <Form.Group className="mb-3" controlId="emailLogin">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@rollinCodeClub.com"
              className="bg-primary text-white"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: "El email no tiene un formato válido",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
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
                    "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter especial.",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.password?.message}
            </Form.Text>
          </Form.Group>
          <div className="text-end mb-3">
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              onClick={() => navegacion("/error404")}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </div>

          <div className="d-grid my-4 ">
            <Button variant="success" type="submit" size="lg">
              Iniciar Sesión
            </Button>
          </div>
          <div className="d-flex align-items-center my-3">
            <hr className="flex-fill" />
            <span className="mx-2 text-muted">o</span>
            <hr className="flex-fill" />
          </div>
          <div className="d-grid gap-2">
            <Button
              variant="outline-info"
              size="lg"
              onClick={() => navegacion("/error404")}
            >
              <i className="bi bi-facebook me-2"></i>
              Iniciar sesión con Facebook
            </Button>
            <Button
              variant="outline-danger"
              className="mb-3"
              size="lg"
              onClick={() => navegacion("/error404")}
            >
              <i className="bi bi-google me-2"></i>
              Iniciar sesión con Google
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
