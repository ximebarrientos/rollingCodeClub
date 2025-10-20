import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./error404.css"; 
import { Link } from "react-router";

export default function Error404() {
  return (
    <Container className="text-center py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="mt-2 mb-2">
            <Image
              src="/imgerror404.png"
              alt="Error 404"
              className="error-image"
            />
          </div>

          <h2 className="mb-3">Página no encontrada</h2>
          <p className="text-secondary mb-4">
            Lo sentimos 😔. La página que estás buscando no existe.
          </p>

          <Button as={Link} to={"/"} variant="primary" size="lg" >
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
