import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "./components/shared/Footer.jsx";
import Menu from "./components/shared/Menu.jsx";
import Inicio from "./components/pages/inicio/Inicio.jsx";
import FormularioTurnos from "./components/pages/turnos/FormularioTurnos.jsx";
import Tienda from "./components/pages/tienda/Tienda.jsx";
import TiendaAccesorios from "./components/pages/tienda/TiendaAccesorios.jsx";
import Contacto from "./components/pages/Contacto.jsx";
import QuienesSomos from "./components/pages/QuienesSomos.jsx";
import Administrador from "./components/pages/Administrador.jsx";
import Error404 from "./components/pages/Error404.jsx";
import Login from "./components/pages/Login.jsx";
import Registro from "./components/pages/usuario/Registro.jsx";
import PerfilUsuario from "./components/pages/usuario/PerfilUsuario.jsx";
import CarritoCompras from "./components/pages/producto/CarritoCompras.jsx";
import ReservarTurnos from "./components/pages/turnos/ReservarTurnos.jsx";
import ProtectorRutas from "./components/routes/ProtectorRutas.jsx";
import PagoExitosoMercadoPago from "./components/pages/producto/PagoExitosoMercadoPago.jsx";
import { useEffect, useState } from "react";

function App() {
  const usuarioSessionStorage =
    JSON.parse(sessionStorage.getItem("userKey")) || {};
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);
  
  useEffect(() => {
    // Si el objeto de usuario está vacío, no intentamos guardar un "null" o vacío
    // Esto asegura que la sesión se mantiene si el usuarioLogueado cambia (ej: actualización de datos)
    if (Object.keys(usuarioLogueado).length > 0) {
      sessionStorage.setItem("userKey", JSON.stringify(usuarioLogueado));
    } else {
      // Opcional: limpiar si el usuario cierra sesión (logoutea)
      sessionStorage.removeItem("userKey");
    }
  }, [usuarioLogueado]);

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
        />
        <main>
          <Routes>
            {/* RUTAS PÚBLICAS */}
            <Route path="/" element={<Inicio />} />
            <Route
              path="/reserva"
              element={
                <ProtectorRutas usuarioLogueado={usuarioLogueado}>
                  <ReservarTurnos usuarioLogueado={usuarioLogueado} />
                </ProtectorRutas>
              }
            />
            <Route path="/turnos" element={<FormularioTurnos />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tiendaAccesorios" element={<TiendaAccesorios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sobre-nosotros" element={<QuienesSomos />} />
            <Route
              path="/login"
              element={
                <Login
                  usuarioLogueado={usuarioLogueado}
                  setUsuarioLogueado={setUsuarioLogueado}
                />
              }
            />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<CarritoCompras />} />
            <Route
              path="/pago/exitoso"
              element={<PagoExitosoMercadoPago />}
            />
            <Route
              path="/pago/fallido"
              element={<h2 className='text-center mt-5 text-danger'>Pago fallido 😞</h2>}
            />
            <Route
              path="/pago/pendiente"
              element={<h2 className='text-center mt-5 text-warning'>Pago pendiente ⏳</h2>}
            />
            
            {/* RUTAS PRIVADAS (USUARIO LOGUEADO) */}
            
            {/* 1. RUTA DE PERFIL (Protegida) */}
            <Route 
              path="/perfil" 
              element={
                <ProtectorRutas usuarioLogueado={usuarioLogueado}>
                  <PerfilUsuario 
                    usuarioLogueado={usuarioLogueado} 
                    setUsuarioLogueado={setUsuarioLogueado}
                  />
                </ProtectorRutas>
              } 
            />

            {/* 2. RUTA DE ADMINISTRADOR (Protegida y con Rol) */}
            <Route
              path="/administrador"
              element={
                <ProtectorRutas usuarioLogueado={usuarioLogueado} rol="administrador">
                  <Administrador usuarioLogueado={usuarioLogueado} />
                </ProtectorRutas>
              }
            />

            {/* RUTA 404 */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
