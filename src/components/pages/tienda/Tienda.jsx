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
import { useParams, useNavigate, Link } from "react-router";
import { listarProductos } from "../../../helpers/queries.js";
import "./tienda.css";
import Swal from "sweetalert2";
import { Cart4 } from "react-bootstrap-icons";

export default function Tienda({ usuarioLogueado }) {
  const navigate = useNavigate();
  const { categoria, subcategoria } = useParams();

  const getCarritoKey = () => {
    return usuarioLogueado && usuarioLogueado._id
      ? `carrito_${usuarioLogueado._id}`
      : "carrito_invitado";
  };

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carritoKey, setCarritoKey] = useState(getCarritoKey());
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem(carritoKey)) || []
  );

  const [page, setPage] = useState(1);
  const limit = 9;
  const [totalPage, setTotalPage] = useState(1);
  const [orden, setOrden] = useState("");

  useEffect(() => {
    const nuevaClave = getCarritoKey();
    setCarritoKey(nuevaClave);
  }, [usuarioLogueado]);

  useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem(carritoKey)) || []);
  }, [carritoKey]);

  useEffect(() => {
    setOrden("");
  }, [usuarioLogueado]);

  useEffect(() => {
    setPage(1);
  }, [categoria, subcategoria]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await listarProductos();
        if (respuesta && respuesta.ok) {
          const data = await respuesta.json();

          let filtrados = data;

          if (categoria && categoria !== "todas") {
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

          if (busqueda.trim() !== "") {
            filtrados = filtrados.filter((p) =>
              p.nombreProducto?.toLowerCase().includes(busqueda.toLowerCase())
            );
          }

          filtrados.sort((a, b) => {
            if (orden === "az")
              return a.nombreProducto.localeCompare(b.nombreProducto);
            if (orden === "za")
              return b.nombreProducto.localeCompare(a.nombreProducto);
            if (orden === "precioAsc") return a.precio - b.precio;
            if (orden === "precioDesc") return b.precio - a.precio;
            return a.nombreProducto.localeCompare(b.nombreProducto);
          });

          let productosPaginados;
          if (busqueda.trim() !== "") {
            setTotalPage(1);
            productosPaginados = filtrados;
          } else {
            const totalPaginas = Math.ceil(filtrados.length / limit);
            setTotalPage(totalPaginas);

            const startIndex = (page - 1) * limit;
            productosPaginados = filtrados.slice(
              startIndex,
              startIndex + limit
            );
          }

          setProductos(productosPaginados);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargar();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoria, subcategoria, page, orden, busqueda]);

  useEffect(() => {
    localStorage.setItem(carritoKey, JSON.stringify(carrito));
  }, [carrito, carritoKey]);

  const handleShow = (producto) => setProductoSeleccionado(producto);
  const handleClose = () => setProductoSeleccionado(null);

  const agregarAlCarrito = (producto) => {
    if (!usuarioLogueado || !usuarioLogueado.token) {
      Swal.fire({
        icon: "warning",
        title: "Acceso restringido",
        text: "Solo los usuarios logueados pueden comprar productos.",
        confirmButtonText: "Entendido",
        background: "#212529",
        color: "#fff",
        iconColor: "#ffc107",
      });
      return;
    }
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
      <Card className="text-light text-center producto-card sombra-verde h-100">
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
            <Button variant="dark" onClick={() => handleShow(item)}>
              Ver más
            </Button>
            <Button variant="success" onClick={() => agregarAlCarrito(item)}>
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
        <div className="text-center mb-4">
          <div className="d-none d-md-flex flex-wrap justify-content-center gap-2">
            <Button
              variant={
                !categoria || categoria === "todas"
                  ? "success"
                  : "outline-success"
              }
              onClick={() => navigate("/tienda/todas")}
            >
              Todas las categorías
            </Button>
            <Button
              variant={
                categoria === "indumentaria" && !subcategoria
                  ? "success"
                  : "outline-success"
              }
              onClick={() => navigate("/tienda/indumentaria")}
            >
              Indumentaria
            </Button>
            <Button
              variant={
                subcategoria === "botines" ? "success" : "outline-success"
              }
              onClick={() => navigate("/tienda/indumentaria/botines")}
            >
              Botines
            </Button>
            <Button
              variant={
                subcategoria === "camisetas" ? "success" : "outline-success"
              }
              onClick={() => navigate("/tienda/indumentaria/camisetas")}
            >
              Camisetas
            </Button>
            <Button
              variant={
                subcategoria === "shorts" ? "success" : "outline-success"
              }
              onClick={() => navigate("/tienda/indumentaria/shorts")}
            >
              Shorts
            </Button>
            <Button
              variant={
                categoria === "accesorios" && !subcategoria
                  ? "success"
                  : "outline-success"
              }
              onClick={() => navigate("/tienda/accesorios")}
            >
              Accesorios
            </Button>
            <Button
              variant={
                subcategoria === "kits-de-entrenamiento"
                  ? "success"
                  : "outline-success"
              }
              onClick={() =>
                navigate("/tienda/accesorios/kits-de-entrenamiento")
              }
            >
              Kits de Entrenamiento
            </Button>
            <Button
              variant={
                subcategoria === "pelotas" ? "success" : "outline-success"
              }
              onClick={() => navigate("/tienda/accesorios/pelotas")}
            >
              Pelotas
            </Button>
          </div>

          <div className="d-md-none">
            <Form.Select
              className="text-center bg-dark text-light border-success"
              onChange={(e) => navigate(e.target.value)}
              defaultValue={
                categoria ? `/tienda/${categoria}` : "/tienda/todas"
              }
            >
              <option value="/tienda/todas">Todas las categorías</option>
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

        <Row className="justify-content-center mb-3">
          <Col md={6} className="text-center">
            <Form.Check
              inline
              label="A → Z"
              name="orden"
              type="radio"
              checked={orden === "az"}
              onChange={() => {
                setOrden("az");
                setPage(1);
              }}
              className="text-success"
            />
            <Form.Check
              inline
              label="Z → A"
              name="orden"
              type="radio"
              checked={orden === "za"}
              onChange={() => {
                setOrden("za");
                setPage(1);
              }}
              className="text-success"
            />
            <Form.Check
              inline
              label="Precio ↓-↑"
              name="orden"
              type="radio"
              checked={orden === "precioAsc"}
              onChange={() => {
                setOrden("precioAsc");
                setPage(1);
              }}
              className="text-success"
            />
            <Form.Check
              inline
              label="Precio ↑-↓"
              name="orden"
              type="radio"
              checked={orden === "precioDesc"}
              onChange={() => {
                setOrden("precioDesc");
                setPage(1);
              }}
              className="text-success"
            />
            <Form.Check
              inline
              label="Todos"
              name="orden"
              type="radio"
              checked={orden === ""}
              onChange={() => {
                setOrden("");
                setPage(1);
              }}
              className="text-success"
            />
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center mb-5">
          <Col md={6} xs={12} className="mb-3 mb-md-0">
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              className="text-center bg-primary border-success text-white"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPage(1);
              }}
            />
          </Col>
          <Col md="auto" xs={12} className="text-center">
            <Button
              as={Link}
              to={"/carrito"}
              variant="success"
              className="position-relative px-4 py-2"
            >
              <Cart4 size={25} />

              {carrito.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                  {carrito.reduce((t, p) => t + (p.cantidad || 1), 0)}
                </span>
              )}
            </Button>
          </Col>
        </Row>

        {cargando ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
          </div>
        ) : productos.length > 0 ? (
          <Row className="mb-5 justify-content-center">
            {productos.map((p) => renderCard(p))}
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
              {productoSeleccionado.categoria?.toLowerCase() ===
                "indumentaria" && (
                <>
                  {productoSeleccionado.subcategoria?.toLowerCase() ===
                  "botines" ? (
                    productoSeleccionado.numeros?.length ? (
                      <p>
                        <strong>Números disponibles:</strong>{" "}
                        {productoSeleccionado.numeros.join(", ")}
                      </p>
                    ) : (
                      <p className="text-muted">
                        No hay números disponibles registrados.
                      </p>
                    )
                  ) : productoSeleccionado.talles?.length ? (
                    <p>
                      <strong>Talles disponibles:</strong>{" "}
                      {productoSeleccionado.talles.join(", ")}
                    </p>
                  ) : (
                    <p className="text-muted">
                      No hay talles disponibles registrados.
                    </p>
                  )}
                </>
              )}
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
