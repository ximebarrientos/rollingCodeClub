export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" data-bs-theme="dark">
      <div className="container">

        <a href="#" className="navbar-brand d-flex align-items-center gap-2">
          <img src="/logopngblanco.png" alt="Logo Rolling Code Club" height="100" /> 
          <span className="fw-bold"></span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <a href="#" className="nav-link">Inicio</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Reservar</a>
            </li>

            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="tiendaDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tienda
              </a>
              <ul className="dropdown-menu" aria-labelledby="tiendaDropdown">
                <li><h6 className="dropdown-header">Indumentaria</h6></li>
                <li><a href="#" className="dropdown-item">Camisetas</a></li>
                <li><a href="#" className="dropdown-item">Shorts</a></li>
                <li><a href="#" className="dropdown-item">Botines</a></li>

                <li><hr className="dropdown-divider" /></li>

                <li><h6 className="dropdown-header">Accesorios</h6></li>
                <li><a href="#" className="dropdown-item">Kits de entrenamiento</a></li>
                <li><a href="#" className="dropdown-item">Pelotas</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link">Contacto</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Sobre Nosotros</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <a href="#" className="btn btn-outline-light btn-sm py-3">Iniciar sesión</a>
            <a href="#" className="btn btn-primary btn-sm py-2">Crear cuenta</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
