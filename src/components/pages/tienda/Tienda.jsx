import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Modal, Table } from "react-bootstrap";
import "./tienda.css";

export default function Tienda() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleShow = (producto) => setProductoSeleccionado(producto);
  const handleClose = () => setProductoSeleccionado(null);

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
    { nombre: "Camiseta San Lorenzo", img: "/camisetafutbol2.jpg", precio: "$25.000" },
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

  const renderCards = (productos) =>
    productos.map((item, idx) => (
      <Col md={4} sm={6} key={idx} className="mb-4">
        <Card className="bg-success text-light text-center producto-card sombra-verde h-100">
          <Card.Img src={item.img} alt={item.nombre} className="p-3 producto-img" />
          <Card.Body>
            <Card.Title className="text-light">{item.nombre}</Card.Title>
            <Card.Text className="fw-bold text-light">{item.precio}</Card.Text>
            <div className="d-flex justify-content-center gap-2">
              <Button variant="warning" onClick={() => handleShow(item)}>
                Ver más
              </Button>
              <Button variant="dark">Comprar</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));

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
          {renderCards(botines)}
        </Row>

        <Row id="camisetas" className="mb-4">
          <h3 className="mb-4 text-light text-center">Camisetas</h3>
          {renderCards(camisetas)}
        </Row>

        <Row id="shorts">
          <h3 className="mb-4 text-light text-center">Shorts</h3>
          {renderCards(shorts)}
        </Row>
      </Container>

      <Modal show={!!productoSeleccionado} onHide={handleClose} centered>
        {productoSeleccionado && (
          <>
            <Modal.Header closeButton className="bg-success text-light">
              <Modal.Title>{productoSeleccionado.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
              <img
                src={productoSeleccionado.img}
                alt={productoSeleccionado.nombre}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
              />
              <p><strong>Precio:</strong> {productoSeleccionado.precio}</p>
              <p>
                <strong>Descripción:</strong> Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
                dapibus diam.
              </p>

              <h5 className="mt-4">Tabla de Talles</h5>
              <Table striped bordered hover size="sm" className="text-light mt-2">
                <thead>
                  <tr>
                    <th>Talle</th>
                    <th>Medida (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>S</td><td>85-90</td></tr>
                  <tr><td>M</td><td>91-96</td></tr>
                  <tr><td>L</td><td>97-102</td></tr>
                  <tr><td>XL</td><td>103-110</td></tr>
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="success">Comprar</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
