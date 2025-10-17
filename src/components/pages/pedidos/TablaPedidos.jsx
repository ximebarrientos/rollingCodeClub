import { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import FilaPedidoTabla from "./FilaPedidoTabla";
import {
  listarPedidos,
  listarPedidosAprobados,
} from "../../../helpers/queriesPedidos.js";

const TablaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPage, setTotalPage] = useState(1);

  const obtenerPedidos = async () => {
    try {
      let respuesta;

      if (filtro === "aprobados") {
        respuesta = await listarPedidosAprobados();
      } else {
        respuesta = await listarPedidos();
      }

      if (respuesta && respuesta.ok) {
        let datos = await respuesta.json();

        if (filtro === "pendientes") {
          datos = datos.filter((p) => p.estado === "Pendiente");
        } else if (filtro === "rechazados") {
          datos = datos.filter(
            (p) => p.estado === "Rechazado" || p.estado === "Fallido"
          );
        } else if (filtro === "aprobados") {
          datos = datos.filter((p) => p.estado === "Aprobado");
        }

        const totalPaginas = Math.ceil(datos.length / limit);
        setTotalPage(totalPaginas);

        const startIndex = (page - 1) * limit;
        const datosPaginados = datos.slice(startIndex, startIndex + limit);

        setPedidos(datosPaginados);
      } else {
        console.error("Error al obtener los pedidos");
      }
    } catch (error) {
      console.error("Error en obtenerPedidos:", error);
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, [page, filtro]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="text-success display-6">Pedidos</h2>

        <ButtonGroup className="flex-wrap">
          <Button
            variant={filtro === "todos" ? "info" : "outline-info"}
            onClick={() => {
              setFiltro("todos");
              setPage(1);
            }}
          >
            Todos
          </Button>
          <Button
            variant={filtro === "aprobados" ? "success" : "outline-success"}
            onClick={() => {
              setFiltro("aprobados");
              setPage(1);
            }}
          >
            Aprobados
          </Button>
          <Button
            variant={filtro === "pendientes" ? "warning" : "outline-warning"}
            onClick={() => {
              setFiltro("pendientes");
              setPage(1);
            }}
          >
            Pendientes
          </Button>
          <Button
            variant={filtro === "rechazados" ? "danger" : "outline-danger"}
            onClick={() => {
              setFiltro("rechazados");
              setPage(1);
            }}
          >
            Rechazados
          </Button>
        </ButtonGroup>
      </div>

      <Table striped bordered hover responsive>
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
                index={(page - 1) * limit + index + 1}
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
    </>
  );
};

export default TablaPedidos;
