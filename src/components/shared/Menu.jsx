import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";


export default function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
          <img src="/logopngblanco.png" alt="Logo Rolling Code Club" height="60" />
          <span className="fw-bold"></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="mainNavbar" />
        <Navbar.Collapse id="mainNavbar">
          <Nav className="mx-lg-auto mb-2 mb-lg-0 gap-2">
            <Nav.Link href="erro">Inicio</Nav.Link>
            <Nav.Link href="#">Reservar</Nav.Link>
            <NavDropdown title="Tienda" id="tiendaDropdown" menuVariant="dark">
              <NavDropdown.Header>Indumentaria</NavDropdown.Header>
              <NavDropdown.Item href="#">Camisetas</NavDropdown.Item>
              <NavDropdown.Item href="#">Shorts</NavDropdown.Item>
              <NavDropdown.Item href="#">Botines</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Accesorios</NavDropdown.Header>
              <NavDropdown.Item href="#">Kits de entrenamiento</NavDropdown.Item>
              <NavDropdown.Item href="#">Pelotas</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Contacto</Nav.Link>
            <Nav.Link href="#">Sobre Nosotros</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
            <Button variant="outline-light" size="sm" className="py-2">Iniciar sesión</Button>
            <Button variant="primary" size="sm" className="py-2">Crear cuenta</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
