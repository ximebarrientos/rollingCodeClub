import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./tienda.css";

export default function TiendaAccesorios() {
  const kitsdeentrenamiento = [
    { nombre: "Kit de entrenamiento Umbro", img: "/kitentrenamiento1.jpg", precio: "$45.000" },
    { nombre: "Kit de entrenamiento Adidas", img: "/kitentrenamiento2.webp", precio: "$42.500" },
    { nombre: "Kit de entrenamiento Puma", img: "/kitentrenamiento3.jpg", precio: "$40.000" },
    { nombre: "Kit de entrenamiento Nike", img: "/kitentrenamiento4.webp", precio: "$38.000" },
    { nombre: "Kit de entrenamiento Umbro", img: "/kitentrenamiento5.jpg", precio: "$41.000" },
    { nombre: "Kit de entrenamiento New Balance", img: "/kitentrenamiento6.jpg", precio: "$39.500" },
  ];

  const pelotas = [
    { nombre: "Pelota River Plate", img: "/pelotafutbol1.jpg", precio: "$25.000" },
    { nombre: "Pelota Argentina", img: "/pelotafutbol2.jpg", precio: "$25.000" },
    { nombre: "Pelota Munich", img: "/pelotafutbol3.jpg", precio: "$30.000" },
    { nombre: "Pelota Argentina", img: "/pelotafutbol4.webp", precio: "$28.000" },
    { nombre: "Pelota Independiente", img: "/pelotafutbol5.webp", precio: "$29.000" },
    { nombre: "Pelota Boca Juniors", img: "/pelotafutbol6.jpg", precio: "$29.500" },
  ];

  return (
    <div className="bg-dark text-light py-5">
      <Container>

        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold">Accesorios</h2>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              className="text-center"
            />
          </Col>
        </Row>

        <Row id="kisdeentrenamiento" className="mb-4">
          <h3 className="mb-4 text-light text-center">Kits de entrenamiento</h3>
          {kitsdeentrenamiento.map((item, idx) => (
            <Col md={4} sm={6} key={idx} className="mb-4">
              <Card className="bg-success text-light text-center producto-card sombra-verde h-100">
                <Card.Img
                  src={item.img}
                  alt={item.nombre}
                  className="p-3 producto-img"
                />
                <Card.Body>
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Text className="fw-bold">{item.precio}</Card.Text>
                  <Button variant="dark">Comprar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row id="pelotas" className="mb-4">
          <h3 className="mb-4 text-light text-center">Pelotas</h3>
          {pelotas.map((item, idx) => (
            <Col md={4} sm={6} key={idx} className="mb-4">
              <Card className="bg-success text-light text-center producto-card sombra-verde h-100">
                <Card.Img
                  src={item.img}
                  alt={item.nombre}
                  className="p-3 producto-img"
                />
                <Card.Body>
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Text className="fw-bold">{item.precio}</Card.Text>
                  <Button variant="dark">Comprar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
