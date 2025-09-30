import { Row, Col, Card, Button } from "react-bootstrap";
import "./inicio.css";

export default function ProductosInicio() {
  const productos = [
    {
      nombre: "Pelota de Fútbol",
      descripcion: "Pelota oficial para partidos de fútbol 5 y 7.",
      img: "/pelotafutbol2.jpg",
    },
    {
      nombre: "Kit de entrenamiento",
      descripcion: "Conos, petos y más para mejorar tu juego.",
      img: "/kitentrenamiento2.webp",
    },
    {
      nombre: "Camiseta de River Plate",
      descripcion: "Llevá los colores de tu equipo en cada partido.",
      img: "/camisetafutbol1.jpg",
    },
  ];

  return (
    <Row className="mb-5">
      <h3 className="mb-4 text-center">Algunos de nuestros productos</h3>
      {productos.map((producto, idx) => (
        <Col md={4} key={idx} className="mb-4">
          <Card className="bg-success text-light h-100 text-center sombra-verde producto-card">
            <Card.Img
              variant="top"
              src={producto.img}
              alt={producto.nombre}
              style={{
                maxHeight: "200px",
                objectFit: "contain",
                padding: "20px",
              }}
            />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>{producto.descripcion}</Card.Text>
              <Button variant="dark">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
