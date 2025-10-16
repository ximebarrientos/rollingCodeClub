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
    const userData = JSON.parse(sessionStorage.getItem("userKey") || "{}");
    const token = userData?.token;

    if (!token) {
      console.error("No se encontró token en sessionStorage");
      return null;
    }

    const respuesta = await fetch(urlProductos, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: productoNuevo,
    });
    return respuesta;
  } catch (error) {
    console.error("Error al crear producto:", error);
    return null;
  }
};

export const editarProducto = async (id, productoEditado) => {
  try {
    const userData = JSON.parse(sessionStorage.getItem("userKey") || "{}");
    const token = userData?.token;

    if (!token) {
      console.error("No se encontró token en sessionStorage");
      return null;
    }

    const respuesta = await fetch(`${urlProductos}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: productoEditado,
    });
    return respuesta;
  } catch (error) {
    console.error("Error al editar producto:", error);
    return null;
  }
};

export const borrarProducto = async (id) => {
  try {
    const userData = JSON.parse(sessionStorage.getItem("userKey") || "{}");
    const token = userData?.token;

    if (!token) {
      console.error("No se encontró token en sessionStorage");
      return null;
    }

    const respuesta = await fetch(`${urlProductos}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error al borrar producto:", error);
    return null;
  }
};

export const listarProductosPaginados = async (pagina = 1 , limite = 9) => {
  try {
    const respuesta = await fetch(`${urlProductos}/paginacion?pagina=${pagina}&limite=${limite}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};