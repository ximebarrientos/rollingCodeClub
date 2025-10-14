const urlProductos = import.meta.env.VITE_API_PRODUCTOS;
const urlUsuarios = import.meta.env.VITE_API_USUARIOS;

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

export const registrarUsuario = async (usuarioNuevo) => {
  try {
    const respuesta = await fetch(urlUsuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return {
      ok: false,
      status: 500,
      error: "Fallo de conexión con el servidor.",
    };
  }
};

export const listarUsuarios = async (token) => {
  try {
    const respuesta = await fetch(urlUsuarios, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return null;
  }
};

export const obtenerUsuarioPorId = async (id, token) => {
  try {
    const respuesta = await fetch(`${urlUsuarios}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
};

export const editarUsuario = async (id, usuarioEditado, token) => {
  try {
    const respuesta = await fetch(`${urlUsuarios}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(usuarioEditado),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al editar usuario:", error);
    return null;
  }
};

export const borrarUsuario = async (id, token) => {
  try {
    const respuesta = await fetch(`${urlUsuarios}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error al borrar usuario:", error);
    return null;
  }
};
