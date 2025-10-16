import { useEffect, useState } from "react";
import { Table, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import FilaPedidoTabla from "./FilaPedidoTabla";
import {
  listarPedidos,
  listarPedidosAprobados,
} from "../../../helpers/queriesPedidos.js";

const TablaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  const obtenerPedidos = async (estado = "todos") => {
    try {
      let respuesta;

      if (estado === "aprobados") {
        respuesta = await listarPedidosAprobados();
      } else {
        respuesta = await listarPedidos();
      }

      if (respuesta && respuesta.ok) {
        let datos = await respuesta.json();

        if (estado === "pendientes") {
          datos = datos.filter((p) => p.estado === "Pendiente");
        } else if (estado === "rechazados") {
          datos = datos.filter(
            (p) => p.estado === "Rechazado" || p.estado === "Fallido"
          );
        } else if (estado === "aprobados") {
          datos = datos.filter((p) => p.estado === "Aprobado");
        }

        setPedidos(datos);
      } else {
        console.error("Error al obtener los pedidos");
      }
    } catch (error) {
      console.error("Error en obtenerPedidos:", error);
    }
  };

  useEffect(() => {
    obtenerPedidos(filtro);
  }, [filtro]);

  return (
    <div className="w-100">
      <Row className="align-items-center mb-3">
        <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
          <h2 className="text-success display-6">Pedidos</h2>
        </Col>

        <Col xs={12} md={8} className="text-center text-md-end">
          <ButtonGroup className="flex-wrap justify-content-center">
            <Button
              variant={filtro === "todos" ? "info" : "outline-info"}
              onClick={() => setFiltro("todos")}
              className="mb-2"
            >
              Todos
            </Button>
            <Button
              variant={filtro === "aprobados" ? "success" : "outline-success"}
              onClick={() => setFiltro("aprobados")}
              className="mb-2"
            >
              Aprobados
            </Button>
            <Button
              variant={filtro === "pendientes" ? "warning" : "outline-warning"}
              onClick={() => setFiltro("pendientes")}
              className="mb-2"
            >
              Pendientes
            </Button>
            <Button
              variant={filtro === "rechazados" ? "danger" : "outline-danger"}
              onClick={() => setFiltro("rechazados")}
              className="mb-2"
            >
              Rechazados
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover className="mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>ID Pedido</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length > 0 ? (
              pedidos.map((pedido, index) => (
                <FilaPedidoTabla
                  key={pedido._id}
                  index={index + 1}
                  pedido={pedido}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay pedidos {filtro === "todos" ? "" : filtro}.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablaPedidos;
