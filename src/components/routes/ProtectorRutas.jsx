import { Navigate, useLocation} from "react-router";
import { useEffect } from "react";

const ProtectorRutas = ({ children, usuarioLogueado, rol = null, setShowModalLogin }) => {
  const location = useLocation();
    
  useEffect(() => {
    if ((!usuarioLogueado || !usuarioLogueado.token) && location.pathname !== "/reserva") {
      setShowModalLogin(true);
    }
  }, [usuarioLogueado, location.pathname, setShowModalLogin]);

  if (!usuarioLogueado || !usuarioLogueado.token) {
    return location.pathname === "/reserva" ? null : <Navigate to="/" replace />;
  }

  if (rol && usuarioLogueado.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectorRutas;
