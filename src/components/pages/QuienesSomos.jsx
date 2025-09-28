import { Container, Row, Col, Card } from "react-bootstrap";

const integrantes = [
  {
    nombre: "Alessandra Borges",
    rol: "Developer",
    descripcion: "Siempre lista para codear ⚡",
    img: "/imgsobrenosotros1.png",
  },
  {
    nombre: "Ximena Barrientos",
    rol: "Developer",
    descripcion: "Creativa y resolutiva 🎨",
    img: "/imgsobrenosotros2.png",
  },
  {
    nombre: "José David Baza",
    rol: "Developer",
    descripcion: "Apasionado por los formularios 💻",
    img: "/imgsobrenosotros3.png",
  },
];

const valores = [
  {
    titulo: "Comunidad",
    descripcion: "Un espacio para compartir y disfrutar el deporte juntos.",
    icono: "🤝",
  },
  {
    titulo: "Diversión",
    descripcion: "Lo más importante es disfrutar cada partido con amigos.",
    icono: "😃",
  },
  {
    titulo: "Inclusión",
    descripcion: "Nuestras canchas están abiertas para todos.",
    icono: "🌍",
  },
];

export default function SobreNosotros() {
  return (
    <div className="bg-dark text-light py-5">
      <Container>

        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold">Conoce nuestro equipo</h2>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={8} className="bg-success p-4 rounded text-center shadow-sm">
            <p className="lead mb-0">
              Somos un equipo apasionado por el deporte y el trabajo en conjunto.
            </p>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          <h3 className="mb-4">Nuestro equipo</h3>
          {integrantes.map((persona, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <div className="d-flex flex-column align-items-center">
                <img
                  src={persona.img}
                  alt={persona.nombre}
                  className="rounded-circle mb-3"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <h5>{persona.nombre}</h5>
                <p className="text-success mb-1">{persona.rol}</p>
                <p>{persona.descripcion}</p>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="text-center bg-success rounded py-5">
          <h3 className="mb-5">Valores de nuestra comunidad</h3>
          {valores.map((valor, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <div className="d-flex flex-column align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center mb-3"
                  style={{
                    fontSize: "4rem",
                  }}
                >
                  {valor.icono}
                </div>
                <h4 className="fw-bold">{valor.titulo}</h4>
                <p>{valor.descripcion}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
