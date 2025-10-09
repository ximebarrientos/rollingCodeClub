import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { listarProductos } from "../../../helpers/queries.js";
import "./tienda.css";
import Swal from "sweetalert2";

export default function Tienda() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await listarProductos();
        if (respuesta && respuesta.ok) {
          const data = await respuesta.json();
          const indumentaria = data.filter(
            (p) => p.categoria === "Indumentaria"
          );
          setProductos(indumentaria);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const productosFiltrados = productos.filter((p) =>
    p.nombreProducto?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleShow = (producto) => setProductoSeleccionado(producto);
  const handleClose = () => setProductoSeleccionado(null);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item._id === producto._id);

      let nuevoCarrito;
      if (existente) {
        nuevoCarrito = prev.map((item) =>
          item._id === producto._id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        nuevoCarrito = [...prev, { ...producto, cantidad: 1 }];
      }

      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

      Swal.fire({
        icon: "success",
        title: "Producto agregado 🛒",
        text: `"${producto.nombreProducto}" se añadió al carrito.`,
        showConfirmButton: false,
        timer: 1500,
        background: "#212529",
        color: "#fff",
        iconColor: "#28a745",
      });

      return nuevoCarrito;
    });
  };

  const renderCard = (item) => (
    <Col md={4} sm={6} key={item._id} className="mb-4">
      <Card className="bg-success text-light text-center producto-card sombra-verde h-100">
        <Card.Img
          src={item.imagen || "/noimage.png"}
          alt={item.nombreProducto}
          className="p-3 producto-img"
        />
        <Card.Body>
          <Card.Title className="text-light">{item.nombreProducto}</Card.Title>
          <Card.Text className="fw-bold text-light">${item.precio}</Card.Text>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="warning" onClick={() => handleShow(item)}>
              Ver más
            </Button>
            <Button variant="dark" onClick={() => agregarAlCarrito(item)}>
              Comprar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="bg-dark text-light py-5">
      <Container>
        <Row className="align-items-center mb-4">
          <Col xs={12} md={4}></Col>
          <Col xs={12} md={4} className="text-center">
            <h2 className="fw-bold text-success mb-0">Indumentaria</h2>
          </Col>
          <Col xs={12} md={4} className="text-end mt-3 mt-md-0">
            <Button
              variant="success"
              href="/carrito"
              className="position-relative shadow-sm"
            >
              Ver carrito 🛒
              {carrito.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  {carrito.reduce(
                    (total, prod) => total + (prod.cantidad || 1),
                    0
                  )}
                </span>
              )}
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              className="text-center"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
        </Row>

        {cargando ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
          </div>
        ) : busqueda ? (
          productosFiltrados.length > 0 ? (
            <Row className="mb-5 justify-content-center">
              {productosFiltrados.map((p) => renderCard(p))}
            </Row>
          ) : (
            <h5 className="text-center text-muted mt-5">
              No encontramos productos que coincidan con tu búsqueda.
            </h5>
          )
        ) : productos.length > 0 ? (
          <>
            <Row id="botines" className="mb-5">
              <h3 className="text-center text-light mb-4">Botines</h3>
              {productos
                .filter((p) => p.subcategoria === "Botines")
                .map((p) => renderCard(p))}
            </Row>

            <Row id="camisetas" className="mb-5">
              <h3 className="text-center text-light mb-4">Camisetas</h3>
              {productos
                .filter((p) => p.subcategoria === "Camisetas")
                .map((p) => renderCard(p))}
            </Row>

            <Row id="shorts" className="mb-5">
              <h3 className="text-center text-light mb-4">Shorts</h3>
              {productos
                .filter((p) => p.subcategoria === "Shorts")
                .map((p) => renderCard(p))}
            </Row>
          </>
        ) : (
          <h5 className="text-center text-muted mt-5">
            No hay productos cargados aún.
          </h5>
        )}
      </Container>

      <Modal show={!!productoSeleccionado} onHide={handleClose} centered>
        {productoSeleccionado && (
          <>
            <Modal.Header closeButton className="bg-success text-light">
              <Modal.Title>{productoSeleccionado.nombreProducto}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
              <img
                src={productoSeleccionado.imagen || "/noimage.png"}
                alt={productoSeleccionado.nombreProducto}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              />
              <p>
                <strong>Precio:</strong> ${productoSeleccionado.precio}
              </p>
              <p>
                <strong>Descripción:</strong>{" "}
                {productoSeleccionado.descripcion ||
                  "Sin descripción disponible"}
              </p>
              {productoSeleccionado.talles?.length ? (
                <>
                  <h5 className="mt-4">Talles disponibles</h5>
                  <p>{productoSeleccionado.talles.join(", ")}</p>
                </>
              ) : productoSeleccionado.numeros?.length ? (
                <>
                  <h5 className="mt-4">Números disponibles</h5>
                  <p>{productoSeleccionado.numeros.join(", ")}</p>
                </>
              ) : null}
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button
                variant="success"
                onClick={() => agregarAlCarrito(productoSeleccionado)}
              >
                Comprar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
