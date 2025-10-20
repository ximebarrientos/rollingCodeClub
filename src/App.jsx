import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "./components/shared/Footer.jsx";
import Menu from "./components/shared/Menu.jsx";
import Inicio from "./components/pages/inicio/Inicio.jsx";
import FormularioTurnos from "./components/pages/turnos/FormularioTurnos.jsx";
import Tienda from "./components/pages/tienda/Tienda.jsx";
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
  const [showModalLogin, setShowModalLogin] = useState(false);

  useEffect(() => {
    if (Object.keys(usuarioLogueado).length > 0) {
      sessionStorage.setItem("userKey", JSON.stringify(usuarioLogueado));
    } else {
      sessionStorage.removeItem("userKey");
    }
  }, [usuarioLogueado]);

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
          onLoginClick={() => setShowModalLogin(true)}
        />
        <Login
          show={showModalLogin}
          onHide={() => setShowModalLogin(false)}
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
        />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route
              path="/reserva"
              element={
                <ProtectorRutas usuarioLogueado={usuarioLogueado} setShowModalLogin={setShowModalLogin}>
                  <ReservarTurnos usuarioLogueado={usuarioLogueado} />
                </ProtectorRutas>
              }
            />
            <Route path="/turnos" element={<FormularioTurnos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sobre-nosotros" element={<QuienesSomos />} />
            <Route path="/tienda" element={<Tienda usuarioLogueado={usuarioLogueado}/>} />
            <Route path="/tienda/:categoria" element={<Tienda usuarioLogueado={usuarioLogueado}/>} />
            <Route
              path="/tienda/:categoria/:subcategoria"
              element={<Tienda usuarioLogueado={usuarioLogueado}/>}
            />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<CarritoCompras usuarioLogueado={usuarioLogueado} />} />
            <Route path="/pago/exitoso" element={<PagoExitosoMercadoPago />} />
            <Route
              path="/pago/fallido"
              element={
                <h2 className="text-center mt-5 text-danger">
                  Pago fallido 😞
                </h2>
              }
            />
            <Route
              path="/pago/pendiente"
              element={
                <h2 className="text-center mt-5 text-warning">
                  Pago pendiente ⏳
                </h2>
              }
            />

            <Route
              path="/perfil"
              element={
                <ProtectorRutas usuarioLogueado={usuarioLogueado} setShowModalLogin={setShowModalLogin}>
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
                  setShowModalLogin={setShowModalLogin}
                >
                  <Administrador usuarioLogueado={usuarioLogueado} />
                </ProtectorRutas>
              }
            />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
