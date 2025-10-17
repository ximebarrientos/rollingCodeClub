import { Navigate, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ProtectorRutas = ({ children, usuarioLogueado, rol = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ((!usuarioLogueado || !usuarioLogueado.token) && location.pathname === "/reserva") {
      Swal.fire({
        title: "Inicio de sesión requerido",
        text: "Para reservar turnos necesitas estar logueado primero",
        icon: "info",
        confirmButtonText: "Ir al login",
        confirmButtonColor: "#198754",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        background: "#212529",
          color: "#fff",
      }).then((result) => {
        if (result.isConfirmed){
          navigate("/login");
        } else {
          navigate ("/")
        }
      });
    }
  }, [usuarioLogueado, location.pathname, navigate]);

  if (!usuarioLogueado || !usuarioLogueado.token) {
    return location.pathname === "/reserva" ? null : <Navigate to="/login" replace />;
  }

  if (rol && usuarioLogueado.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectorRutas;
