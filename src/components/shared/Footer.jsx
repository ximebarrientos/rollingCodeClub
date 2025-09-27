export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto pt-4 pb-3" data-bs-theme="dark">

      <hr className="container border-secondary opacity-60 pt-4" />

      <div className="container">
        <div className="row gy-4">

          <div className="col-12 col-md-3">
            <a href="#" className="d-inline-flex align-items-center gap-2 text-decoration-none">
              <img src="/logopngblanco.png" alt="Logo Rolling Code Club" height={150} />
              <span className="fw-bold"></span>
            </a>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold mb-3">Descubre RCC</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li><a href="#" className="text-decoration-none text-light">Políticas de privacidad</a></li>
              <li><a href="#" className="text-decoration-none text-light">Preguntas frecuentes</a></li>
              <li><a href="#" className="text-decoration-none text-light">Términos y condiciones</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold mb-3">Redes sociales</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li>
                <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="d-inline-flex align-items-center gap-2 text-light">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.88 3.77-3.88c1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.78 8.44-4.93 8.44-9.94"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="d-inline-flex align-items-center gap-2 text-light">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m5 5a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2.5A2.5 2.5 0 1 1 9.5 12A2.5 2.5 0 0 1 12 9.5M18 6.3a1.2 1.2 0 1 0 0 2.4a1.2 1.2 0 0 0 0-2.4"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://x.com/" target="_blank" rel="noreferrer" className="d-inline-flex align-items-center gap-2 text-light">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M3 3h5.2l5.1 7.33L18.5 3H21l-7.25 10.4L21.5 21h-5.2l-5.45-7.8L7 21H3l7.9-11.36z"/>
                  </svg>
                  X
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="text-uppercase fw-bold mb-3">Más sobre nosotros</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li>
                <a href="tel:+5493815551120" className="d-inline-flex align-items-center gap-2 text-light">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M20 15.5c-1.25 0-2.47-.2-3.61-.59c-.35-.12-.75-.02-1.02.25l-1.6 1.6c-2.83-1.44-5.13-3.74-6.57-6.57l1.6-1.6c.27-.27.37-.67.25-1.02c-.39-1.14-.59-2.36-.59-3.61c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1C3 14.39 9.61 21 18 21c.55 0 1-.45 1-1v-2.5c0-.55-.45-1-1-1"/>
                  </svg>
                  +54 9 381 2345678
                </a>
              </li>
              <li>
                <a href="mailto:RollingCodeClub@mail.com" className="d-inline-flex align-items-center gap-2 text-light">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4l-8 5L4 8V6l8 5l8-5z"/>
                  </svg>
                  RollingCodeClub@mail.com
                </a>
              </li> 
              <li>
                <a href="#" className="d-inline-flex align-items-center gap-2 text-light">
                  Gral Paz 576, Tucumán, AR
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary mt-4 mb-3" />
        <div className="text-center">
          <small className="text-secondary">© {new Date().getFullYear()} RCC. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}
