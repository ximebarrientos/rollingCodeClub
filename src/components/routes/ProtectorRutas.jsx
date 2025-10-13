import { Navigate, Outlet } from "react-router";

const ProtectorRutas = ({usuarioLogueado}) => {
    //si el usuario no es el admin
    if(!usuarioLogueado.isAdmin || !usuarioLogueado.token){
        //redireccionar al usuario
       return <Navigate to={'/'}/>
    }
    return <Outlet/>
};

export default ProtectorRutas;
