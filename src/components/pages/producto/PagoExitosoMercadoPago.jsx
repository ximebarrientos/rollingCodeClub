import { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const PagoExitosoMercadoPago = () => {
  useEffect(() => {
    localStorage.removeItem("carrito");
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card className="text-center p-4 shadow bg-dark text-light w-75">
        <Card.Body>
          <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
          <Card.Title as="h2" className="fw-bold mb-3">
            ¡Pago Exitoso!
          </Card.Title>
          <Card.Text className="mb-4">
            Gracias por tu compra 🎉
            <br />
            Hemos recibido tu pago correctamente.
            <br />
            En breve recibirás un correo con los detalles de tu pedido.
          </Card.Text>
          <Button as={Link} to="/" variant="success" className="fw-semibold">
            <i className="bi bi-house-door-fill me-2"></i>
            Volver al inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PagoExitosoMercadoPago;
