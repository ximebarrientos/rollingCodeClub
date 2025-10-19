import "./footer.css"

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto pt-4 pb-3" data-bs-theme="dark">

      <hr className="container border-secondary opacity-60 pt-4" />

      <div className="container">
        <div className="row gy-4">

          <div className="col-12 col-md-3">
            <a href="/" className="d-inline-flex align-items-center gap-2 text-decoration-none">
              <img src="/logopngblanco.png" alt="Logo Rolling Code Club" height={150} />
              <span className="fw-bold"></span>
            </a>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3">DESCUBRE RCC</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li><a href="*" className="text-decoration-none">Políticas de privacidad</a></li>
              <li><a href="*" className="text-decoration-none">Preguntas frecuentes</a></li>
              <li><a href="*" className="text-decoration-none">Términos y condiciones</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3">REDES SOCIALES</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-twitter-x"></i> X
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3">MÁS SOBRE NOSOTROS</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li>
                <a href="tel:+5493815551120" className="d-inline-flex align-items-center gap-2">
                  <i className="bi bi-telephone"></i> +54 9 381 2345678
                </a>
              </li>
              <li>
                <a href="mailto:RollingCodeClub@mail.com" className="d-inline-flex align-items-center gap-2">
                  <i className="bi bi-envelope"></i> RollingCodeClub@mail.com
                </a>
              </li>
              <li>
                <a
                  href="http://google.com/maps?q=Gral.+Jos%C3%A9+Mar%C3%ADa+Paz+576,+San+Miguel+de+Tucum%C3%A1n,+Tucum%C3%A1n" target="_blank"
                  className="d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-geo-alt"></i> Gral Paz 576, Tucumán, AR
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary mt-4 mb-3" />
        <div className="text-center">
          <small className="text-secondary">
            © {new Date().getFullYear()} RCC. Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}
