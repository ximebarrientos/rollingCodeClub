import { Form, Button, Container } from "react-bootstrap";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    //Limpiar carrito al iniciar sesión
    localStorage.removeItem("carrito");
  };

  return (
    <div className="container">
      <Container className="my-5 px-4 border border-1 rounded-4 border-secondary">
        <h2 className="text-center my-4">Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmailSesion">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@rollinCodeClub.com"
            />
            <Form.Text id="formTextCorreoSesion" className="text-danger">
              Error en Correo
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Crea una contraseña" />
            <Form.Text id="formTextContraseniaSesion" className="text-danger">
              Error en contraseña
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
