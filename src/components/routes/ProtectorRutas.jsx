import { Navigate, Outlet } from "react-router";

const ProtectorRutas = ({usuarioLogueado}) => {
    //si el usuario no es el admin
    if(!usuarioLogueado.token || usuarioLogueado.rol !== 'admin'){
        //redireccionar al usuario
       return <Navigate to={'/'}/>
    }
    return <Outlet/>
};

export default ProtectorRutas;
