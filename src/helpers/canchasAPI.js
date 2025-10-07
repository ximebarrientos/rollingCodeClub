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
    const respuesta = await fetch(urlCanchas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(canchaNueva),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editarCanchaAPI = async (id, canchaActualizada) => {
    try {
        const respuesta = await fetch(`${urlCanchas}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
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
        const respuesta = await fetch(`${urlCanchas}/${id}`, {
            method: "DELETE",
        });
        return respuesta;
    } catch (error) {
        console.error(error);
        return null;
    }
}
