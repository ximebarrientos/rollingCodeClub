import { Row, Col, Button } from "react-bootstrap";
import "./inicio.css";
import { Link } from "react-router";

export default function SacarTurnoInicio() {
  return (
    <Row className="mt-5 mb-5">
      <Col className="bg-success p-4 rounded text-center sombra-verde">
        <h2 className="fw-bold">Saca tu turno aquí</h2>
        <Button as={Link} to={"/reserva"} variant="dark" size="lg" className="mt-3">
          Reservar turno
        </Button>
      </Col>
    </Row>
  );
}
