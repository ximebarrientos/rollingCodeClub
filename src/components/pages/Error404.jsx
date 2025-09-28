import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

export default function Error404() {
  return (
    <Container className="text-center py-5">
      <Row className="justify-content-center">
        <Col md={8}>

          <Image
            src="/imgerror404.png"
            alt="Error 404"
            className="mb-4" height={700}
          />

          <h2 className="mb-3">Página no encontrada</h2>
          <p className="text-secondary mb-4">
            Lo sentimos 😔. La página que estás buscando no existe.
          </p>

          <Button variant="primary" size="lg" href="/">
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
