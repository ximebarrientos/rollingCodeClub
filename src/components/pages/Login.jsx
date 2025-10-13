import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Login = ({setUsuarioLogueado}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate();

  const loginUser = (user) => {
    const adminEmail = import.meta.env.VITE_API_EMAIL;
    const adminPassword = import.meta.env.VITE_API_PASSWORD;

    if (user.email === adminEmail && user.password === adminPassword) {
      setUsuarioLogueado({
        nombreUsuario: "Administrador",
        token: "admin-token",
        isAdmin: true,
      });
      Swal.fire({
        title: "Login exitoso",
        text: `Bienvenido Administrador`,
        icon: "success",
      });
      navegacion("/administrador");
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: `Credenciales invalidas`,
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
