const urlProductos = import.meta.env.VITE_API_PRODUCTOS;

export const listarProductos = async () => {
  try {
    const respuesta = await fetch(urlProductos);
    return respuesta;
  } catch (error) {
    console.error("Error al listar productos:", error);
    return null;
  }
};

export const obtenerProducto = async (id) => {
  try {
    const respuesta = await fetch(`${urlProductos}/${id}`);
    return respuesta;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }
};

export const crearProducto = async (productoNuevo) => {
  try {
    const respuesta = await fetch(urlProductos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al crear producto:", error);
    return null;
  }
};

export const editarProducto = async (id, productoEditado) => {
  try {
    const respuesta = await fetch(`${urlProductos}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoEditado),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al editar producto:", error);
    return null;
  }
};

export const borrarProducto = async (id) => {
  try {
    const respuesta = await fetch(`${urlProductos}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error("Error al borrar producto:", error);
    return null;
  }
};

