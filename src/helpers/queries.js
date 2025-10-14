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
    const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
    const respuesta = await fetch(urlProductos, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: productoNuevo, // Nota: para multipart/form-data, no se establece Content-Type
    });
    return respuesta;
  } catch (error) {
    console.error("Error al crear producto:", error);
    return null;
  }
};

export const editarProducto = async (id, productoEditado) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
    const respuesta = await fetch(`${urlProductos}/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: productoEditado, // Nota: para multipart/form-data, no se establece Content-Type
    });
    return respuesta;
  } catch (error) {
    console.error("Error al editar producto:", error);
    return null;
  }
};

export const borrarProducto = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
    const respuesta = await fetch(`${urlProductos}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error al borrar producto:", error);
    return null;
  }
};

