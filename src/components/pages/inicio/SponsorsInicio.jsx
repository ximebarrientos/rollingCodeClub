import { Row, Col } from "react-bootstrap";

export default function SponsorsInicio() {
  const sponsors = [
    { nombre: "Nike", img: "/logonike.png" },
    { nombre: "Adidas", img: "/logoadidas.png" },
    { nombre: "NewBalance", img: "/logonewbalance.png" },
    { nombre: "Umbro", img: "/logoumbro.png" },
  ];

  return (
    <Row className="text-center g-4">
      <h2 className="mb-4">Nuestros Sponsors</h2>
      {sponsors.map((sponsor, idx) => (
        <Col md={3} xs={6} key={idx} className="mb-4">
          <img
            src={sponsor.img}
            alt={sponsor.nombre}
            className="sponsor-logo img-fluid"
          />
        </Col>
      ))}
    </Row>
  );
}

