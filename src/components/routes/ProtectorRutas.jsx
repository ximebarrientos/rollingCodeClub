import { Navigate, Outlet } from "react-router";

const ProtectorRutas = ({ usuarioLogueado, context }) => {
  if (
    !usuarioLogueado.token ||
    !usuarioLogueado.rol ||
    usuarioLogueado.rol.toLowerCase() !== "administrador"
  ) {
    return <Navigate to={"/"} />;
  }

  return <Outlet context={context} />;
};

export default ProtectorRutas;
