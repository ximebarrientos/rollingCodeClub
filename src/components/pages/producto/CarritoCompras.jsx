import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ListGroup,
  Alert,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { crearOrdenCarritoAPI } from "../../../helpers/queriesPagos.js"; // 👈 ruta correcta

const CarritoCompras = () => {
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * (prod.cantidad || 1),
    0
  );

  const aumentarCantidad = (id) => {
    const actualizado = carrito.map((item) =>
      item._id === id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
    );
    setCarrito(actualizado);
  };

  const disminuirCantidad = (id) => {
    const actualizado = carrito
      .map((item) =>
        item._id === id
          ? { ...item, cantidad: Math.max((item.cantidad || 1) - 1, 1) }
          : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(actualizado);
  };

  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Se eliminará del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      background: "#212529",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizado = carrito.filter((item) => item._id !== id);
        setCarrito(actualizado);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El producto fue eliminado del carrito.",
          timer: 1200,
          showConfirmButton: false,
          background: "#212529",
          color: "#fff",
        });
      }
    });
  };

  const vaciarCarrito = () => {
    Swal.fire({
      title: "¿Vaciar carrito?",
      text: "Se eliminarán todos los productos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, vaciar",
      background: "#212529",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito([]);
        Swal.fire({
          icon: "success",
          title: "Carrito vaciado",
          timer: 1200,
          showConfirmButton: false,
          background: "#212529",
          color: "#fff",
        });
      }
    });
  };

  // 🧾 Integración con Mercado Pago
  const handlePagar = async () => {
    if (carrito.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Tu carrito está vacío",
        text: "Agrega productos antes de continuar.",
        background: "#212529",
        color: "#fff",
      });
      return;
    }

    // ✅ Adaptado exactamente a tu estructura del localStorage
    const productosFormateados = carrito.map((item) => ({
      id: item._id,
      quantity: item.cantidad, // ya existe cantidad en tus objetos
    }));

    try {
      const respuesta = await crearOrdenCarritoAPI(productosFormateados);

      if (respuesta && respuesta.status === 201) {
        const data = await respuesta.json();
        // Redirigir al checkout de Mercado Pago
        window.location.href = data.init_point;
      } else {
        const errorData = await respuesta.json();
        Swal.fire({
          icon: "error",
          title: "Error al procesar el pago",
          text: errorData.mensaje || "Intente nuevamente en unos minutos.",
          background: "#212529",
          color: "#fff",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
        background: "#212529",
        color: "#fff",
      });
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col xs={12} md={8}>
          <h2 className="mb-4 display-5">Carrito de Compras</h2>

          {carrito.length === 0 ? (
            <Alert variant="info">No hay productos en el carrito.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((prod) => (
                  <tr key={prod._id}>
                    <td>{prod.nombreProducto}</td>
                    <td>${prod.precio}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => disminuirCantidad(prod._id)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{prod.cantidad || 1}</span>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => aumentarCantidad(prod._id)}
                      >
                        +
                      </Button>
                    </td>
                    <td>${(prod.precio * (prod.cantidad || 1)).toFixed(2)}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => eliminarProducto(prod._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>

        <Col xs={12} md={4}>
          <div
            className="p-3 border rounded shadow-sm sticky-top bg-dark text-light"
            style={{ top: 80 }}
          >
            <h4>Resumen</h4>
            {carrito.length === 0 ? (
              <p className="text-muted mt-3">Tu carrito está vacío.</p>
            ) : (
              <>
                <ListGroup variant="flush" className="mb-3">
                  {carrito.map((prod) => (
                    <ListGroup.Item
                      key={prod._id}
                      className="d-flex justify-content-between align-items-center bg-dark text-light border-secondary"
                    >
                      <span>
                        {prod.nombreProducto} x {prod.cantidad || 1}
                      </span>
                      <span>
                        ${(prod.precio * (prod.cantidad || 1)).toFixed(2)}
                      </span>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item className="fw-bold d-flex justify-content-between align-items-center bg-success text-light">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </ListGroup.Item>
                </ListGroup>

                <div className="d-grid gap-2">
                  <Button variant="outline-danger" onClick={vaciarCarrito}>
                    Vaciar carrito
                  </Button>
                  <Button variant="success" size="lg" onClick={handlePagar}>
                    Pagar
                  </Button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarritoCompras;
