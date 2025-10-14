import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../../helpers/usuariosAPI";

const Login = ({setUsuarioLogueado}) => {
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
        setUsuarioLogueado({
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario,
          rol: usuario.rol,
          token: token,
        });
        Swal.fire({
          title: "Login exitoso",
          text: `Bienvenido ${usuario.nombreUsuario}`,
          icon: "success",
        });
        if (usuario.rol && usuario.rol.toLowerCase() === 'administrador') {
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
          <Form.Group className="mb-3" controlId="formEmailSesion">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@rollinCodeClub.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "El email no tiene un formato válido",
                },
              })}
            />
            <Form.Text id="formTextCorreoSesion" className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Crea una contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            <Form.Text id="formTextContraseniaSesion" className="text-danger">
              {errors.password?.message}
            </Form.Text>
          </Form.Group>

          <div className="d-grid my-4 ">
            <Button variant="primary" type="submit" size="lg">
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
