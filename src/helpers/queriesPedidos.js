const URL_PEDIDOS = import.meta.env.VITE_API_PEDIDOS;

export const listarPedidos = async () => {
  try {
    const respuesta = await fetch(`${URL_PEDIDOS}`);
    return respuesta;
  } catch (error) {
    console.error("Error al listar todos los pedidos:", error);
    return null;
  }
};

export const listarPedidosAprobados = async () => {
  try {
    const respuesta = await fetch(`${URL_PEDIDOS}/aprobados`);
    return respuesta;
  } catch (error) {
    console.error("Error al listar pedidos aprobados:", error);
    return null;
  }
};
