import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { borrarUsuario } from "../../../helpers/usuariosAPI";

const FilaUsuarioTabla = ({ usuario, cargarUsuarios, token }) => {
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

  const getRolVariant = (rol) => {
    switch (rol) {
      case "administrador":
        return "danger";
      case "usuario":
        return "success";
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
        <Button size="sm" variant={getRolVariant(usuario.rol)}>
          {usuario.rol}
        </Button>
      </td>

      <td>
        <div className="d-flex justify-content-center gap-2">
          <Link
            to={`/administrador/editar-usuario/${usuario._id}`}
            className="btn btn-warning btn-sm"
          >
            Editar
          </Link>

          <Button variant="danger" size="sm" onClick={handleBorrarUsuario}>
            Borrar
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default FilaUsuarioTabla;
