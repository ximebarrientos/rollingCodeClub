import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./tienda.css";

export default function Tienda() {
  const botines = [
    { nombre: "Botines Umbro", img: "/botines1.webp", precio: "$45.000" },
    { nombre: "Botines Adidas", img: "/botines2.webp", precio: "$42.500" },
    { nombre: "Botines Puma", img: "/botines3.webp", precio: "$40.000" },
    { nombre: "Botines Nike", img: "/botines4.jpg", precio: "$38.000" },
    { nombre: "Botines Umbro", img: "/botines5.png", precio: "$41.000" },
    { nombre: "Botines New Balance", img: "/botines6.jpeg", precio: "$39.500" },
  ];

  const camisetas = [
    { nombre: "Camiseta River Plate", img: "/camisetafutbol1.jpg", precio: "$25.000" },
    { nombre: "Camiseta San lorenzo", img: "/camisetafutbol2.jpg", precio: "$25.000" },
    { nombre: "Camiseta Argentina", img: "/camisetafutbol3.webp", precio: "$30.000" },
    { nombre: "Camiseta Argentina", img: "/camisetafutbol4.webp", precio: "$28.000" },
    { nombre: "Camiseta Independiente", img: "/camisetafutbol5.webp", precio: "$29.000" },
    { nombre: "Camiseta Boca Juniors", img: "/camisetafutbol6.jpg", precio: "$29.500" },
  ];

  const shorts = [
    { nombre: "Shorts Argentina", img: "/short1.jpg", precio: "$15.000" },
    { nombre: "Shorts Argentino Juniors", img: "/short2.png", precio: "$16.000" },
    { nombre: "Shorts Independiente", img: "/short3.jpg", precio: "$14.500" },
    { nombre: "Shorts Boca Juniors", img: "/short4.webp", precio: "$14.000" },
    { nombre: "Shorts River Plate", img: "/short5.webp", precio: "$13.500" },
    { nombre: "Shorts Argentina", img: "/short6.webp", precio: "$12.500" },
  ];

  return (
    <div className="bg-dark text-light py-5">
      <Container>

        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold">Indumentaria</h2>
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

        <Row id="botines" className="mb-4">
          <h3 className="mb-4 text-light text-center">Botines</h3>
          {botines.map((item, idx) => (
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

        <Row id="camisetas" className="mb-4">
          <h3 className="mb-4 text-light text-center">Camisetas</h3>
          {camisetas.map((item, idx) => (
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

        <Row id="shorts">
          <h3 className="mb-4 text-light text-center">Shorts</h3>
          {shorts.map((item, idx) => (
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
