import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  borrarUsuario,
  alternarEstadoUsuario,
} from "../../../helpers/usuariosAPI";

const FilaUsuarioTabla = ({ usuario, cargarUsuarios, token }) => {
  const handleAlternarEstado = async () => {
    const nuevoEstado = usuario.estado === "activo" ? "bloqueado" : "activo";

    const respuesta = await alternarEstadoUsuario(
      usuario._id,
      nuevoEstado,
      token
    );

    if (respuesta.status === 200) {
      Swal.fire(
        "Éxito",
        `Usuario ${usuario.nombreUsuario} ha sido ${nuevoEstado}.`,
        "success"
      );
      cargarUsuarios();
    } else {
      const error = await respuesta.json();
      Swal.fire(
        "Error",
        error.mensaje ||
          "No se pudo cambiar el estado del usuario. Revise la consola del backend.",
        "error"
      );
    }
  };

  const handleBorrarUsuario = () => {
    Swal.fire({
      title: `¿Estás seguro de borrar a ${usuario.nombreUsuario}?`,
      text: "¡Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarUsuario(usuario._id, token);

        if (respuesta.status === 200) {
          Swal.fire("¡Borrado!", "El usuario ha sido eliminado.", "success");
          cargarUsuarios();
        } else {
          Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
        }
      }
    });
  };

  const getEstadoVariant = (estado) => {
    return estado === "activo" ? "success" : "secondary";
  };

  const getRolVariant = (rol) => {
    switch (rol) {
      case "administrador":
        return "danger";
      case "usuario":
        return "primary";
      default:
        return "secondary";
    }
  };

  return (
    <tr>
      <td>{usuario.nombreUsuario}</td>
      <td>
        {usuario.nombre} {usuario.apellido}
      </td>
      <td>{usuario.correoElectronico}</td>
      <td>
        <Button size="sm" variant={getRolVariant(usuario.rol)} disabled>
          {usuario.rol}
        </Button>
      </td>
      <td>
        <div className="d-flex justify-content-center gap-2">
          <Button
            size="sm"
            variant={getEstadoVariant(usuario.estado)}
            onClick={handleAlternarEstado}
          >
            {usuario.estado === "activo" ? "Activo" : "Bloqueado"}
          </Button>
          <Button variant="danger" size="sm" onClick={handleBorrarUsuario}>
            Borrar
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default FilaUsuarioTabla;
