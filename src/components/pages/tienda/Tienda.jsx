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
import { useParams } from "react-router";
import { listarProductos } from "../../../helpers/queries.js";
import "./tienda.css";
import Swal from "sweetalert2";

export default function Tienda() {
  const { categoria, subcategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );

  const [page, setPage] = useState(1);
  const limit = 9;
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await listarProductos();
        if (respuesta && respuesta.ok) {
          const data = await respuesta.json();

          let filtrados = data;
          if (categoria) {
            filtrados = filtrados.filter(
              (p) => p.categoria?.toLowerCase() === categoria.toLowerCase()
            );
          }
          if (subcategoria) {
            const subcatNormalizada = subcategoria
              .replace(/-/g, " ")
              .toLowerCase();
            filtrados = filtrados.filter(
              (p) => p.subcategoria?.toLowerCase() === subcatNormalizada
            );
          }

          const totalPaginas = Math.ceil(filtrados.length / limit);
          setTotalPage(totalPaginas);

          const startIndex = (page - 1) * limit;
          const productosPaginados = filtrados.slice(
            startIndex,
            startIndex + limit
          );

          setProductos(productosPaginados);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [categoria, subcategoria, page]);

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
    <Col xs={12} sm={6} md={4} key={item._id} className="mb-4">
      <Card className="bg-success text-light text-center producto-card sombra-verde h-100">
        <div className="p-3">
          <Card.Img
            src={item.imagen || "/noimage.png"}
            alt={item.nombreProducto}
            className="producto-img img-fluid rounded"
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
        </div>
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
            <h2 className="fw-bold text-success mb-0">
              {subcategoria
                ? subcategoria.toUpperCase()
                : categoria
                ? categoria.toUpperCase()
                : "TIENDA"}
            </h2>
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

        <div className="text-center mb-4">
          <div className="d-none d-md-flex flex-wrap justify-content-center gap-2">
            <Button href="/tienda/indumentaria" variant="outline-success">
              Indumentaria
            </Button>
            <Button
              href="/tienda/indumentaria/botines"
              variant="outline-success"
            >
              Botines
            </Button>
            <Button
              href="/tienda/indumentaria/camisetas"
              variant="outline-success"
            >
              Camisetas
            </Button>
            <Button
              href="/tienda/indumentaria/shorts"
              variant="outline-success"
            >
              Shorts
            </Button>
            <Button href="/tienda/accesorios" variant="outline-success">
              Accesorios
            </Button>
            <Button
              href="/tienda/accesorios/kits-de-entrenamiento"
              variant="outline-success"
            >
              Kits de Entrenamiento
            </Button>
            <Button href="/tienda/accesorios/pelotas" variant="outline-success">
              Pelotas
            </Button>
          </div>

          <div className="d-md-none">
            <Form.Select
              className="text-center bg-dark text-light border-success"
              onChange={(e) => (window.location.href = e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Ver categorías...
              </option>
              <option value="/tienda/indumentaria">Indumentaria</option>
              <option value="/tienda/indumentaria/botines">Botines</option>
              <option value="/tienda/indumentaria/camisetas">Camisetas</option>
              <option value="/tienda/indumentaria/shorts">Shorts</option>
              <option value="/tienda/accesorios">Accesorios</option>
              <option value="/tienda/accesorios/kits-de-entrenamiento">
                Kits de Entrenamiento
              </option>
              <option value="/tienda/accesorios/pelotas">Pelotas</option>
            </Form.Select>
          </div>
        </div>

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
        ) : productosFiltrados.length > 0 ? (
          <Row className="mb-5 justify-content-center">
            {productosFiltrados.map((p) => renderCard(p))}
          </Row>
        ) : (
          <h5 className="text-center text-muted mt-5">
            No encontramos productos que coincidan con tu búsqueda.
          </h5>
        )}

        {totalPage > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-2 my-3 flex-wrap">
            <Button
              variant="secondary"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Anterior
            </Button>
            <div className="mx-3 fw-semibold">
              Página {page} de {totalPage}
            </div>
            <Button
              variant="secondary"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
            >
              Siguiente
            </Button>
          </div>
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
