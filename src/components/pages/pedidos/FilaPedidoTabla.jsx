const FilaPedidoTabla = ({ pedido, index }) => {
  const fecha = new Date(pedido.createdAt).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr>
      <td>{index}</td>
      <td>{pedido._id}</td>
      <td>{fecha}</td>
      <td>
        {pedido.productos && pedido.productos.length > 0 ? (
          pedido.productos.map((p, i) => (
            <div key={i}>
              {p.producto?.nombreProducto || "—"} x {p.cantidad}
            </div>
          ))
        ) : (
          <span className="text-muted">Sin productos</span>
        )}
      </td>
      <td>${pedido.total?.toLocaleString("es-AR")}</td>
      <td>
        <span
          className={`badge ${
            pedido.estado === "Aprobado"
              ? "bg-success"
              : pedido.estado === "Pendiente"
              ? "bg-warning text-dark"
              : "bg-danger"
          }`}
        >
          {pedido.estado}
        </span>
      </td>
    </tr>
  );
};

export default FilaPedidoTabla;
