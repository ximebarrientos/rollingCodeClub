import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import FilaUsuarioTabla from "./FilaUsuarioTabla";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { listarUsuarios } from "../../../helpers/usuariosAPI";

const TablaUsuario = ({ usuarioLogueado }) => {
  const [usuarios, setUsuarios] = useState([]);
  const navegacion = useNavigate();

  const token = usuarioLogueado?.token;

  const cargarUsuarios = async () => {
    if (!token) {
      return;
    }

    const respuesta = await listarUsuarios(token);

    if (respuesta.status === 200) {
      const datosUsuarios = await respuesta.json();
      setUsuarios(datosUsuarios);
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los usuarios. Revisa el token.",
        icon: "error",
        background: "#212529",
        color: "#fff",
      });
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, [token, navegacion]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-warning display-6">Usuarios</h2>

        <Button
          className="btn-outline-warning"
          onClick={() => navegacion("/registro")}
        >
          Agregar Usuario (+)
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <FilaUsuarioTabla
              key={usuario._id}
              usuario={usuario}
              cargarUsuarios={cargarUsuarios}
              token={token}
            />
          ))}
        </tbody>
      </Table>

      {usuarios.length === 0 && token && (
        <p className="text-center">Cargando usuarios...</p>
      )}
      {usuarios.length === 0 && !token && (
        <p className="text-center">
          Error: Se requiere autenticación para cargar usuarios.
        </p>
      )}
    </>
  );
};

export default TablaUsuario;
