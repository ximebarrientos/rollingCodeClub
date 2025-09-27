import { NavLink } from 'react-router';

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" data-bs-theme="dark">
      <div className="container">
       
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src="/logopngblanco.png" alt="Logo Rolling Code Club" height="100" /> 
          <span className="fw-bold"></span>
        </NavLink>

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
              <NavLink to="/" end className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/reservar" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>
                Reservar
              </NavLink>
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
                <li><NavLink to="/tienda/indumentaria/camisetas" className="dropdown-item">Camisetas</NavLink></li>
                <li><NavLink to="/tienda/indumentaria/shorts" className="dropdown-item">Shorts</NavLink></li>
                <li><NavLink to="/tienda/indumentaria/botines" className="dropdown-item">Botines</NavLink></li>
                
                <li><hr className="dropdown-divider" /></li>

                <li><h6 className="dropdown-header">Accesorios</h6></li>
                <li><NavLink to="/tienda/accesorios/kits-entrenamiento" className="dropdown-item">Kits de entrenamiento</NavLink></li>
                <li><NavLink to="/tienda/accesorios/pelotas" className="dropdown-item">Pelotas</NavLink></li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/contacto" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>
                Contacto
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/sobre-nosotros" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>
                Sobre Nosotros
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <NavLink to="/login" className="btn btn-outline-light btn-sm py-3">Iniciar sesión</NavLink>
            <NavLink to="/crear-cuenta" className="btn btn-primary btn-sm py-2">Crear cuenta</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
