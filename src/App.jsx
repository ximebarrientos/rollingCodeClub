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
import { useEffect, useState } from "react";

function App() {
  const usuarioSessionStorage =
    JSON.parse(sessionStorage.getItem("userKey")) || {};
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);
  useEffect(() => {
    sessionStorage.setItem("userKey", JSON.stringify(usuarioLogueado));
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
            <Route path="/" element={<Inicio />}></Route>
            <Route path="/reserva" element={<ReservarTurnos />}></Route>
            <Route path="/turnos" element={<FormularioTurnos />}></Route>
            <Route path="/tienda" element={<Tienda />}></Route>
            <Route
              path="/tiendaAccesorios"
              element={<TiendaAccesorios />}
            ></Route>
            <Route path="/contacto" element={<Contacto />}></Route>
            <Route path="/sobre-nosotros" element={<QuienesSomos />}></Route>
            <Route
              path="/login"
              element={
                <Login
                  usuarioLogueado={usuarioLogueado}
                  setUsuarioLogueado={setUsuarioLogueado}
                />
              }
            ></Route>
            <Route path="/registro" element={<Registro />}></Route>

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
            <Route
              path="/administrador"
              element={
                <ProtectorRutas
                  usuarioLogueado={usuarioLogueado}
                  rol="administrador"
                >
                  <Administrador usuarioLogueado={usuarioLogueado} />
                </ProtectorRutas>
              }
            >
              <Route index element={<Administrador />}></Route>
            </Route>
            <Route path="/carrito" element={<CarritoCompras />} />
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
