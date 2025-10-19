import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router";

export default function Menu({ usuarioLogueado, setUsuarioLogueado, onLoginClick }) {
  const navegacion = useNavigate();

  const logout = () => {
    setUsuarioLogueado({});
    navegacion("/");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src="/logopngblanco.png"
            alt="Logo Rolling Code Club"
            height="60"
          />
          <span className="fw-bold"></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="mainNavbar" />
        <Navbar.Collapse id="mainNavbar">
          <Nav className="mx-lg-auto mb-2 mb-lg-0 gap-2">
            <NavLink to={"/"} className={"nav-link"}>
              Inicio
            </NavLink>
            <NavLink to={"/reserva"} className={"nav-link"}>
              Reservar
            </NavLink>
            <NavLink to={"/tienda"} className={"nav-link"}>
              Tienda
            </NavLink>
            <NavLink to={"/contacto"} className={"nav-link"}>
              Contacto
            </NavLink>
            <NavLink to={"/sobre-nosotros"} className={"nav-link"}>
              Sobre Nosotros
            </NavLink>
          </Nav>
          <div className="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
            {usuarioLogueado.token ? (
              <>
                {usuarioLogueado.rol === "administrador" ? (
                  <>
                    <NavLink to="/perfil">
                      <i className="bi bi-person fs-4 text-success"></i>
                    </NavLink>
                    <NavLink className="nav-link" to={"/administrador"}>
                      Administrador
                    </NavLink>
                    <Button size="sm" onClick={logout} className="py-2">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="d-flex align-items-center gap-2">
                      <NavLink to="/perfil" className="nav-link">
                        Bienvenido {usuarioLogueado.nombreUsuario}
                      </NavLink>
                      <NavLink to="/carrito">
                        <i className="bi bi-cart-fill fs-4 text-success"></i>
                      </NavLink>
                    </div>
                    <Button size="sm" onClick={logout} className="py-2">
                      Logout
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  onClick={onLoginClick}
                  variant="outline-light"
                  size="sm"
                  className="py-2"
                >
                  Iniciar sesión
                </Button>
                <Button
                  as={Link}
                  to={"/registro"}
                  variant="success"
                  size="sm"
                  className="py-2"
                >
                  Crear cuenta
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
