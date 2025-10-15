const urlCanchas = import.meta.env.VITE_API_CANCHAS;

export const obtenerCanchasAPI = async () => {
  try {
    const respuesta = await fetch(urlCanchas);
    if (respuesta.ok) return await respuesta.json();
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearCanchaAPI = async (formData) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
    const respuesta = await fetch(urlCanchas, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return respuesta;
  } catch (error) {
    console.error("Error en crearCanchaAPI:", error);
    return null;
  }
};

export const editarCanchaAPI = async (id, formData) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
    const respuesta = await fetch(`${urlCanchas}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const eliminarCanchaAPI = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
    const respuesta = await fetch(`${urlCanchas}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
