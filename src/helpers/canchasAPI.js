const urlCanchas = import.meta.env.VITE_API_CANCHAS;

export const obtenerCanchasAPI = async () => {
  try {
    const respuesta = await fetch(urlCanchas);
    if (respuesta.ok) {
      return await respuesta.json();
    } else {
      console.error("Error en la respuesta de la API");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearCanchaAPI = async (canchaNueva) => {
  try {
    console.log("Enviando cancha a crear:", canchaNueva); // Debug log
    const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
    const respuesta = await fetch(urlCanchas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(canchaNueva),
    });
    console.log("Respuesta de crearCanchaAPI:", respuesta.status, respuesta.ok); // Debug log
    if (!respuesta.ok) {
      const errorText = await respuesta.text();
      console.error("Error del servidor:", errorText);
    }
    return respuesta;
  } catch (error) {
    console.error("Error en crearCanchaAPI:", error);
    return null;
  }
};

export const editarCanchaAPI = async (id, canchaActualizada) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
        const respuesta = await fetch(`${urlCanchas}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(canchaActualizada),
        });
        return respuesta;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const eliminarCanchaAPI = async (id) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("userKey") || "{}").token;
        const respuesta = await fetch(`${urlCanchas}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return respuesta;
    } catch (error) {
        console.error(error);
        return null;
    }
}
