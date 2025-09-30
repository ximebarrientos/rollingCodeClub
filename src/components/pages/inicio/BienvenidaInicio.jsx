import { Row, Col } from "react-bootstrap";

export default function BienvenidaInicio() {
  return (
    <Row className="mb-5 mt-5 align-items-center">
      {/* Texto de bienvenida */}
      <Col md={6} className="p-4 rounded bg-dark shadow-sm text-center text-md-start">
        <h2 className="fw-bold text-success">Bienvenidos a Rolling Code Club</h2>
        <p className="lead">
          El lugar donde el fútbol se vive con pasión, inclusión y diversión.  
          Reservá tu cancha, participá en torneos y disfrutá de la mejor comunidad deportiva.
        </p>
        <p>
          📍 Estamos ubicados a pocos minutos del centro de la ciudad, con fácil acceso y estacionamiento privado para tu comodidad.
        </p>
      </Col>

      {/* Mini mapa */}
      <Col md={6} className="mt-4 mt-md-0">
        <iframe
          title="Mapa Rolling Code Club"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.123456789!2d-65.21759168496074!3d-26.82413938316609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225dfabc12345%3A0x123456789abcdef!2sSan+Miguel+de+Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1700000000000"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Col>
    </Row>
  );
}
