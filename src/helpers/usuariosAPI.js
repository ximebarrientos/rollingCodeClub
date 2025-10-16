const urlUsuarios = import.meta.env.VITE_API_USUARIOS;

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(urlUsuarios + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
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

export const alternarEstadoUsuario = async (idUsuario, nuevoEstado, token) => {
  try {
    const respuesta = await fetch(`${urlUsuarios}/${idUsuario}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    return respuesta;
  } catch (error) {
    console.error(
      "Error al comunicarse con el backend para alternar estado:",
      error
    );

    return {
      status: 500,
      json: async () => ({ mensaje: "Error de conexión con el servidor." }),
    };
  }
};
