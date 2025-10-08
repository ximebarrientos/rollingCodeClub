const urlTurnos = import.meta.env.VITE_API_TURNOS || "http://localhost:3000/turnos";

export const crearTurnoAPI = async (turnoNuevo) => {
  console.log("URL de la API:", urlTurnos);
  console.log("Datos a enviar:", turnoNuevo);

  try {
    const respuesta = await fetch(urlTurnos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(turnoNuevo),
    });
    console.log("Status de respuesta:", respuesta.status);
    return respuesta;
  } catch (error) {
    console.error("Error en fetch:", error);
    return null;
  }
};

export const obtenerTurnosAPI = async () => {
  try {
    const respuesta = await fetch(urlTurnos);
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

export const editarTurnoAPI = async (id, turnoActualizado) => {
  try {
    const respuesta = await fetch(`${urlTurnos}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(turnoActualizado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const eliminarTurnoAPI = async (id) => {
  try {
    const respuesta = await fetch(`${urlTurnos}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
