import { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Spinner, Modal } from "react-bootstrap";
import FilaProductoTabla from "./FilaProductoTabla";
import { listarProductos } from "../../../helpers/queries.js";

const TablaProducto = ({ setMostrarFormulario, setProductoEditado }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 9;
  const [totalPage, setTotalPage] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const obtenerProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await listarProductos();
      if (respuesta && respuesta.ok) {
        const datos = await respuesta.json();
        setProductos(datos);
      } else {
        console.error("Error al obtener los productos");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const productosFiltradosYOrdenados = productos
    .filter((p) =>
      p.nombreProducto?.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => {
      if (orden === "az")
        return a.nombreProducto.localeCompare(b.nombreProducto);
      if (orden === "za")
        return b.nombreProducto.localeCompare(a.nombreProducto);
      if (orden === "precioAsc") return a.precio - b.precio;
      if (orden === "precioDesc") return b.precio - a.precio;
      return a.nombreProducto.localeCompare(b.nombreProducto);
    });

  const totalPaginasCalculadas = Math.ceil(
    productosFiltradosYOrdenados.length / limit
  );

  const startIndex = (page - 1) * limit;
  const productosPaginados = productosFiltradosYOrdenados.slice(
    startIndex,
    startIndex + limit
  );

  useEffect(() => {
    setTotalPage(totalPaginasCalculadas);
  }, [productosFiltradosYOrdenados.length, limit]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-success display-6">Productos</h2>
        <Button
          variant="outline-success"
          onClick={() => {
            setProductoEditado(null);
            setMostrarFormulario(true);
          }}
        >
          Agregar Producto (+)
        </Button>
      </div>

      <Row className="align-items-center mb-3">
        <Col md={6} className="mb-2 mb-md-0">
          <Form.Control
            type="text"
            placeholder="Buscar producto..."
            className="bg-primary border-success text-white"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPage(1);
            }}
          />
        </Col>
        <Col md={6} className="text-md-end text-center">
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
        </Col>
      </Row>

      {cargando ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Subcategoría</th>
                <th>Talles / Números</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosPaginados.length > 0 ? (
                productosPaginados.map((producto, index) => (
                  <FilaProductoTabla
                    key={producto._id}
                    index={(page - 1) * limit + index + 1}
                    producto={producto}
                    obtenerProductos={obtenerProductos}
                    setMostrarFormulario={setMostrarFormulario}
                    setProductoEditado={setProductoEditado}
                    setProductoSeleccionado={setProductoSeleccionado}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No hay productos que coincidan.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

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
        </>
      )}

      <Modal show={!!productoSeleccionado} onHide={() => setProductoSeleccionado(null)} centered>
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
                <strong>Categoría:</strong> {productoSeleccionado.categoria}
              </p>
              <p>
                <strong>Subcategoría:</strong> {productoSeleccionado.subcategoria}
              </p>
              <p>
                <strong>Descripción:</strong>{" "}
                {productoSeleccionado.descripcion ||
                  "Sin descripción disponible"}
              </p>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <Button variant="secondary" onClick={() => setProductoSeleccionado(null)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default TablaProducto;
