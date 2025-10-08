import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router";


export default function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src="/logopngblanco.png" alt="Logo Rolling Code Club" height="60" />
          <span className="fw-bold"></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="mainNavbar" />
        <Navbar.Collapse id="mainNavbar">
          <Nav className="mx-lg-auto mb-2 mb-lg-0 gap-2">
            <NavLink to={"/"} className={"nav-link"}>Inicio</NavLink>
            <NavLink to={"/reserva"} className={"nav-link"}>Reservar</NavLink>
            <NavDropdown title="Tienda" id="tiendaDropdown" menuVariant="dark">
              <NavDropdown.Header>Indumentaria</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/tienda">Camisetas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tienda">Shorts</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tienda">Botines</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Accesorios</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/tienda">Kits de entrenamiento</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tienda">Pelotas</NavDropdown.Item>
            </NavDropdown>
            <NavLink to={"/contacto"} className={"nav-link"}>Contacto</NavLink>
            <NavLink to={"/sobre-nosotros"} className={"nav-link"}>Sobre Nosotros</NavLink>
          </Nav>
          <div className="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
            <NavLink to={"/login"} size="sm" className="py-2 btn btn-outline-light">Iniciar sesión</NavLink>
            <Button as={Link} to={"/registro"} variant="primary" size="sm" className="py-2">Crear cuenta</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}