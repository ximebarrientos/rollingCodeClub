import { Navigate } from "react-router";

const ProtectorRutas = ({ children, usuarioLogueado, rol = null }) => {
  if (!usuarioLogueado || !usuarioLogueado.token) {
    return <Navigate to="/login" replace />;
  }

  if (rol && usuarioLogueado.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectorRutas;
