import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";
import "./inicio.css";

export default function ProductosInicio() {
  const productos = [
    {
      nombre: "Pelota de Fútbol",
      descripcion: "Pelota oficial para partidos de fútbol 5 y 7.",
      img: "/pelotafutbol2.jpg",
      link:"/tienda/accesorios/pelotas",
    },
    {
      nombre: "Kit de entrenamiento",
      descripcion: "Conos, petos y más para mejorar tu juego.",
      img: "/kitentrenamiento1.jpg",
      link: "/tienda/accesorios/kits-de-entrenamiento",
    },
    {
      nombre: "Camiseta de River Plate",
      descripcion: "Llevá los colores de tu equipo en cada partido.",
      img: "/camisetafutbol1.png",
      link: "/tienda/indumentaria/camisetas",
    },
  ];

  return (
    <Row className="mb-5">
      <h3 className="mb-4 text-center">Algunos de nuestros productos</h3>
      {productos.map((producto, idx) => (
        <Col md={4} key={idx} className="mb-4">
          <Card className="text-light text-center producto-card sombra-verde h-100">
            <div className="p-3">
              <Card.Img
                variant="top"
                src={producto.img}
                alt={producto.nombre}
                className="producto-img img-fluid rounded"
              />
            </div>
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>{producto.descripcion}</Card.Text>
              <Button as={Link} to={producto.link} variant="success">
                Ver más
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
